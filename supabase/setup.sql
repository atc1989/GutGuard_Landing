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

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price numeric(12, 2) not null check (price >= 0),
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

insert into public.products (slug, name, price)
values
  ('gutguard-synbiotic', 'GutGuard SynBiotic+', 3800.00),
  ('gutguard-synbiotic-blister-pack', 'GutGuard SynBiotic+ Blister Pack', 1299.00)
on conflict (slug) do update
set name = excluded.name,
    price = excluded.price,
    active = true;

alter table public.products enable row level security;
grant select on public.products to anon, authenticated;

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products
  for select
  using (active = true);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated by default as identity unique,
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'processing' check (status in ('processing', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  shipping_fee numeric(12, 2) not null default 0 check (shipping_fee >= 0),
  processing_fee numeric(12, 2) not null default 0 check (processing_fee >= 0),
  total numeric(12, 2) not null check (total >= 0),
  payment_method text not null default 'cash_on_delivery',
  shipping_address jsonb,
  billing_address jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  line_total numeric(12, 2) not null check (line_total >= 0),
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
grant select on public.orders, public.order_items to authenticated;

drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
  on public.orders
  for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can view their own order items" on public.order_items;
create policy "Users can view their own order items"
  on public.order_items
  for select
  using (
    exists (
      select 1
      from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = (select auth.uid())
    )
  );

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

create or replace function public.place_order(product_slug text, item_quantity integer)
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  selected_product public.products%rowtype;
  shipping_snapshot jsonb;
  billing_snapshot jsonb;
  new_order_id uuid;
  order_subtotal numeric(12, 2);
begin
  if current_user_id is null then
    raise exception 'You must be logged in to place an order.';
  end if;

  if item_quantity is null or item_quantity < 1 or item_quantity > 99 then
    raise exception 'Quantity must be between 1 and 99.';
  end if;

  select *
  into selected_product
  from public.products
  where slug = product_slug
    and active = true;

  if not found then
    raise exception 'Product is unavailable.';
  end if;

  select to_jsonb(addresses) - 'id' - 'user_id' - 'address_type' - 'created_at' - 'updated_at'
  into shipping_snapshot
  from public.addresses
  where user_id = current_user_id
    and address_type = 'shipping';

  select to_jsonb(addresses) - 'id' - 'user_id' - 'address_type' - 'created_at' - 'updated_at'
  into billing_snapshot
  from public.addresses
  where user_id = current_user_id
    and address_type = 'billing';

  order_subtotal := selected_product.price * item_quantity;

  insert into public.orders (user_id, subtotal, total, shipping_address, billing_address)
  values (current_user_id, order_subtotal, order_subtotal, shipping_snapshot, billing_snapshot)
  returning id into new_order_id;

  insert into public.order_items (order_id, product_id, product_name, quantity, unit_price, line_total)
  values (new_order_id, selected_product.id, selected_product.name, item_quantity, selected_product.price, order_subtotal);

  return new_order_id;
end;
$$;

revoke all on function public.place_order(text, integer) from public;
grant execute on function public.place_order(text, integer) to authenticated;

alter table public.orders add column if not exists notes text;

create or replace function public.place_cart_order(
  cart_items jsonb,
  billing_details jsonb,
  shipping_details jsonb,
  order_notes text default '',
  selected_payment_method text default 'cash_on_delivery'
)
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  cart_item jsonb;
  selected_product public.products%rowtype;
  new_order_id uuid;
  order_subtotal numeric(12, 2) := 0;
  order_shipping_fee numeric(12, 2) := 45.60;
  order_processing_fee numeric(12, 2);
  quantity_value integer;
begin
  if current_user_id is null then
    raise exception 'You must be logged in to place an order.';
  end if;

  if coalesce(selected_payment_method, '') not in ('cash_on_delivery', 'security_bank') then
    raise exception 'This payment method is not available yet.';
  end if;

  if cart_items is null or jsonb_typeof(cart_items) <> 'array' or jsonb_array_length(cart_items) = 0 then
    raise exception 'Your cart is empty.';
  end if;

  if billing_details is null or shipping_details is null then
    raise exception 'Billing and shipping details are required.';
  end if;

  for cart_item in select value from jsonb_array_elements(cart_items)
  loop
    quantity_value := (cart_item ->> 'quantity')::integer;
    if quantity_value < 1 or quantity_value > 99 then
      raise exception 'Quantity must be between 1 and 99.';
    end if;

    select *
    into selected_product
    from public.products
    where slug = cart_item ->> 'slug'
      and active = true;

    if not found then
      raise exception 'A product in your cart is unavailable.';
    end if;

    order_subtotal := order_subtotal + (selected_product.price * quantity_value);
  end loop;

  order_processing_fee := round(order_subtotal * 0.07386, 2);

  insert into public.orders (
    user_id,
    subtotal,
    shipping_fee,
    processing_fee,
    total,
    payment_method,
    shipping_address,
    billing_address,
    notes
  )
  values (
    current_user_id,
    order_subtotal,
    order_shipping_fee,
    order_processing_fee,
    order_subtotal + order_shipping_fee + order_processing_fee,
    selected_payment_method,
    shipping_details,
    billing_details,
    nullif(order_notes, '')
  )
  returning id into new_order_id;

  for cart_item in select value from jsonb_array_elements(cart_items)
  loop
    quantity_value := (cart_item ->> 'quantity')::integer;
    select *
    into selected_product
    from public.products
    where slug = cart_item ->> 'slug'
      and active = true;

    insert into public.order_items (order_id, product_id, product_name, quantity, unit_price, line_total)
    values (new_order_id, selected_product.id, selected_product.name, quantity_value, selected_product.price, selected_product.price * quantity_value);
  end loop;

  return new_order_id;
end;
$$;

revoke all on function public.place_cart_order(jsonb, jsonb, jsonb, text, text) from public;
grant execute on function public.place_cart_order(jsonb, jsonb, jsonb, text, text) to authenticated;
