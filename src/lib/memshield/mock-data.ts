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
export type EventStatus = "SUCCESS" | "WARNING" | "CRITICAL";

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
  icon: string;
  name: string;
  description: string;
}[] = [
  { id: "bank", icon: "🏦", name: "Bank", description: "Simulated banking backend" },
  { id: "ai", icon: "🤖", name: "AI System", description: "Privacy-safe AI processing" },
  { id: "analytics", icon: "📊", name: "Analytics", description: "Anonymous data analytics" },
];

export const protectionActions: {
  action: ProtectionAction;
  icon: string;
  label: string;
  description: string;
}[] = [
  { action: "MASK", icon: "🥸", label: "Masked", description: "Partial characters hidden" },
  {
    action: "PSEUDONYMIZE",
    icon: "🎭",
    label: "Pseudonymized",
    description: "Replaced with a stable alias",
  },
  { action: "TOKENIZE", icon: "🎫", label: "Tokenized", description: "Swapped for a vault token" },
  { action: "ANONYMIZE", icon: "🫥", label: "Anonymized", description: "Identity fully removed" },
  { action: "ENCRYPT", icon: "🔐", label: "Encrypted", description: "Sealed in transit at rest" },
  { action: "BLOCK", icon: "🚫", label: "Blocked", description: "Never leaves MemShield" },
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
  { dataType: "Full Name", level: "PL2", destination: "Analytics", action: "PSEUDONYMIZE" },
  { dataType: "Transaction Amount", level: "PL1", destination: "Analytics", action: "ALLOW" },
  { dataType: "OTP", level: "PL4", destination: "AI", action: "BLOCK" },
  { dataType: "PIN", level: "PL4", destination: "Analytics", action: "BLOCK" },
];

export const dashboardStats = [
  { label: "Total Requests", value: 50, delta: "+12 today", tone: "primary" as const },
  { label: "Protected", value: 42, delta: "84% of traffic", tone: "success" as const },
  { label: "Blocked", value: 6, delta: "PL4 attempts", tone: "danger" as const },
  { label: "Allowed", value: 2, delta: "Non-sensitive", tone: "warning" as const },
];

export const systemStatus = [
  { name: "MemShield Engine", status: "ACTIVE", uptime: "99.98%" },
  { name: "Policy Engine", status: "ACTIVE", uptime: "99.96%" },
  { name: "Data Protection", status: "ACTIVE", uptime: "100%" },
  { name: "Audit System", status: "ACTIVE", uptime: "99.99%" },
];

export const privacyDistribution: { level: PrivacyLevel; name: string; count: number }[] = [
  { level: "PL1", name: "PL1 — Low", count: 8 },
  { level: "PL2", name: "PL2 — Personal", count: 19 },
  { level: "PL3", name: "PL3 — Financial", count: 17 },
  { level: "PL4", name: "PL4 — Critical", count: 6 },
];

export type AuditEntry = {
  id: string;
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
    time: "10:30 AM",
    dataType: "Account Number",
    level: "PL3",
    destination: "AI",
    action: "MASK",
    status: "SUCCESS",
  },
  {
    id: "evt-1040",
    time: "10:28 AM",
    dataType: "OTP",
    level: "PL4",
    destination: "AI",
    action: "BLOCK",
    status: "CRITICAL",
  },
  {
    id: "evt-1039",
    time: "10:20 AM",
    dataType: "Email",
    level: "PL2",
    destination: "Analytics",
    action: "ANONYMIZE",
    status: "SUCCESS",
  },
  {
    id: "evt-1038",
    time: "10:15 AM",
    dataType: "Account Number",
    level: "PL3",
    destination: "Bank",
    action: "TOKENIZE",
    status: "SUCCESS",
  },
  {
    id: "evt-1037",
    time: "10:04 AM",
    dataType: "Phone Number",
    level: "PL2",
    destination: "AI",
    action: "MASK",
    status: "SUCCESS",
  },
  {
    id: "evt-1036",
    time: "09:52 AM",
    dataType: "PIN",
    level: "PL4",
    destination: "Analytics",
    action: "BLOCK",
    status: "CRITICAL",
  },
  {
    id: "evt-1035",
    time: "09:41 AM",
    dataType: "Full Name",
    level: "PL2",
    destination: "Analytics",
    action: "PSEUDONYMIZE",
    status: "SUCCESS",
  },
  {
    id: "evt-1034",
    time: "09:30 AM",
    dataType: "Transaction Amount",
    level: "PL1",
    destination: "Bank",
    action: "ALLOW",
    status: "WARNING",
  },
];

export const recentActivity = auditLogs.slice(0, 4);

export const architectureComponents = [
  {
    step: "01",
    icon: "📥",
    title: "Data Interceptor",
    description: "Receives user data for privacy processing before it leaves the application.",
  },
  {
    step: "02",
    icon: "🔍",
    title: "Sensitive Data Detector",
    description: "Identifies personal and financial information inside structured and free text.",
  },
  {
    step: "03",
    icon: "🏷️",
    title: "Privacy Classifier",
    description: "Assigns PL1, PL2, PL3 or PL4 to every detected entity.",
  },
  {
    step: "04",
    icon: "🧠",
    title: "Policy Engine",
    description: "Determines the appropriate protection action for data type + level + destination.",
  },
  {
    step: "05",
    icon: "🔐",
    title: "Protection Engine",
    description: "Applies masking, tokenization, anonymization, encryption or blocking.",
  },
  {
    step: "06",
    icon: "🚦",
    title: "Destination Router",
    description: "Routes the protected payload to the selected destination only.",
  },
];

export const pipelineSteps = [
  { icon: "⌨️", title: "Enter Data", description: "User submits a request" },
  { icon: "🔍", title: "Detect", description: "Sensitive entities found" },
  { icon: "🏷️", title: "Classify", description: "Privacy level assigned" },
  { icon: "🧠", title: "Policy", description: "Action decided" },
  { icon: "🔐", title: "Protect", description: "Transformation applied" },
  { icon: "🚦", title: "Route", description: "Delivered safely" },
];

export const features = [
  {
    icon: "🔍",
    title: "Sensitive Data Detection",
    description: "Automatically identifies sensitive information across fields and free text.",
  },
  {
    icon: "🏷️",
    title: "Privacy Classification",
    description: "Classifies every entity by sensitivity from PL1 through PL4.",
  },
  {
    icon: "🧠",
    title: "Smart Policy Engine",
    description: "Decides the correct protection method for each destination.",
  },
  {
    icon: "🔐",
    title: "Data Protection",
    description: "Masking, tokenization, pseudonymization, anonymization and blocking.",
  },
  {
    icon: "🚦",
    title: "Secure Routing",
    description: "Routes protected data to the appropriate destination only.",
  },
];
