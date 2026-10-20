# ApplyDock ⚓

> **The intelligent, disciplined job search & interview command center for ambitious engineers.**

ApplyDock replaces messy spreadsheets and disjointed notes with high-density pipeline management, automated relative-time interview countdowns, structured `৳` compensation benchmarking, and 1–5 technical skill gap profiling.

---

## 🌟 Key Capabilities

### 1. Dual-Engine Application Pipeline
- **Adaptive Kanban Board**: 6 core stages (`Wishlist`, `Applied`, `Screening`, `Interview`, `Offer`, `Rejected`/`Withdrawn`) engineered with zero forced horizontal scrolling.
- **Tabular Data Grid**: High-density table view with real-time keyword search, work mode filtering (`Hybrid`, `Remote`, `On-site`), and column sorting.
- **Slide-Over Inspector Drawer**: Comprehensive drawer detailing job specifications, recruiter contacts, technical skills match/gap indicators, private preparation notes, and an immutable audit timeline.

### 2. Interview Milestones & Overdue Alerts
- Automated relative-time countdown calculations (`In 2 days`, `Tomorrow`, `Today`, `Overdue`).
- Visual priority badges and direct reminders for hiring manager follow-ups.

### 3. Structured Bangladeshi Compensation Tracking (`৳`)
- Formatted with standard Bangladeshi Taka (`৳`) notation across all views (never generic dollar signs or raw currency codes).
- Tracks monthly gross base pay, festival bonuses (2x annual), and market benchmarks across mid-level, senior, and lead engineering roles.

### 4. 1–5 Technical Skill Profiler & Gap Analysis
- Standardized 5-level proficiency scale:
  - **1**: Novice
  - **2**: Advanced Beginner
  - **3**: Competent
  - **4**: Proficient
  - **5**: Expert
- Automatic comparison of declared competencies against target job requirements with visual progress meters and delta gap alerts (`Target: L5 (+2)`).

### 5. Prioritized Sprint Milestones
- Actionable learning tasks linked directly to target skills with due dates and priority badges (`High`, `Medium`, `Low`).
- One-click task completion toggling with animated progress tracking.

### 6. Full Data Portability & Privacy
- **RFC 4180 CSV Export**: One-click safe CSV export with proper delimiter quoting, formula injection protection, and CRLF line breaks.
- **Full Workspace JSON Backup**: Download a complete structured archive of all your applications, skills, and tasks.
- **User-Isolated Database**: Backed by PostgreSQL with strict user-id scoping on every server action.

### 7. Modern Art-Directed Presentation
- **Simplify.jobs-Inspired Hero**: Clear typography with **DM Serif Display**, generous whitespace, and focused CTAs.
- **Floating Pill Navbar**: Smoothly transforms into a centered, rounded-full floating pill on scroll with backdrop blur.
- **Dark/Light Theme**: Purpose-built palette with warm neutral porcelain surfaces and restrained emerald accent (`#0f766e` / `#10b981`).

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.4.2](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Lucide React |
| **Typography** | Geist Sans & DM Serif Display |
| **Database** | PostgreSQL ([Supabase](https://supabase.com/)) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) with drizzle-kit migrations |
| **Authentication** | [NextAuth.js v5](https://authjs.dev/) (Edge-safe split architecture, bcryptjs) |
| **Validation** | [Zod](https://zod.dev/) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v20.x` or `v24.x`
- npm `v10.x` or higher
- A PostgreSQL database connection (e.g. Supabase, Neon, or local PostgreSQL)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ShahriarALshihab/applydock.git
cd applydock
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your database URL and generate an auth secret:
```env
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
AUTH_SECRET="your-32-byte-base64-secret"
NEXTAUTH_URL="http://localhost:3000"
AUTH_URL="http://localhost:3000"
```

### 3. Run Database Migrations & Seed Data
```bash
# Push schema directly to database
npx drizzle-kit push

# (Optional) Seed demo user, applications, skills, and tasks
npx tsx src/db/seed.ts
```

### 4. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Demo Account Credentials

For quick evaluation, sign in at **`/login`** using the seeded account:
- **Email**: `demo@proofly.local`
- **Password**: `Password123!`

Or create a new private workspace anytime at **`/register`**.

---

## 🧪 Quality & Verification Scripts

```bash
# Type check all TypeScript files
npm run typecheck

# Lint check with zero warnings allowed
npm run lint

# Compile optimized production build
npm run build
```

---

## 📄 License
MIT License. Built for disciplined engineering careers.
