# MemShield: Data Guardian

Build a modern, professional, cybersecurity-themed frontend UI for a project called:

MEMSHIELD

Tagline:
"Privacy-Aware Protection for Sensitive Data"

IMPORTANT:
This is ONLY the FRONTEND/UI implementation.
Do NOT build backend logic, database integration, authentication, APIs, Supabase, or real payment processing.
Use mock data and simulated states only.

The backend and database will be implemented separately later.

====================================================
PROJECT PURPOSE
====================================================

MemShield is a privacy-aware security middleware concept for banking and digital payment applications.

The system demonstrates how sensitive user data can be:

1. Detected
2. Classified by privacy level
3. Evaluated based on destination
4. Protected using appropriate methods
5. Routed safely

The main concept is:

USER DATA
    ↓
DETECT
    ↓
CLASSIFY
    ↓
POLICY DECISION
    ↓
PROTECT
    ↓
ROUTE TO DESTINATION

The UI should visually communicate this complete flow.

====================================================
DESIGN STYLE
====================================================

Create a premium, modern cybersecurity SaaS dashboard.

Design characteristics:

• Dark cybersecurity theme
• Professional fintech appearance
• Modern glassmorphism elements
• Clean dashboard layout
• Responsive design
• Smooth transitions and animations
• Security-focused visual elements
• Blue, cyan, purple accents
• Dark navy/black background
• Green for SUCCESS / PROTECTED
• Yellow/orange for WARNING
• Red for BLOCKED / CRITICAL

Use:

• Modern typography
• Rounded cards
• Clean icons
• Data visualization
• Status badges
• Security indicators
• Progress steps
• Interactive UI components

The design should look suitable for:

Banking
Fintech
Cybersecurity
Privacy Technology
AI Security

Avoid making it look like a normal college project.
It should look like a real cybersecurity SaaS product.

====================================================
APPLICATION STRUCTURE
====================================================

Create the frontend with the following structure:

memshield/
│
├── frontend/
│   │
│   ├── components/
│   │   ├── Navbar
│   │   ├── Sidebar
│   │   ├── SecurityStatusCard
│   │   ├── PrivacyLevelBadge
│   │   ├── DestinationCard
│   │   ├── ProcessingStep
│   │   ├── DataDetectionCard
│   │   ├── PolicyDecisionCard
│   │   ├── ProtectionResultCard
│   │   ├── AuditLogTable
│   │   └── SecurityFlowVisualization
│   │
│   ├── pages/
│   │   ├── LandingPage
│   │   ├── Dashboard
│   │   ├── ProtectData
│   │   ├── DetectionResults
│   │   ├── PolicyEngine
│   │   ├── ProtectedOutput
│   │   ├── AuditLogs
│   │   └── Architecture
│   │
│   └── mock-data/
│
└── assets/

Create reusable UI components.

====================================================
PAGE 1 — LANDING PAGE
====================================================

Create a premium landing page.

NAVBAR:

Left:
🛡️ MemShield logo

Center/right navigation:

Home
Dashboard
Protect Data
Audit Logs
Architecture

Right side:

"Launch Dashboard" button

----------------------------------------------------

HERO SECTION:

Large heading:

"Protect Sensitive Data Before It Reaches the Destination."

Subheading:

"MemShield intelligently detects sensitive information, classifies privacy risks, and applies the right protection based on where your data is going."

Buttons:

[ Try MemShield ]

[ View Architecture ]

Add a visual cybersecurity illustration showing:

USER DATA
    ↓
MEMSHIELD
    ↓
DETECT
    ↓
CLASSIFY
    ↓
PROTECT
    ↓
DESTINATION

----------------------------------------------------

FEATURE SECTION:

Create 5 feature cards:

🔍 Sensitive Data Detection

Automatically identifies sensitive information.

🏷️ Privacy Classification

Classifies data based on sensitivity.

🧠 Smart Policy Engine

Decides the correct protection method.

🔐 Data Protection

