import type { DestinationId, PrivacyLevel, ProtectionAction } from "./mock-data";

export type DemoInput = {
  fullName: string;
  email: string;
  phone: string;
  account: string;
  amount: string;
  message: string;
  destination: DestinationId;
};

export const defaultInput: DemoInput = {
  fullName: "Customer A",
  email: "demo@example.com",
  phone: "9876543210",
  account: "1234567890",
  amount: "10000",
  message: "My account number is 1234567890. Please explain my transaction.",
  destination: "ai",
};

export type Detection = {
  key: keyof Omit<DemoInput, "destination">;
  dataType: string;
  value: string;
  category: string;
  level: PrivacyLevel;
  maskedPreview: string;
  action: ProtectionAction;
  protectedValue: string;
  reason: string;
};

function maskEmail(email: string) {
  const [user = "", domain = "example.com"] = email.split("@");
  return `${user.slice(0, 1)}***@${domain}`;
}

function maskTail(value: string, visible = 4) {
  const clean = value.replace(/\s/g, "");
  if (clean.length <= visible) return "*".repeat(clean.length);
  return "*".repeat(clean.length - visible) + clean.slice(-visible);
}

const actionByDestination: Record<
  string,
  Record<DestinationId, { action: ProtectionAction; reason: string }>
> = {
  fullName: {
    bank: { action: "ALLOW", reason: "The bank is the record owner and already knows the name." },
    ai: { action: "PSEUDONYMIZE", reason: "The AI system only needs a stable alias, not identity." },
    analytics: {
      action: "ANONYMIZE",
      reason: "Analytics aggregates behaviour, so personal identity is removed.",
    },
  },
  email: {
    bank: { action: "ENCRYPT", reason: "Contact data is encrypted in transit to the bank." },
    ai: { action: "MASK", reason: "The model needs the shape of an email, never the address." },
    analytics: { action: "ANONYMIZE", reason: "Analytics must not retain contactable identifiers." },
  },
  phone: {
    bank: { action: "ENCRYPT", reason: "The bank requires the number for verification, sealed." },
    ai: { action: "MASK", reason: "Only the last digits are useful for the AI response." },
    analytics: { action: "ANONYMIZE", reason: "Phone numbers are direct identifiers, removed." },
  },
  account: {
    bank: { action: "TOKENIZE", reason: "The bank resolves the token back through its own vault." },
    ai: {
      action: "MASK",
      reason:
        "The destination does not require the original account number. MemShield replaces sensitive information with a protected representation before routing the request.",
    },
    analytics: {
      action: "ANONYMIZE",
      reason: "Analytics only needs an account bucket, never the real number.",
    },
  },
  amount: {
    bank: { action: "ALLOW", reason: "Transaction value is required to execute the request." },
    ai: { action: "ALLOW", reason: "Amount alone is not identifying at PL1." },
    analytics: { action: "ALLOW", reason: "Amount is required for aggregate reporting." },
  },
};

function protectValue(
  key: string,
  value: string,
  action: ProtectionAction,
  fallback: string,
): string {
  switch (action) {
    case "MASK":
      return key === "email" ? maskEmail(value) : maskTail(value);
    case "PSEUDONYMIZE":
      return "USER_001";
    case "TOKENIZE":
      return "TOKEN_TXN_A82X9";
    case "ANONYMIZE":
      return fallback;
    case "ENCRYPT":
      return "enc::9f2a…c41d";
    case "BLOCK":
      return "🚫 BLOCKED";
    default:
      return value;
  }
}

export function analyze(input: DemoInput): Detection[] {
  const rows: Omit<Detection, "action" | "protectedValue" | "reason" | "maskedPreview">[] = [];

  if (input.fullName.trim())
    rows.push({
      key: "fullName",
      dataType: "Full Name",
      value: input.fullName,
      category: "Personal Information",
      level: "PL2",
    });
  if (input.email.trim())
    rows.push({
      key: "email",
      dataType: "Email",
      value: input.email,
      category: "Personal Information",
      level: "PL2",
    });
  if (input.phone.trim())
    rows.push({
      key: "phone",
      dataType: "Phone Number",
      value: input.phone,
      category: "Personal Information",
      level: "PL2",
    });
  if (input.account.trim())
    rows.push({
      key: "account",
      dataType: "Account Number",
      value: input.account,
      category: "Financial Information",
      level: "PL3",
    });
  if (input.amount.trim())
    rows.push({
      key: "amount",
      dataType: "Transaction Amount",
      value: `₹${Number(input.amount || 0).toLocaleString("en-IN")}`,
      category: "Low Sensitivity",
      level: "PL1",
    });

  const anonFallback: Record<string, string> = {
    fullName: "USER_001",
    email: "ANON_EMAIL",
    phone: "ANON_PHONE",
    account: "ACCOUNT_001",
    amount: input.amount,
  };

  return rows.map((row) => {
    const policy = actionByDestination[row.key]?.[input.destination] ?? {
      action: "MASK" as ProtectionAction,
      reason: "Default masking policy applied.",
    };
    return {
      ...row,
      maskedPreview:
        row.key === "email"
          ? maskEmail(row.value)
          : row.key === "amount"
            ? row.value
            : maskTail(row.value),
      action: policy.action,
      reason: policy.reason,
      protectedValue: protectValue(
        row.key,
        row.value,
        policy.action,
        anonFallback[row.key] ?? "ANON",
      ),
    };
  });
}

export function protectedMessage(input: DemoInput, detections: Detection[]): string {
  let text = input.message;
  for (const d of detections) {
    if (d.key === "amount" || !input[d.key]) continue;
    const raw = String(input[d.key]);
    if (!raw.trim()) continue;
    const placeholder =
      d.key === "account"
        ? input.destination === "ai"
          ? "<ACCOUNT_001>"
          : d.protectedValue
        : d.protectedValue;
    text = text.split(raw).join(placeholder);
  }
  return text;
}
