CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  is_unsw BOOLEAN NOT NULL DEFAULT TRUE,
  university TEXT DEFAULT 'UNSW',
  zid TEXT DEFAULT '',
  year_of_study INT,
  degree TEXT DEFAULT '',
  faculty TEXT DEFAULT '',
  gender TEXT DEFAULT '',
  dietary_requirements TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('standard', 'open')),
  join_code TEXT UNIQUE NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  competition_year INT NOT NULL DEFAULT 2026,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('captain', 'member')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, profile_id)
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  square_payment_id TEXT UNIQUE NOT NULL,
  amount_cents INT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'AUD',
  status TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('checkout', 'webhook')),
  created_at TIMESTAMPTZ DEFAULT now()
);
