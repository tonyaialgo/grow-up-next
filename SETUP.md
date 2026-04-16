# Grow Up - Next.js + Supabase Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

---

## 1. Supabase Project Setup

### Create a new Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and two keys from **Settings > API**:
   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` — service role key (keep secret!)

### Run the database schema

In the Supabase Dashboard, go to **SQL Editor** and run this SQL:

```sql
-- Schools table
create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  band text check (band in ('Band 1', 'Band 2', 'Band 3')),
  type text not null,
  district text not null,
  level text check (level in ('小學', '中學')),
  features text[] default '{}',
  image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Calendar events table
create table calendar_events (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  title text not null,
  level text not null,
  description text,
  urgent boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Study tips table
create table study_tips (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level text check (level in ('ALL', 'P', 'S')),
  icon text default 'Lightbulb',
  color text default 'primary',
  items text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admissions guides table
create table admissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level text,
  icon text default 'BookOpen',
  color text default 'primary',
  topics text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admin users table (optional - for DB-based auth)
create table admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password text not null,
  name text,
  created_at timestamptz default now()
);

-- Enable Row Level Security (optional - disable for dev)
-- alter table schools enable row level security;
-- alter table calendar_events enable row level security;
-- alter table study_tips enable row level security;
-- alter table admissions enable row level security;

-- Allow public read access (for development)
create policy "Allow public read" on schools for select using (true);
create policy "Allow public insert" on schools for insert with check (true);
create policy "Allow public update" on schools for update using (true);
create policy "Allow public delete" on schools for delete using (true);

create policy "Allow public read" on calendar_events for select using (true);
create policy "Allow public insert" on calendar_events for insert with check (true);
create policy "Allow public update" on calendar_events for update using (true);
create policy "Allow public delete" on calendar_events for delete using (true);

create policy "Allow public read" on study_tips for select using (true);
create policy "Allow public insert" on study_tips for insert with check (true);
create policy "Allow public update" on study_tips for update using (true);
create policy "Allow public delete" on study_tips for delete using (true);

create policy "Allow public read" on admissions for select using (true);
create policy "Allow public insert" on admissions for insert with check (true);
create policy "Allow public update" on admissions for update using (true);
create policy "Allow public delete" on admissions for delete using (true);
```

---

## 2. Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

> **Important:** Never commit `.env.local` to version control. The `SUPABASE_SERVICE_ROLE_KEY` gives full database access — keep it secret.

---

## 3. Install Dependencies

```bash
cd grow-up-next
npm install
```

---

## 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Default Admin Login

```
Email: admin@growup.hk
Password: GrowUp2026!
```

---

## 5. Project Structure

```
grow-up-next/
├── src/
│   ├── app/
│   │   ├── (main)/              # Public pages
│   │   │   ├── page.tsx         # Home
│   │   │   ├── academic/        # Academic hub
│   │   │   ├── health/          # Health center
│   │   │   ├── wellbeing/       # Wellbeing hub
│   │   │   └── assessment/      # AI assessment
│   │   ├── (admin)/             # Admin panel
│   │   │   ├── login/           # Admin login
│   │   │   ├── dashboard/      # Dashboard
│   │   │   ├── schools/        # Schools CRUD
│   │   │   ├── events/         # Events CRUD
│   │   │   ├── tips/           # Tips CRUD
│   │   │   └── guides/         # Guides CRUD
│   │   └── api/                 # API routes
│   │       ├── auth/login/
│   │       ├── schools/[id]/
│   │       ├── events/[id]/
│   │       ├── tips/[id]/
│   │       └── guides/[id]/
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── MainLayout.tsx       # Public layout
│   │   └── AdminLayout.tsx      # Admin layout
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Browser Supabase client
│   │   │   └── server.ts       # Server Supabase client
│   │   └── utils.ts             # Utility functions
│   └── types/
│       └── index.ts             # TypeScript types
├── SETUP.md                     # This file
└── package.json
```

---

## 6. Deployment

### Vercel (Recommended)

1. Push the code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the project
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

### Other platforms (Netlify, Railway, etc.)

Set the same environment variables in your hosting dashboard.

---

## 7. API Routes Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/schools` | List all schools |
| POST | `/api/schools` | Create school |
| PUT | `/api/schools/[id]` | Update school |
| DELETE | `/api/schools/[id]` | Delete school |
| GET | `/api/events` | List all events |
| POST | `/api/events` | Create event |
| PUT | `/api/events/[id]` | Update event |
| DELETE | `/api/events/[id]` | Delete event |
| GET | `/api/tips` | List all tips |
| POST | `/api/tips` | Create tip |
| PUT | `/api/tips/[id]` | Update tip |
| DELETE | `/api/tips/[id]` | Delete tip |
| GET | `/api/guides` | List all guides |
| POST | `/api/guides` | Create guide |
| PUT | `/api/guides/[id]` | Update guide |
| DELETE | `/api/guides/[id]` | Delete guide |

---

## 8. Customization

### Change Admin Credentials

Edit `src/app/api/auth/login/route.ts`:

```typescript
const ADMIN_EMAIL = "your-email@domain.com";
const ADMIN_PASSWORD = "your-secure-password";
```

### Change Branding Colors

Edit `tailwind.config.ts` — the project uses:
- Primary purple: `#a855f7` (primary-500)
- Accent sky blue: `#0ea5e9` (accent-500)

### Add Sample Data

After logging into the admin panel, use the "Quick Actions" on the dashboard to add sample data, or insert directly via Supabase SQL Editor:

```sql
-- Sample schools
insert into schools (name, band, type, district, level, features) values
('聖保羅書院', 'Band 1', '男校', '中西區', '中學', '{"STEM", "音樂", "體育"}'),
('拔萃女書院', 'Band 1', '女校', '油尖旺', '中學', '{"音樂", "舞蹈", "學術"}'),
('喇沙書院', 'Band 1', '男校', '九龍城', '中學', '{"足球", "籃球", "STEM"}');

-- Sample events
insert into calendar_events (date, title, level, description, urgent) values
('2026-05-15', '小一自行分配學位截止', 'P1', '2026年度小一自行分配學位申請截止日期', true),
('2026-04-20', '中一自行分配學位截止', 'S1', '2026年度中一自行分配學位申請截止日期', true),
('2026-06-01', '學校開放日', 'ALL', '全校開放日，歡迎家長參觀', false);

-- Sample tips
insert into study_tips (title, description, level, items) values
('小一適應攻略', '幫助孩子順利適應小學生活', 'P', '{"建立作息規律", "預習新課本", "培養閱讀習慣"}'),
('升中面試技巧', '準備中學面試的實用建議', 'S', '{"練習自我介紹", "了解學校背景", "準備常見問題"}');

-- Sample guides
insert into admissions (title, description, level, topics) values
('小一自行分配學位', '2026年度小一自行分配學位申請須知', 'P', '{"申請資格", "計分方法", "重要日期", "所需文件"}'),
('中一自行分配學位', '2026年度中一自行分配學位申請須知', 'S', '{"申請資格", "計分方法", "面試準備", "重要日期"}');
```
