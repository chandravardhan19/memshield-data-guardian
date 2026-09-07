export type PrivacyLevel = "PL1" | "PL2" | "PL3" | "PL4";
export type DestinationId = "bank" | "ai" | "analytics";
export type ProtectionAction =
  | "MASK"
  | "PSEUDONYMIZE"
  | "TOKENIZE"
  | "ANONYMIZE"
  | "ENCRYPT"
  | "BLOCK"
  | "ALLOW";
export type EventStatus = "SUCCESS" | "BLOCKED" | "FAILED";

export const privacyLevels: Record<
  PrivacyLevel,
  { label: string; description: string; token: string }
> = {
  PL1: { label: "LOW", description: "Low sensitivity", token: "pl1" },
  PL2: { label: "PERSONAL", description: "Personal information", token: "pl2" },
  PL3: { label: "FINANCIAL", description: "Financial information", token: "pl3" },
  PL4: { label: "CRITICAL", description: "Critical information", token: "pl4" },
};

export const destinations: {
  id: DestinationId;
  name: string;
  description: string;
  protection: string;
}[] = [
  {
    id: "bank",
    name: "Bank",
    description: "Trusted demo banking backend",
    protection: "Tokenization / secure processing",
  },
  {
    id: "ai",
    name: "AI",
    description: "Sensitive data will be masked before processing",
    protection: "Masking",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Personal identity will be anonymized",
    protection: "Anonymization",
  },
];

export const destinationRoutes: { id: DestinationId; title: string; steps: string[] }[] = [
  {
    id: "bank",
    title: "Bank Route",
    steps: ["MemShield", "Tokenize / Secure Processing", "Demo Bank Backend", "Transaction Response"],
  },
  {
    id: "ai",
    title: "AI Route",
    steps: ["MemShield", "Mask Sensitive Data", "AI Processing", "Safe Response"],
  },
  {
    id: "analytics",
    title: "Analytics Route",
    steps: [
      "MemShield",
      "Anonymize Personal Data",
      "Analytics Database",
      "Reports and Statistics",
    ],
  },
];

export const protectionActions: {
  action: ProtectionAction;
  label: string;
  description: string;
}[] = [
  { action: "MASK", label: "Masked", description: "Partial characters hidden" },
  {
    action: "PSEUDONYMIZE",
    label: "Pseudonymized",
    description: "Replaced with a stable alias",
  },
  { action: "TOKENIZE", label: "Tokenized", description: "Swapped for a vault token" },
  { action: "ANONYMIZE", label: "Anonymized", description: "Identity fully removed" },
  { action: "ENCRYPT", label: "Encrypted", description: "Sealed in transit and at rest" },
  { action: "BLOCK", label: "Blocked", description: "Never leaves MemShield" },
];

export const protectionExamples: {
  method: string;
  original: string;
  protected: string;
  note: string;
}[] = [
  {
    method: "Masking",
    original: "1234567890",
    protected: "******7890",
    note: "Keeps the format, hides the value.",
  },
  {
    method: "Tokenization",
    original: "1234567890",
    protected: "TOKEN_ACC_001",
    note: "Reversible only inside the bank vault.",
  },
  {
    method: "Anonymization",
    original: "Customer A",
    protected: "USER_001",
    note: "Identity is permanently removed.",
  },
  {
    method: "Blocking",
    original: "OTP / PIN / Password / CVV",
    protected: "BLOCKED",
    note: "Critical data never leaves MemShield.",
  },
];

export const classificationExamples: { dataType: string; level: PrivacyLevel }[] = [
  { dataType: "Email", level: "PL2" },
  { dataType: "Phone Number", level: "PL2" },
  { dataType: "Customer Name", level: "PL2" },
  { dataType: "Account Number", level: "PL3" },
  { dataType: "Transaction Information", level: "PL3" },
  { dataType: "OTP / PIN / Password", level: "PL4" },
];

