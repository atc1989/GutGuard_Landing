"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type DashboardTab = "overview" | "profile" | "addresses" | "security";
type AddressType = "shipping" | "billing";

export interface MemberProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
}

export interface MemberAddress {
  id?: string;
  user_id: string;
  address_type: AddressType;
  recipient_name: string;
  phone: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

interface MemberDashboardProps {
  initialAddresses: MemberAddress[];
  initialProfile: MemberProfile;
}

const inputClass = "mt-2 block h-[50px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#4F63FF] focus:ring-2 focus:ring-[#4F63FF]/10";
const emptyAddress = (userId: string, addressType: AddressType): MemberAddress => ({
  user_id: userId,
  address_type: addressType,
  recipient_name: "",
  phone: "",
  street: "",
  barangay: "",
  city: "",
  province: "",
  postal_code: "",
  country: "Philippines",
});

const tabs: Array<{ id: DashboardTab; label: string; description: string }> = [
  { id: "overview", label: "Overview", description: "Your member home" },
  { id: "profile", label: "Profile", description: "Personal details" },
  { id: "addresses", label: "Addresses", description: "Shipping and billing" },
  { id: "security", label: "Security", description: "Password and access" },
];

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] !text-[#4F63FF]">{eyebrow}</p>
      <h2 className="mt-3 text-[2rem] font-normal tracking-[-0.055em] text-slate-950 sm:text-[2.4rem]">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">{body}</p>
    </div>
  );
}

function AddressFields({
  address,
  onChange,
}: {
  address: MemberAddress;
  onChange: (field: keyof MemberAddress, value: string) => void;
}) {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <label className="text-sm text-slate-600">
        Recipient name
        <input className={inputClass} onChange={(event) => onChange("recipient_name", event.target.value)} required value={address.recipient_name} />
      </label>
      <label className="text-sm text-slate-600">
        Phone number
        <input className={inputClass} onChange={(event) => onChange("phone", event.target.value)} required type="tel" value={address.phone} />
      </label>
      <label className="text-sm text-slate-600 sm:col-span-2">
        Street address
        <input className={inputClass} onChange={(event) => onChange("street", event.target.value)} required value={address.street} />
      </label>
      <label className="text-sm text-slate-600">
        Barangay
        <input className={inputClass} onChange={(event) => onChange("barangay", event.target.value)} required value={address.barangay} />
      </label>
      <label className="text-sm text-slate-600">
        City or municipality
        <input className={inputClass} onChange={(event) => onChange("city", event.target.value)} required value={address.city} />
      </label>
      <label className="text-sm text-slate-600">
        Province
        <input className={inputClass} onChange={(event) => onChange("province", event.target.value)} required value={address.province} />
      </label>
      <label className="text-sm text-slate-600">
        Postal code
        <input className={inputClass} onChange={(event) => onChange("postal_code", event.target.value)} required value={address.postal_code} />
      </label>
      <label className="text-sm text-slate-600 sm:col-span-2">
        Country
        <input className={inputClass} onChange={(event) => onChange("country", event.target.value)} required value={address.country} />
      </label>
    </div>
  );
}

