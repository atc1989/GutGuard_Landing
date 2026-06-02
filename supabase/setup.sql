-- Run this once in the Supabase SQL Editor.
-- Supabase Auth manages passwords in auth.users. This public table stores
-- application-facing profile fields and is created automatically on signup.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  full_name text,
  phone text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.profiles add column if not exists phone text;
alter table public.profiles enable row level security;
grant select, insert, update on public.profiles to authenticated;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles
  for select
  using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'full_name'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker set search_path = ''
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  address_type text not null check (address_type in ('shipping', 'billing')),
  recipient_name text not null default '',
  phone text not null default '',
  street text not null default '',
  barangay text not null default '',
  city text not null default '',
  province text not null default '',
  postal_code text not null default '',
  country text not null default 'Philippines',
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (user_id, address_type)
);

alter table public.addresses enable row level security;
grant select, insert, update, delete on public.addresses to authenticated;

drop policy if exists "Users can view their own addresses" on public.addresses;
create policy "Users can view their own addresses"
  on public.addresses
  for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own addresses" on public.addresses;
create policy "Users can insert their own addresses"
  on public.addresses
  for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own addresses" on public.addresses;
create policy "Users can update their own addresses"
  on public.addresses
  for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own addresses" on public.addresses;
create policy "Users can delete their own addresses"
  on public.addresses
  for delete
  using ((select auth.uid()) = user_id);

drop trigger if exists set_addresses_updated_at on public.addresses;
create trigger set_addresses_updated_at
  before update on public.addresses
  for each row execute procedure public.set_updated_at();