Masking, tokenization, pseudonymization, and blocking.

🚦 Secure Routing

Routes protected data to the appropriate destination.

----------------------------------------------------

ADD A "HOW IT WORKS" SECTION:

Show:

1. Enter Data
2. Detect Sensitive Information
3. Classify Privacy Level
4. Apply Policy
5. Protect Data
6. Route Securely

Use an animated horizontal flow.

====================================================
PAGE 2 — DASHBOARD
====================================================

Create a professional cybersecurity dashboard.

SIDEBAR:

🛡️ MemShield

Navigation:

🏠 Dashboard
🛡️ Protect Data
🔍 Detection Results
🧠 Policy Engine
🔐 Protected Output
📋 Audit Logs
🏗️ Architecture

Bottom:

⚙️ Settings
👤 Demo User

----------------------------------------------------

TOP HEADER:

"Security Overview"

Subtitle:

"Monitor and visualize MemShield data protection activity."

----------------------------------------------------

CREATE 4 MAIN STATISTIC CARDS:

TOTAL REQUESTS
50

PROTECTED
42

BLOCKED
6

ALLOWED
2

Use mock data.

----------------------------------------------------

SECURITY STATUS SECTION:

Create a large card:

SYSTEM STATUS

● MemShield Engine — ACTIVE

● Policy Engine — ACTIVE

● Data Protection — ACTIVE

● Audit System — ACTIVE

----------------------------------------------------

RECENT ACTIVITY:

Show recent events:

Account Number → AI → MASKED → SUCCESS

Email → Analytics → ANONYMIZED → SUCCESS

OTP → AI → BLOCKED → CRITICAL

Account Number → Bank → TOKENIZED → SUCCESS

----------------------------------------------------

CREATE A PRIVACY LEVEL CHART:

PL1 — Low

PL2 — Personal

PL3 — Financial

PL4 — Critical

Show a modern bar chart or donut chart using mock data.

====================================================
PAGE 3 — PROTECT DATA
====================================================

This is the MAIN DEMO PAGE.

Title:

"Protect Sensitive Data"

Subtitle:

"Enter demo data and simulate how MemShield protects information before routing it."

----------------------------------------------------

IMPORTANT WARNING:

Show:

"Use demo data only. Do not enter real passwords, OTPs, PINs, CVVs, or banking credentials."

----------------------------------------------------

CREATE A LARGE DATA INPUT FORM.

FIELDS:

Full Name

Email Address

Phone Number

Account Number

Transaction Amount

Free Text Message

Example message:

"My account number is 1234567890. Please explain my transaction."

----------------------------------------------------

DESTINATION SELECTION:

Create three large selectable cards:

🏦 BANK

Description:
"Simulated banking backend"

🤖 AI SYSTEM

Description:
"Privacy-safe AI processing"

📊 ANALYTICS

Description:
"Anonymous data analytics"

Only one destination should appear selected at a time in the UI.

----------------------------------------------------

CREATE A PRIVACY PROCESS PREVIEW:

Before clicking process, show:

INPUT DATA
    ↓
DETECT
    ↓
CLASSIFY
    ↓
POLICY ENGINE
    ↓
PROTECT
    ↓
ROUTE

----------------------------------------------------

BUTTON:

🛡️ PROTECT & PROCESS

For now, use frontend mock behavior only.

When clicked, visually navigate to the processing results page.

====================================================
PAGE 4 — DETECTION RESULTS
====================================================

Title:

"Sensitive Data Detection"

Subtitle:

"MemShield has analyzed the submitted information."

Create detection cards.

Example:

────────────────────────

✓ EMAIL DETECTED

demo@example.com

Category:
Personal Information

Privacy Level:
PL2

────────────────────────

✓ PHONE NUMBER DETECTED

9876543210

Category:
Personal Information

Privacy Level:
PL2

────────────────────────

✓ ACCOUNT NUMBER DETECTED

1234567890

Category:
Financial Information

Privacy Level:
PL3

