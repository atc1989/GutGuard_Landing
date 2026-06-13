"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CircleUserRound,
  Gift,
  Home,
  KeyRound,
  LogOut,
  MapPin,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import OrdersPanel, { type MemberOrder } from "@/components/account/OrdersPanel";

type DashboardTab = "overview" | "orders" | "profile" | "addresses" | "security";
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
  initialOrders: MemberOrder[];
  initialProfile: MemberProfile;
  initialTab?: DashboardTab;
}

const inputClass = "mt-2 h-10 rounded-lg bg-white px-3 shadow-none focus-visible:border-[#4F63FF] focus-visible:ring-[#4F63FF]/20";
const tabs: Array<{ id: DashboardTab; label: string; description: string; icon: typeof Home }> = [
  { id: "overview", label: "Overview", description: "Your member home", icon: Home },
  { id: "orders", label: "Orders", description: "Purchase history", icon: ReceiptText },
  { id: "profile", label: "Profile", description: "Personal details", icon: UserRound },
  { id: "addresses", label: "Addresses", description: "Shipping and billing", icon: MapPin },
  { id: "security", label: "Security", description: "Password and access", icon: ShieldCheck },
];

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

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#4F63FF]">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{body}</p>
    </div>
  );
}

function AddressFields({ address, onChange }: { address: MemberAddress; onChange: (field: keyof MemberAddress, value: string) => void }) {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <Label className="block text-slate-600">Recipient name<Input className={inputClass} onChange={(event) => onChange("recipient_name", event.target.value)} required value={address.recipient_name} /></Label>
      <Label className="block text-slate-600">Phone number<Input className={inputClass} onChange={(event) => onChange("phone", event.target.value)} required type="tel" value={address.phone} /></Label>
      <Label className="block text-slate-600 sm:col-span-2">Street address<Input className={inputClass} onChange={(event) => onChange("street", event.target.value)} required value={address.street} /></Label>
      <Label className="block text-slate-600">Barangay<Input className={inputClass} onChange={(event) => onChange("barangay", event.target.value)} required value={address.barangay} /></Label>
      <Label className="block text-slate-600">City or municipality<Input className={inputClass} onChange={(event) => onChange("city", event.target.value)} required value={address.city} /></Label>
      <Label className="block text-slate-600">Province<Input className={inputClass} onChange={(event) => onChange("province", event.target.value)} required value={address.province} /></Label>
      <Label className="block text-slate-600">Postal code<Input className={inputClass} onChange={(event) => onChange("postal_code", event.target.value)} required value={address.postal_code} /></Label>
      <Label className="block text-slate-600 sm:col-span-2">Country<Input className={inputClass} onChange={(event) => onChange("country", event.target.value)} required value={address.country} /></Label>
    </div>
  );
}

