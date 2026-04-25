create table companion_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  age integer not null,
  state text not null,
  bio text not null,
  topics text[] not null default '{}',
  availability text[] not null default '{}',
  hours_per_week text not null,
  social_link text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