────────────────────────

Use appropriate icons and privacy badges.

----------------------------------------------------

PRIVACY LEVEL LEGEND:

PL1
LOW

PL2
PERSONAL

PL3
FINANCIAL

PL4
CRITICAL

Use different colors.

----------------------------------------------------

PROCESSING TIMELINE:

✓ Data Received

✓ Sensitive Data Detected

✓ Privacy Level Assigned

→ Sending to Policy Engine

====================================================
PAGE 5 — POLICY ENGINE
====================================================

Title:

"Policy Engine"

Subtitle:

"MemShield evaluates data sensitivity and destination before selecting a protection method."

----------------------------------------------------

CREATE A CENTRAL DECISION VISUALIZATION:

DATA TYPE
+
PRIVACY LEVEL
+
DESTINATION
        ↓
🧠 POLICY ENGINE
        ↓
PROTECTION ACTION

----------------------------------------------------

SHOW MOCK DECISIONS:

ACCOUNT NUMBER

Privacy Level:
PL3

Destination:
🤖 AI SYSTEM

Decision:

🥸 MASK / PSEUDONYMIZE

----------------------------------------------------

Create a policy rule table:

DATA TYPE | PRIVACY LEVEL | DESTINATION | ACTION

Account Number | PL3 | Bank | Tokenize

Account Number | PL3 | AI | Mask

Account Number | PL3 | Analytics | Anonymize

Email | PL2 | AI | Mask

Phone Number | PL2 | AI | Mask

OTP | PL4 | AI | Block

PIN | PL4 | Analytics | Block

----------------------------------------------------

Add a visual "Decision Explanation" card:

WHY THIS ACTION?

"The destination does not require the original account number. MemShield replaces sensitive information with a protected representation before routing the request."

====================================================
PAGE 6 — PROTECTED OUTPUT
====================================================

Title:

"Protected Data Output"

Subtitle:

"Compare the original demo data with the protected version."

----------------------------------------------------

CREATE A SIDE-BY-SIDE COMPARISON.

LEFT:

ORIGINAL DATA

Name:
Demo User

Email:
demo@example.com

Phone:
9876543210

Account:
1234567890

----------------------------------------------------

RIGHT:

MEMSHIELD PROTECTED DATA

Name:
USER_001

Email:
d***@example.com

Phone:
******3210

Account:
******7890

----------------------------------------------------

Show transformation arrows:

Original
      ↓
Protection Method
      ↓
Protected Output

----------------------------------------------------

PROTECTION ACTIONS:

🥸 MASKED

🎭 PSEUDONYMIZED

🎫 TOKENIZED

🔐 ENCRYPTED

🚫 BLOCKED

Use status cards.

----------------------------------------------------

If the destination is AI:

Show:

"AI SYSTEM RECEIVES"

My account number is <ACCOUNT_001>.
Please explain my transaction.

----------------------------------------------------

If destination is BANK:

Show:

"BANK SYSTEM RECEIVES"

TOKEN_TXN_A82X9

----------------------------------------------------

If destination is ANALYTICS:

Show:

"ANALYTICS SYSTEM RECEIVES"

USER_001

ACCOUNT_001

Transaction Amount: ₹10,000

====================================================
PAGE 7 — AUDIT LOGS
====================================================

Title:

"Security Audit Logs"

Subtitle:

"Track MemShield protection decisions and security events."

----------------------------------------------------

CREATE FILTERS:

All Events

Protected

Blocked

Critical

AI

Bank

Analytics

----------------------------------------------------

CREATE A PROFESSIONAL DATA TABLE.

Columns:

Timestamp

Data Type

Privacy Level

Destination

Action Taken

Status

----------------------------------------------------

Mock entries:

10:30 AM

Account Number

PL3

AI

MASKED

SUCCESS


10:28 AM

OTP

PL4

AI

BLOCKED

CRITICAL


10:20 AM

Email

PL2

Analytics

ANONYMIZED

SUCCESS


10:15 AM