export default function MemberDashboard({ initialAddresses, initialOrders, initialProfile, initialTab = "overview" }: MemberDashboardProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
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
  const initials = `${profile.first_name[0] ?? ""}${profile.last_name[0] ?? ""}`.toUpperCase() || displayName.slice(0, 2).toUpperCase();

  function resetFeedback() {
    setMessage("");
    setError("");
  }

  function changeAddress(type: AddressType, field: keyof MemberAddress, value: string) {
    resetFeedback();
    if (type === "shipping") {
      setShipping((current) => ({ ...current, [field]: value }));
      if (sameAsShipping) setBilling((current) => ({ ...current, [field]: value }));
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
    const { error: saveError } = await supabase.from("profiles").upsert({ ...profile, full_name: fullName });
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
    const addressPayload = [shipping, billing].map(({ user_id, address_type, recipient_name, phone, street, barangay, city, province, postal_code, country }) => ({
      user_id, address_type, recipient_name, phone, street, barangay, city, province, postal_code, country,
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
    <SidebarProvider className="min-h-[calc(100vh-72px)] bg-[#F7F9FC]">
      <Tabs className="flex w-full flex-row gap-0" onValueChange={(value: string) => { resetFeedback(); setActiveTab(value as DashboardTab); }} value={activeTab}>
        <Sidebar className="hidden border-r border-slate-200 bg-white lg:flex" collapsible="none">
          <SidebarHeader className="h-[76px] justify-center px-5 py-0">
            <div className="flex items-center gap-3">
              <Avatar className="size-11"><AvatarFallback className="bg-[#1010C9] font-semibold !text-white">{initials}</AvatarFallback></Avatar>
              <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-950">{displayName}</p><p className="truncate text-xs text-slate-500">{profile.email}</p></div>
            </div>
          </SidebarHeader>
          <Separator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tabs.map((tab) => (
                    <SidebarMenuItem key={tab.id}>
                      <SidebarMenuButton className="h-10" isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
                        <tab.icon /><span>{tab.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4"><Button className="justify-start" onClick={logOut} variant="ghost"><LogOut />Log out</Button></SidebarFooter>
        </Sidebar>

        <div className="max-h-[calc(100vh-72px)] min-w-0 flex-1 overflow-y-auto">
          <header className="h-[76px] border-b border-slate-200 bg-white px-5 sm:px-8">
            <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] !text-[#4F63FF]">My account</p><p className="mt-1 text-lg font-semibold text-slate-950">Member dashboard</p></div>
              <Button className="!text-white hover:!text-white" nativeButton={false} render={<a href="/shop" />}><ShoppingBag />Shop now</Button>
            </div>
          </header>

          <TabsList className="mx-5 mt-5 grid h-auto w-[calc(100%-2.5rem)] grid-cols-5 bg-white p-1 shadow-sm ring-1 ring-slate-200 lg:hidden">
            {tabs.map((tab) => <TabsTrigger className="h-9 px-1 text-xs" key={tab.id} value={tab.id}><tab.icon className="hidden sm:block" />{tab.label}</TabsTrigger>)}
          </TabsList>

          <div className="mx-auto max-w-6xl p-5 sm:p-8">
            {message && <Alert className="mb-6 border-emerald-200 bg-emerald-50"><AlertDescription className="!text-emerald-700">{message}</AlertDescription></Alert>}
            {error && <Alert className="mb-6 border-red-200 bg-red-50" variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

            <TabsContent value="overview">
              <SectionHeading eyebrow="Overview" title={`Welcome back, ${displayName}.`} body="Manage your account essentials and keep everything ready for your next GutGuard order." />
              <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Card className="shadow-sm"><CardHeader><CardTitle>Profile completion</CardTitle><CardDescription>Keep your account checkout-ready.</CardDescription><CardAction><CircleUserRound className="size-5 text-[#4F63FF]" /></CardAction></CardHeader><CardContent><p className="mb-3 text-3xl font-semibold text-slate-950">{profileCompletion}%</p><Progress className="[&_[data-slot=progress-indicator]]:bg-[#1010C9]" value={profileCompletion} /></CardContent><CardFooter className="mt-auto"><Button onClick={() => setActiveTab("profile")} variant="outline">Update profile<ArrowRight /></Button></CardFooter></Card>
                <Card className="shadow-sm"><CardHeader><CardTitle>Delivery addresses</CardTitle><CardDescription>Save your shipping and billing details.</CardDescription><CardAction><MapPin className="size-5 text-[#4F63FF]" /></CardAction></CardHeader><CardContent><p className="text-sm leading-6 text-slate-500">Make future checkout faster by completing your address information today.</p></CardContent><CardFooter><Button onClick={() => setActiveTab("addresses")} variant="outline">Manage addresses<ArrowRight /></Button></CardFooter></Card>
                <Card className="shadow-sm"><CardHeader><CardTitle>Referral rewards</CardTitle><CardDescription>Your sharing rewards hub.</CardDescription><CardAction><Gift className="size-5 text-[#4F63FF]" /></CardAction></CardHeader><CardContent><Badge variant="secondary">Coming soon</Badge><p className="mt-3 text-sm leading-6 text-slate-500">Your personal referral link and rewards will appear here.</p></CardContent></Card>
                <Card className="border-0 bg-[#1010C9] text-white shadow-sm md:col-span-2 xl:col-span-3"><CardHeader><CardTitle className="text-white">GutGuard member benefits</CardTitle><CardDescription className="!text-white/70">A smoother way to manage your wellness essentials.</CardDescription><CardAction><Sparkles className="size-5 text-white" /></CardAction></CardHeader><CardContent className="grid gap-3 text-sm text-white/85 sm:grid-cols-3"><span>Member pricing</span><span>Faster future checkout</span><span>Early product updates</span></CardContent><CardFooter className="border-white/15 bg-white/5"><Button className="bg-white !text-[#1010C9] hover:bg-white/90 hover:!text-[#1010C9]" nativeButton={false} render={<a href="/shop" />}>Visit the shop<ArrowRight /></Button></CardFooter></Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <OrdersPanel email={profile.email} orders={initialOrders} />
            </TabsContent>

            <TabsContent value="profile">
              <SectionHeading eyebrow="Profile" title="Personal information" body="Update your contact information. Your login email remains read-only." />
              <Card className="mt-7 shadow-sm"><CardContent><form className="grid gap-5 sm:grid-cols-2" onSubmit={saveProfile}>
                <Label className="block text-slate-600">First name<Input className={inputClass} onChange={(event) => setProfile({ ...profile, first_name: event.target.value })} required value={profile.first_name} /></Label>
                <Label className="block text-slate-600">Last name<Input className={inputClass} onChange={(event) => setProfile({ ...profile, last_name: event.target.value })} required value={profile.last_name} /></Label>
                <Label className="block text-slate-600">Phone number<Input className={inputClass} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} type="tel" value={profile.phone} /></Label>
                <Label className="block text-slate-600">Email address<Input className={`${inputClass} bg-slate-100`} disabled value={profile.email} /></Label>
                <div className="sm:col-span-2"><Button disabled={saving} type="submit">{saving ? "Saving..." : "Save changes"}</Button></div>
              </form></CardContent></Card>
            </TabsContent>

            <TabsContent value="addresses">
              <SectionHeading eyebrow="Addresses" title="Shipping and billing" body="Save one shipping address and one billing address for your account." />
              <form className="mt-7 space-y-4" onSubmit={saveAddresses}>
                <Card className="shadow-sm"><CardHeader><CardTitle>Shipping address</CardTitle><CardDescription>Where should your GutGuard orders be delivered?</CardDescription></CardHeader><CardContent><AddressFields address={shipping} onChange={(field, value) => changeAddress("shipping", field, value)} /></CardContent></Card>
                <Card className="shadow-sm"><CardHeader><CardTitle>Billing address</CardTitle><CardDescription>Use your shipping address or enter billing details.</CardDescription><CardAction><Label className="flex items-center gap-2 text-xs text-slate-600"><Checkbox checked={sameAsShipping} onCheckedChange={(checked: boolean | "indeterminate") => { const active = checked === true; setSameAsShipping(active); if (active) setBilling({ ...shipping, id: billing.id, address_type: "billing" }); }} />Same as shipping</Label></CardAction></CardHeader><CardContent><AddressFields address={billing} onChange={(field, value) => changeAddress("billing", field, value)} /></CardContent></Card>
                <Button disabled={saving} type="submit">{saving ? "Saving..." : "Save addresses"}</Button>
              </form>
            </TabsContent>

            <TabsContent value="security">
              <SectionHeading eyebrow="Security" title="Password and access" body="Update your password regularly and sign out when using a shared device." />
              <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_320px]">
                <Card className="shadow-sm"><CardHeader><CardTitle>Change password</CardTitle><CardDescription>Use at least six characters for your new password.</CardDescription></CardHeader><CardContent><form className="grid gap-5 sm:grid-cols-2" onSubmit={updatePassword}>
                  <Label className="block text-slate-600">New password<Input className={inputClass} minLength={6} onChange={(event) => setNewPassword(event.target.value)} required type="password" value={newPassword} /></Label>
                  <Label className="block text-slate-600">Confirm password<Input className={inputClass} minLength={6} onChange={(event) => setConfirmPassword(event.target.value)} required type="password" value={confirmPassword} /></Label>
                  <div className="sm:col-span-2"><Button disabled={saving} type="submit">{saving ? "Saving..." : "Update password"}</Button></div>
                </form></CardContent></Card>
                <Card className="shadow-sm"><CardHeader><CardTitle>Current session</CardTitle><CardDescription>{profile.email}</CardDescription></CardHeader><CardContent><div className="flex items-center gap-2 text-sm text-emerald-700"><KeyRound className="size-4" />Active session</div></CardContent><CardFooter className="mt-auto"><Button onClick={logOut} variant="outline"><LogOut />Log out</Button></CardFooter></Card>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </SidebarProvider>
  );
}