export default function MemberDashboard({ initialAddresses, initialProfile }: MemberDashboardProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [profile, setProfile] = useState(initialProfile);
  const [shipping, setShipping] = useState(initialAddresses.find((address) => address.address_type === "shipping") ?? emptyAddress(initialProfile.id, "shipping"));
  const [billing, setBilling] = useState(initialAddresses.find((address) => address.address_type === "billing") ?? emptyAddress(initialProfile.id, "billing"));
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const profileCompletion = useMemo(() => {
    const fields = [profile.first_name, profile.last_name, profile.phone, shipping.street, shipping.city];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [profile, shipping]);

  const displayName = profile.first_name || profile.full_name || profile.email.split("@")[0];

  function resetFeedback() {
    setMessage("");
    setError("");
  }

  function changeAddress(type: AddressType, field: keyof MemberAddress, value: string) {
    resetFeedback();
    if (type === "shipping") {
      setShipping((current) => ({ ...current, [field]: value }));
      if (sameAsShipping) {
        setBilling((current) => ({ ...current, [field]: value }));
      }
      return;
    }
    setBilling((current) => ({ ...current, [field]: value }));
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetFeedback();
    if (!supabase) return setError("Supabase is not configured.");

    setSaving(true);
    const fullName = `${profile.first_name} ${profile.last_name}`.trim();
    const { error: saveError } = await supabase.from("profiles").upsert({
      id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      full_name: fullName,
      phone: profile.phone,
    });
    setSaving(false);

    if (saveError) return setError(saveError.message);
    setProfile((current) => ({ ...current, full_name: fullName }));
    setMessage("Profile updated successfully.");
    router.refresh();
  }

  async function saveAddresses(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetFeedback();
    if (!supabase) return setError("Supabase is not configured.");

    setSaving(true);
    const addressPayload = [shipping, billing].map((address) => ({
      user_id: address.user_id,
      address_type: address.address_type,
      recipient_name: address.recipient_name,
      phone: address.phone,
      street: address.street,
      barangay: address.barangay,
      city: address.city,
      province: address.province,
      postal_code: address.postal_code,
      country: address.country,
    }));
    const { error: saveError } = await supabase.from("addresses").upsert(addressPayload, { onConflict: "user_id,address_type" });
    setSaving(false);

    if (saveError) return setError(saveError.message);
    setMessage("Addresses saved successfully.");
    router.refresh();
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetFeedback();
    if (!supabase) return setError("Supabase is not configured.");
    if (newPassword !== confirmPassword) return setError("Passwords do not match.");

    setSaving(true);
    const { error: saveError } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);

    if (saveError) return setError(saveError.message);
    setNewPassword("");
    setConfirmPassword("");
    setMessage("Password updated successfully.");
  }

  async function logOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[linear-gradient(180deg,#F7F9FF_0%,#EEF3FF_100%)] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[270px_1fr]">
        <aside className="rounded-[28px] bg-[#071B54] p-5 text-white shadow-[0_22px_60px_rgba(7,27,84,0.2)] lg:min-h-[720px]">
          <div className="border-b border-white/12 px-2 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#AFC4FF]">GutGuard member</p>
            <p className="mt-2 text-xl font-medium text-white">{displayName}</p>
            <p className="mt-1 truncate text-xs !text-white/60">{profile.email}</p>
          </div>
          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col" aria-label="Account navigation">
            {tabs.map((tab) => (
              <button
                className={`min-w-fit rounded-xl px-4 py-3 text-left transition lg:w-full ${activeTab === tab.id ? "bg-white text-[#071B54]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
                key={tab.id}
                onClick={() => {
                  resetFeedback();
                  setActiveTab(tab.id);
                }}
                type="button"
              >
                <span className="block text-sm font-semibold">{tab.label}</span>
                <span className={`mt-1 hidden text-xs lg:block ${activeTab === tab.id ? "text-slate-500" : "text-white/45"}`}>{tab.description}</span>
              </button>
            ))}
          </nav>
          <Button className="mt-5 w-full border-white/20 !text-white hover:bg-white/10" lift={false} onClick={logOut} variant="outline-light">
            Log out
          </Button>
        </aside>

        <section className="min-w-0 rounded-[30px] border border-white/80 bg-white/92 p-6 shadow-[0_24px_70px_rgba(7,27,84,0.08)] sm:p-8 lg:p-10">
          {message && <p className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm !text-emerald-700">{message}</p>}
          {error && <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm !text-red-700">{error}</p>}

          {activeTab === "overview" && (
            <div>
              <SectionHeading eyebrow="Member dashboard" title={`Welcome back, ${displayName}.`} body="Keep your GutGuard account ready for a smoother shopping experience and stay connected to your member benefits." />
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <article className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-6">
                  <p className="text-sm font-semibold text-slate-950">Profile completion</p>
                  <p className="mt-2 text-3xl font-semibold text-[#1010C9]">{profileCompletion}%</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#1010C9,#6268F7)]" style={{ width: `${profileCompletion}%` }} />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-500">Complete your contact details and delivery address before your next order.</p>
                  <Button className="mt-5" lift={false} onClick={() => setActiveTab("profile")} variant="auth-outline">Update profile</Button>
                </article>
                <article className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#071B54_0%,#253E9D_100%)] p-6 text-white">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#6268F7]/45 blur-2xl" />
                  <p className="relative text-xs font-semibold uppercase tracking-[0.18em] !text-[#BFD1FF]">Member benefits</p>
                  <h3 className="relative mt-3 text-2xl font-normal text-white">More value for your gut health journey.</h3>
                  <p className="relative mt-4 text-sm leading-6 !text-white/75">Enjoy member pricing, early product updates, and a faster checkout once your address is saved.</p>
                  <Button className="relative mt-5 border-white/30 !text-white hover:bg-white/10" href="/shop" lift={false} variant="outline-light">Visit the shop</Button>
                </article>
                <article className="rounded-[24px] border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#4F63FF]">Quick action</p>
                  <h3 className="mt-3 text-xl font-medium text-slate-950">Delivery addresses</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">Save shipping and billing information so it is ready when ordering becomes available.</p>
                  <Button className="mt-5" lift={false} onClick={() => setActiveTab("addresses")} variant="auth-outline">Manage addresses</Button>
                </article>
                <article className="rounded-[24px] border border-[#F4B400]/30 bg-[#FFF9E8] p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#9A6E00]">Referral rewards</p>
                    <span className="rounded-full bg-[#F4B400]/18 px-3 py-1 text-xs font-semibold text-[#7A5800]">Coming soon</span>
                  </div>
                  <h3 className="mt-3 text-xl font-medium text-slate-950">Share GutGuard with your circle.</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">A personal referral link and reward tracking will appear here in a future update.</p>
                </article>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <SectionHeading eyebrow="Profile" title="Your account details" body="Keep your contact information current. Your email is tied to your login and cannot be changed here." />
              <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={saveProfile}>
                <label className="text-sm text-slate-600">First name<input className={inputClass} onChange={(event) => setProfile({ ...profile, first_name: event.target.value })} required value={profile.first_name} /></label>
                <label className="text-sm text-slate-600">Last name<input className={inputClass} onChange={(event) => setProfile({ ...profile, last_name: event.target.value })} required value={profile.last_name} /></label>
                <label className="text-sm text-slate-600">Phone number<input className={inputClass} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} type="tel" value={profile.phone} /></label>
                <label className="text-sm text-slate-600">Email address<input className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-500`} disabled value={profile.email} /></label>
                <div className="sm:col-span-2"><Button disabled={saving} lift={false} type="submit" variant="auth-primary">{saving ? "Saving..." : "Save profile"}</Button></div>
              </form>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <SectionHeading eyebrow="Addresses" title="Delivery details" body="Store one shipping and one billing address for a faster checkout experience." />
              <form className="mt-8 space-y-6" onSubmit={saveAddresses}>
                <article className="rounded-[24px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-slate-950">Shipping address</h3>
                  <AddressFields address={shipping} onChange={(field, value) => changeAddress("shipping", field, value)} />
                </article>
                <article className="rounded-[24px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-950">Billing address</h3>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        checked={sameAsShipping}
                        className="h-4 w-4 accent-[#1010C9]"
                        onChange={(event) => {
                          setSameAsShipping(event.target.checked);
                          if (event.target.checked) setBilling({ ...shipping, id: billing.id, address_type: "billing" });
                        }}
                        type="checkbox"
                      />
                      Same as shipping
                    </label>
                  </div>
                  <AddressFields address={billing} onChange={(field, value) => changeAddress("billing", field, value)} />
                </article>
                <Button disabled={saving} lift={false} type="submit" variant="auth-primary">{saving ? "Saving..." : "Save addresses"}</Button>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <SectionHeading eyebrow="Security" title="Password and access" body="Update your password regularly and sign out when using a shared device." />
              <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                <p className="text-sm text-slate-500">Signed in as</p>
                <p className="mt-1 font-medium text-slate-950">{profile.email}</p>
              </div>
              <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={updatePassword}>
                <label className="text-sm text-slate-600">New password<input className={inputClass} minLength={6} onChange={(event) => setNewPassword(event.target.value)} required type="password" value={newPassword} /></label>
                <label className="text-sm text-slate-600">Confirm password<input className={inputClass} minLength={6} onChange={(event) => setConfirmPassword(event.target.value)} required type="password" value={confirmPassword} /></label>
                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <Button disabled={saving} lift={false} type="submit" variant="auth-primary">{saving ? "Saving..." : "Update password"}</Button>
                  <Button lift={false} onClick={logOut} variant="auth-outline">Log out</Button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
