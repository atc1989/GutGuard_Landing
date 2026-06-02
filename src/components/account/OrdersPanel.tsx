"use client";

import { useState } from "react";
import { ArrowLeft, Eye, PackageCheck, ReceiptText, ShoppingBag } from "lucide-react";

import type { MemberAddress } from "@/components/account/MemberDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface MemberOrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface MemberOrder {
  id: string;
  order_number: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping_fee: number;
  processing_fee: number;
  total: number;
  payment_method: string;
  shipping_address: Partial<MemberAddress> | null;
  billing_address: Partial<MemberAddress> | null;
  created_at: string;
  order_items: MemberOrderItem[];
}

interface OrdersPanelProps {
  email: string;
  orders: MemberOrder[];
}

const PAGE_SIZE = 4;

const formatCurrency = (value: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value);
const formatDate = (value: string) => new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(value));
const formatPaymentMethod = (value: string) => value.split("_").map((word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`).join(" ");
const formatStatus = (status: MemberOrder["status"]) => `${status[0].toUpperCase()}${status.slice(1)}`;
const itemCount = (order: MemberOrder) => order.order_items.reduce((total, item) => total + item.quantity, 0);

function statusVariant(status: MemberOrder["status"]) {
  if (status === "delivered") return "secondary";
  if (status === "shipped") return "outline";
  if (status === "cancelled") return "destructive";
  return "default";
}

function AddressCard({ address, email, title }: { address: Partial<MemberAddress> | null; email?: string; title: string }) {
  const hasAddress = Boolean(address?.recipient_name || address?.street || address?.city);

  return (
    <Card className="shadow-sm">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-1 text-sm leading-6 text-slate-600">
        {hasAddress ? (
          <>
            <p className="font-medium text-slate-950">{address?.recipient_name}</p>
            <p>{address?.street}</p>
            <p>{address?.barangay}</p>
            <p>{address?.city}, {address?.province} {address?.postal_code}</p>
            <p>{address?.country}</p>
            {address?.phone && <p className="pt-2">{address.phone}</p>}
            {email && <p>{email}</p>}
          </>
        ) : (
          <p>No address was saved when this order was placed.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function OrdersPanel({ email, orders }: OrdersPanelProps) {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<MemberOrder | null>(null);
  const pageCount = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const visibleOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (selectedOrder) {
    return (
      <div>
        <Button className="mb-5" onClick={() => setSelectedOrder(null)} variant="ghost"><ArrowLeft />Back to orders</Button>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#4F63FF]">Order #{selectedOrder.order_number}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">Order details</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Placed on {formatDate(selectedOrder.created_at)}. Review your items, payment, and delivery information.</p>
          </div>
          <Badge variant={statusVariant(selectedOrder.status)}>{formatStatus(selectedOrder.status)}</Badge>
        </div>

        <Card className="mt-7 shadow-sm">
          <CardHeader><CardTitle>Order summary</CardTitle><CardDescription>Payment method: {formatPaymentMethod(selectedOrder.payment_method)}</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Product</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader>
              <TableBody>
                {selectedOrder.order_items.map((item) => <TableRow key={item.id}><TableCell>{item.product_name} <span className="text-slate-500">x {item.quantity}</span></TableCell><TableCell className="text-right">{formatCurrency(item.line_total)}</TableCell></TableRow>)}
                <TableRow><TableCell className="font-medium">Subtotal</TableCell><TableCell className="text-right font-medium">{formatCurrency(selectedOrder.subtotal)}</TableCell></TableRow>
                <TableRow><TableCell>Shipping</TableCell><TableCell className="text-right">{formatCurrency(selectedOrder.shipping_fee)}</TableCell></TableRow>
                <TableRow><TableCell>Processing fee</TableCell><TableCell className="text-right">{formatCurrency(selectedOrder.processing_fee)}</TableCell></TableRow>
                <TableRow><TableCell className="font-semibold">Total</TableCell><TableCell className="text-right font-semibold text-slate-950">{formatCurrency(selectedOrder.total)}</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <AddressCard address={selectedOrder.billing_address} email={email} title="Billing address" />
          <AddressCard address={selectedOrder.shipping_address} title="Shipping address" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#4F63FF]">Orders</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">Order history</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Track your purchases and open an order to review its delivery and payment details.</p>
      </div>

      {orders.length === 0 ? (
        <Card className="mt-7 shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-14 text-center">
            <ShoppingBag className="size-9 text-[#4F63FF]" />
            <h3 className="mt-4 text-lg font-semibold text-slate-950">No orders yet</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Your GutGuard purchases will appear here after you place your first order.</p>
            <Button className="mt-5 !text-white hover:!text-white" nativeButton={false} render={<a href="/shop" />}>Shop products</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mt-7 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ReceiptText className="size-5 text-[#4F63FF]" />Recent orders</CardTitle>
              <CardDescription>Your latest GutGuard purchases.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Total</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {visibleOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-[#1010C9]">#{order.order_number}</TableCell>
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell><Badge variant={statusVariant(order.status)}>{formatStatus(order.status)}</Badge></TableCell>
                      <TableCell>{formatCurrency(order.total)} <span className="text-slate-500">for {itemCount(order)} {itemCount(order) === 1 ? "item" : "items"}</span></TableCell>
                      <TableCell className="text-right"><Button onClick={() => setSelectedOrder(order)} size="sm"><Eye />View</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {pageCount > 1 && <Pagination className="mt-5 justify-end">
            <PaginationContent>
              <PaginationItem><PaginationPrevious aria-disabled={page === 1} className={page === 1 ? "pointer-events-none opacity-50" : ""} href="#" onClick={(event) => { event.preventDefault(); setPage((current) => Math.max(1, current - 1)); }} /></PaginationItem>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <PaginationItem key={number}><PaginationLink href="#" isActive={page === number} onClick={(event) => { event.preventDefault(); setPage(number); }}>{number}</PaginationLink></PaginationItem>)}
              <PaginationItem><PaginationNext aria-disabled={page === pageCount} className={page === pageCount ? "pointer-events-none opacity-50" : ""} href="#" onClick={(event) => { event.preventDefault(); setPage((current) => Math.min(pageCount, current + 1)); }} /></PaginationItem>
            </PaginationContent>
          </Pagination>}
        </>
      )}

      {orders.length > 0 && <div className="mt-5 flex items-center gap-2 text-xs text-slate-500"><PackageCheck className="size-4" />Order totals and delivery details are saved when each purchase is placed.</div>}
    </div>
  );
}