Account Number

PL3

Bank

TOKENIZED

SUCCESS

----------------------------------------------------

Use color-coded status badges.

====================================================
PAGE 8 — ARCHITECTURE
====================================================

Title:

"MemShield Architecture"

Create a visually impressive architecture diagram.

Show:

                         👤 USER
                              │
                              ▼
                    📱 WEB APPLICATION
                              │
                              ▼
          ╔══════════════════════════════╗
          ║       🛡️ MEMSHIELD ENGINE    ║
          ║                              ║
          ║  1. DATA INTERCEPTOR         ║
          ║              ↓               ║
          ║  2. DATA DETECTOR 🔍         ║
          ║              ↓               ║
          ║  3. PRIVACY CLASSIFIER 🏷️   ║
          ║              ↓               ║
          ║  4. POLICY ENGINE 🧠         ║
          ║              ↓               ║
          ║  5. PROTECTION ENGINE 🔐    ║
          ╚═══════════════╦══════════════╝
                          ║
                          ▼
                    🚦 DESTINATION
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
           🏦 BANK      🤖 AI      📊 ANALYTICS

----------------------------------------------------

Below the diagram, explain each component with cards:

1. Data Interceptor

Receives user data for privacy processing.

2. Sensitive Data Detector

Identifies personal and financial information.

3. Privacy Classifier

Assigns PL1, PL2, PL3, or PL4.

4. Policy Engine

Determines the appropriate protection action.

5. Protection Engine

Applies masking, tokenization, anonymization, or blocking.

6. Destination Router

Routes protected data to the selected destination.

====================================================
REUSABLE UI COMPONENTS
====================================================

Create reusable components for:

• Navbar
• Sidebar
• Page Header
• Statistic Card
• Privacy Badge
• Status Badge
• Detection Card
• Destination Card
• Processing Step
• Policy Rule Row
• Protection Action Card
• Audit Table
• Architecture Node
• Security Status Indicator

====================================================
MOCK DATA
====================================================

Create mock data for all screens.

Example privacy levels:

PL1 → Low Sensitivity

PL2 → Personal Information

PL3 → Financial Information

PL4 → Critical Information


Example protection actions:

MASK

PSEUDONYMIZE

TOKENIZE

ANONYMIZE

ENCRYPT

BLOCK

====================================================
RESPONSIVE DESIGN
====================================================

The UI must work properly on:

• Desktop
• Laptop
• Tablet
• Mobile

On mobile:

• Sidebar should collapse
• Tables should scroll horizontally
• Cards should stack vertically
• Architecture should remain understandable

====================================================
UI INTERACTIONS
====================================================

Implement frontend-only interactions:

• Destination selection
• Tab navigation
• Sidebar navigation
• Mock "Protect & Process" flow
• Processing animation
• Status transitions
• Filter audit logs
• View original vs protected data

Do not connect to any backend.

Use mock data and frontend state only.

====================================================
FINAL DESIGN GOAL
====================================================

The application should feel like a real:

FINTECH + CYBERSECURITY + PRIVACY SaaS PLATFORM

The user should clearly understand the MemShield concept through the UI:

USER DATA
     ↓
MEMSHIELD DETECTS
     ↓
MEMSHIELD CLASSIFIES
     ↓
MEMSHIELD DECIDES
     ↓
MEMSHIELD PROTECTS
     ↓
DATA IS ROUTED SAFELY

The most important visual feature should be the ability to demonstrate:

THE SAME SENSITIVE DATA

GOING TO DIFFERENT DESTINATIONS

AND RECEIVING DIFFERENT PROTECTION.

Example:

ACCOUNT NUMBER

→ BANK = TOKENIZE

→ AI = MASK

→ ANALYTICS = ANONYMIZE

Make the UI polished, visually impressive, modern, and suitable for demonstrating as a college mini project, hackathon project, or cybersecurity portfolio project.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9f2766a1-a0bb-4478-b8b2-c44e5f5b3175).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
