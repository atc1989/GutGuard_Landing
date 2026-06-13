"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, LockKeyhole, ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/data/products";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface CheckoutAddress {
  first_name: string;
  last_name: string;
  phone: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

const SHIPPING_FEE = 45.6;
const PROCESSING_RATE = 0.07386;
const SECURITY_BANK_PAYMENT_URL = "https://pay.securitybankcollect.com/cs_v5vyr7ebA0hTa3yq";
const emptyAddress: CheckoutAddress = { first_name: "", last_name: "", phone: "", street: "", barangay: "", city: "", province: "", postal_code: "", country: "Philippines" };
const inputClass = "mt-2 h-11 bg-white px-3 shadow-none";
type PaymentMethod = "cash_on_delivery" | "security_bank";

function AddressFields({ address, onChange }: { address: CheckoutAddress; onChange: (field: keyof CheckoutAddress, value: string) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Label className="block text-slate-600">First name *<Input className={inputClass} onChange={(event) => onChange("first_name", event.target.value)} required value={address.first_name} /></Label>
      <Label className="block text-slate-600">Last name *<Input className={inputClass} onChange={(event) => onChange("last_name", event.target.value)} required value={address.last_name} /></Label>
      <Label className="block text-slate-600 sm:col-span-2">Country / Region *<Input className={`${inputClass} bg-slate-50`} readOnly value={address.country} /></Label>
      <Label className="block text-slate-600 sm:col-span-2">Street address *<Input className={inputClass} onChange={(event) => onChange("street", event.target.value)} placeholder="House number and street name" required value={address.street} /></Label>
      <Label className="block text-slate-600">Barangay *<Input className={inputClass} onChange={(event) => onChange("barangay", event.target.value)} required value={address.barangay} /></Label>
      <Label className="block text-slate-600">Town / City *<Input className={inputClass} onChange={(event) => onChange("city", event.target.value)} required value={address.city} /></Label>
      <Label className="block text-slate-600">Province *<Input className={inputClass} onChange={(event) => onChange("province", event.target.value)} required value={address.province} /></Label>
      <Label className="block text-slate-600">Postcode / ZIP *<Input className={inputClass} onChange={(event) => onChange("postal_code", event.target.value)} required value={address.postal_code} /></Label>
      <Label className="block text-slate-600 sm:col-span-2">Phone *<Input className={inputClass} onChange={(event) => onChange("phone", event.target.value)} required type="tel" value={address.phone} /></Label>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart, items, subtotal } = useCart();
  const [billing, setBilling] = useState(emptyAddress);
  const [shipping, setShipping] = useState(emptyAddress);
  const [differentShipping, setDifferentShipping] = useState(false);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash_on_delivery");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const processingFee = Math.round(subtotal * PROCESSING_RATE * 100) / 100;
  const total = subtotal + SHIPPING_FEE + processingFee;

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    void (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");

      const [{ data: profile }, { data: addresses }] = await Promise.all([
        supabase.from("profiles").select("first_name,last_name,phone").eq("id", user.id).maybeSingle(),
        supabase.from("addresses").select("address_type,recipient_name,phone,street,barangay,city,province,postal_code,country").eq("user_id", user.id),
      ]);
      const savedBilling = addresses?.find((address) => address.address_type === "billing");
      const savedShipping = addresses?.find((address) => address.address_type === "shipping");
      const names = (savedBilling?.recipient_name ?? `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()).split(" ");
      const nextBilling = { first_name: names[0] ?? "", last_name: names.slice(1).join(" "), phone: savedBilling?.phone ?? profile?.phone ?? "", street: savedBilling?.street ?? "", barangay: savedBilling?.barangay ?? "", city: savedBilling?.city ?? "", province: savedBilling?.province ?? "", postal_code: savedBilling?.postal_code ?? "", country: savedBilling?.country ?? "Philippines" };
      setBilling(nextBilling);
      setShipping(savedShipping ? { first_name: savedShipping.recipient_name.split(" ")[0] ?? "", last_name: savedShipping.recipient_name.split(" ").slice(1).join(" "), phone: savedShipping.phone, street: savedShipping.street, barangay: savedShipping.barangay, city: savedShipping.city, province: savedShipping.province, postal_code: savedShipping.postal_code, country: savedShipping.country } : nextBilling);
    })();
  }, []);

  function updateAddress(type: "billing" | "shipping", field: keyof CheckoutAddress, value: string) {
    if (type === "billing") return setBilling((current) => ({ ...current, [field]: value }));
    setShipping((current) => ({ ...current, [field]: value }));
  }

  async function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return setError("Supabase is not configured.");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push("/my-account");
    if (items.length === 0) return setError("Your cart is empty.");

    setError("");
    setSubmitting(true);
    const { error: orderError } = await supabase.rpc("place_cart_order", {
      cart_items: items.map(({ slug, quantity }) => ({ slug, quantity })),
      billing_details: { ...billing, email },
      shipping_details: differentShipping ? shipping : { ...billing, email },
      order_notes: notes,
      selected_payment_method: paymentMethod,
    });
    setSubmitting(false);
    if (orderError) return setError(orderError.message);
    clearCart();
    if (paymentMethod === "security_bank") {
      window.location.assign(SECURITY_BANK_PAYMENT_URL);
      return;
    }
    router.push("/my-account?tab=orders");
  }

  if (items.length === 0) {
    return (
      <><Navbar /><main className="min-h-[65vh] bg-[#F7F9FC] px-6 py-16"><Card className="mx-auto max-w-xl shadow-sm"><CardContent className="flex flex-col items-center py-14 text-center"><ShoppingBag className="size-10 text-slate-300" /><h1 className="mt-4 text-xl font-semibold text-slate-950">Your cart is empty</h1><p className="mt-2 text-sm text-slate-500">Add a product before starting checkout.</p><Button className="mt-5 !text-white hover:!text-white" nativeButton={false} render={<Link href="/shop" />}>Shop products</Button></CardContent></Card></main><Footer /></>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F7F9FC]">
        <form className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-12 lg:py-14" onSubmit={placeOrder}>
          <div className="mb-7 flex items-center gap-2 text-xs font-medium text-slate-500"><LockKeyhole className="size-4 text-[#4F63FF]" />Secure checkout</div>
          {error && <Alert className="mb-6 border-red-200 bg-red-50" variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="space-y-6">
              <Card className="shadow-sm"><CardHeader><CardTitle>Billing details</CardTitle><CardDescription>Enter the contact and billing information for this purchase.</CardDescription></CardHeader><CardContent><AddressFields address={billing} onChange={(field, value) => updateAddress("billing", field, value)} /><Label className="mt-4 block text-slate-600">Email address *<Input className={inputClass} onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></Label></CardContent></Card>
              <Card className="shadow-sm"><CardHeader><CardTitle className="flex items-center gap-2"><Checkbox checked={differentShipping} onCheckedChange={(checked: boolean | "indeterminate") => setDifferentShipping(checked === true)} />Ship to a different address?</CardTitle><CardDescription>Use a different delivery address or leave this unchecked to use billing details.</CardDescription></CardHeader>{differentShipping && <CardContent><AddressFields address={shipping} onChange={(field, value) => updateAddress("shipping", field, value)} /></CardContent>}</Card>
              <Card className="shadow-sm"><CardHeader><CardTitle>Order notes</CardTitle><CardDescription>Optional delivery instructions for your order.</CardDescription></CardHeader><CardContent><textarea className="min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-[#4F63FF] focus:ring-3 focus:ring-[#4F63FF]/20" onChange={(event) => setNotes(event.target.value)} placeholder="Notes about your order, e.g. special notes for delivery." value={notes} /></CardContent></Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-sm"><CardHeader><CardTitle>Your order</CardTitle></CardHeader><CardContent className="space-y-4">
                {items.map((item) => <div className="flex justify-between gap-4 text-sm" key={item.slug}><span className="text-slate-600">{item.name} <span className="text-slate-400">x {item.quantity}</span></span><span className="font-medium text-slate-950">{formatCurrency(item.price * item.quantity)}</span></div>)}
                <Separator />
                <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-sm text-slate-600"><span>Delivery fee</span><span>{formatCurrency(SHIPPING_FEE)}</span></div>
                <div className="flex justify-between text-sm text-slate-600"><span>Processing fee</span><span>{formatCurrency(processingFee)}</span></div>
                <Separator />
                <div className="flex justify-between text-base font-semibold text-slate-950"><span>Total</span><span>{formatCurrency(total)}</span></div>
              </CardContent></Card>

              <Card className="shadow-sm"><CardHeader><CardTitle>Payment method</CardTitle><CardDescription>Select how you would like to pay.</CardDescription></CardHeader><CardContent className="space-y-3">
                <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${paymentMethod === "security_bank" ? "border-[#4F63FF] bg-[#4F63FF]/5" : "border-slate-200 bg-white hover:border-slate-300"}`}><input checked={paymentMethod === "security_bank"} name="payment" onChange={() => setPaymentMethod("security_bank")} type="radio" value="security_bank" /><span><span className="flex items-center gap-2 text-sm font-medium text-slate-950"><CreditCard className="size-4" />Pay via Security Bank</span><span className="mt-1 block text-xs leading-5 text-slate-500">After placing your order, you will be redirected to Security Bank Collect to complete payment.</span></span></label>
                <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${paymentMethod === "cash_on_delivery" ? "border-[#4F63FF] bg-[#4F63FF]/5" : "border-slate-200 bg-white hover:border-slate-300"}`}><input checked={paymentMethod === "cash_on_delivery"} name="payment" onChange={() => setPaymentMethod("cash_on_delivery")} type="radio" value="cash_on_delivery" /><span><span className="text-sm font-medium text-slate-950">Cash on delivery</span><span className="mt-1 block text-xs leading-5 text-slate-500">Pay when your GutGuard order arrives.</span></span></label>
                <Button className="mt-2 h-11 w-full !text-white hover:!text-white" disabled={submitting} type="submit">{submitting ? "Placing order..." : "Place order"}</Button>
                <p className="text-center text-xs leading-5 text-slate-500">Your order will be saved securely to your GutGuard account.</p>
              </CardContent></Card>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