export const policyRules: {
  dataType: string;
  level: PrivacyLevel;
  destination: string;
  action: ProtectionAction;
}[] = [
  { dataType: "Account Number", level: "PL3", destination: "Bank", action: "TOKENIZE" },
  { dataType: "Account Number", level: "PL3", destination: "AI", action: "MASK" },
  { dataType: "Account Number", level: "PL3", destination: "Analytics", action: "ANONYMIZE" },
  { dataType: "Email", level: "PL2", destination: "AI", action: "MASK" },
  { dataType: "Email", level: "PL2", destination: "Analytics", action: "ANONYMIZE" },
  { dataType: "Phone Number", level: "PL2", destination: "AI", action: "MASK" },
  { dataType: "Personal Data", level: "PL2", destination: "Analytics", action: "ANONYMIZE" },
  { dataType: "Transaction Amount", level: "PL1", destination: "Analytics", action: "ALLOW" },
  { dataType: "OTP / PIN", level: "PL4", destination: "AI", action: "BLOCK" },
  { dataType: "OTP / PIN", level: "PL4", destination: "Analytics", action: "BLOCK" },
];

export const dashboardStats = [
  {
    label: "Total Requests Processed",
    value: 50,
    delta: "+12 today",
    tone: "primary" as const,
  },
  {
    label: "Sensitive Data Detected",
    value: 138,
    delta: "Across 50 requests",
    tone: "warning" as const,
  },
  { label: "Data Protected", value: 132, delta: "6 blocked at PL4", tone: "success" as const },
  { label: "Audit Logs Generated", value: 50, delta: "One per request", tone: "primary" as const },
];

export const systemStatus = [
  { name: "Sensitive Data Detector", status: "ACTIVE", uptime: "99.98%" },
  { name: "Privacy Classifier", status: "ACTIVE", uptime: "99.97%" },
  { name: "Policy Engine", status: "ACTIVE", uptime: "99.96%" },
  { name: "Protection Engine", status: "ACTIVE", uptime: "100%" },
  { name: "Destination Router", status: "ACTIVE", uptime: "99.95%" },
  { name: "Audit Logger", status: "ACTIVE", uptime: "99.99%" },
];

export const privacyDistribution: { level: PrivacyLevel; name: string; count: number }[] = [
  { level: "PL1", name: "PL1 — Low", count: 8 },
  { level: "PL2", name: "PL2 — Personal", count: 19 },
  { level: "PL3", name: "PL3 — Financial", count: 17 },
  { level: "PL4", name: "PL4 — Critical", count: 6 },
];

export type AuditEntry = {
  id: string;
  requestId: string;
  time: string;
  dataType: string;
  level: PrivacyLevel;
  destination: "AI" | "Bank" | "Analytics";
  action: ProtectionAction;
  status: EventStatus;
};

export const auditLogs: AuditEntry[] = [
  {
    id: "evt-1041",
    requestId: "REQ-001",
    time: "10:30 AM",
    dataType: "Account Number",
    level: "PL3",
    destination: "AI",
    action: "MASK",
    status: "SUCCESS",
  },
  {
    id: "evt-1040",
    requestId: "REQ-002",
    time: "10:28 AM",
    dataType: "OTP",
    level: "PL4",
    destination: "AI",
    action: "BLOCK",
    status: "BLOCKED",
  },
  {
    id: "evt-1039",
    requestId: "REQ-003",
    time: "10:20 AM",
    dataType: "Email",
    level: "PL2",
    destination: "Analytics",
    action: "ANONYMIZE",
    status: "SUCCESS",
  },
  {
    id: "evt-1038",
    requestId: "REQ-004",
    time: "10:15 AM",
    dataType: "Account Number",
    level: "PL3",
    destination: "Bank",
    action: "TOKENIZE",
    status: "SUCCESS",
  },
  {
    id: "evt-1037",
    requestId: "REQ-005",
    time: "10:04 AM",
    dataType: "Phone Number",
    level: "PL2",
    destination: "AI",
    action: "MASK",
    status: "SUCCESS",
  },
  {
    id: "evt-1036",
    requestId: "REQ-006",
    time: "09:52 AM",
    dataType: "PIN",
    level: "PL4",
    destination: "Analytics",
    action: "BLOCK",
    status: "BLOCKED",
  },
  {
    id: "evt-1035",
    requestId: "REQ-007",
    time: "09:41 AM",
    dataType: "Customer Name",
    level: "PL2",
    destination: "Analytics",
    action: "ANONYMIZE",
    status: "SUCCESS",
  },
  {
    id: "evt-1034",
    requestId: "REQ-008",
    time: "09:30 AM",
    dataType: "Transaction Amount",
    level: "PL1",
    destination: "Bank",
    action: "ALLOW",
    status: "SUCCESS",
  },
  {
    id: "evt-1033",
    requestId: "REQ-009",
    time: "09:18 AM",
    dataType: "Account Number",
    level: "PL3",
    destination: "Analytics",
    action: "ANONYMIZE",
    status: "FAILED",
  },
];

export const recentActivity = auditLogs.slice(0, 4);

export const memshieldModules = [
  {
    step: "01",
    title: "Sensitive Data Detector",
    description:
      "Python regex and pattern matching identify personal and financial values in fields and free text.",
  },
  {
    step: "02",
    title: "Privacy Classifier",
    description: "Assigns PL1, PL2, PL3 or PL4 to every detected entity.",
  },
  {
    step: "03",
    title: "Policy Engine",
    description: "Maps data type, privacy level and destination to a protection decision.",
  },
  {
    step: "04",
    title: "Protection Engine",
    description: "Applies masking, tokenization, anonymization or blocking.",
  },
  {
    step: "05",
    title: "Destination Router",
    description: "Delivers the protected payload to the selected destination only.",
  },
  {
    step: "06",
    title: "Audit Logger",
    description: "Records every decision in PostgreSQL without storing original values.",
  },
];

export const architectureComponents = memshieldModules;

export const pipelineSteps = [
  { title: "Detect", description: "Sensitive entities found" },
  { title: "Classify", description: "Privacy level assigned" },
  { title: "Decide", description: "Policy action selected" },
  { title: "Protect", description: "Transformation applied" },
  { title: "Route", description: "Sent to destination" },
  { title: "Log", description: "Audit entry written" },
];

export const processingSteps = [
  { title: "Receive Data", description: "Request accepted by the FastAPI backend" },
  { title: "Detect Sensitive Information", description: "Regex and pattern matching" },
  { title: "Classify Privacy Level", description: "PL1 to PL4 assigned" },
  { title: "Check Policy", description: "Destination rules evaluated" },
  { title: "Apply Protection", description: "Mask, tokenize, anonymize or block" },
  { title: "Route to Destination", description: "Bank, AI or Analytics" },
  { title: "Generate Audit Log", description: "Stored in PostgreSQL" },
];

export const techStack: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Python", "FastAPI"] },
  { group: "Database", items: ["PostgreSQL"] },
  { group: "Development", items: ["VS Code", "Git", "GitHub", "Postman", "pgAdmin"] },
];

export const features = [
  {
    title: "Sensitive Data Detection",
    description: "Identifies sensitive information across form fields and free text.",
  },
  {
    title: "Privacy Classification",
    description: "Classifies every entity by sensitivity from PL1 through PL4.",
  },
  {
    title: "Policy Engine",
    description: "Decides the correct protection method for each destination.",
  },
  {
    title: "Protection Engine",
    description: "Masking, tokenization, anonymization and blocking.",
  },
  {
    title: "Destination Router",
    description: "Routes protected data to the selected destination only.",
  },
  {
    title: "Audit Logger",
    description: "Records every protection decision without original values.",
  },
];
