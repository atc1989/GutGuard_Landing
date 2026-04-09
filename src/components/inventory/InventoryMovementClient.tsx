"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/landing/Navbar";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Modal from "@/components/ui/Modal";

const INITIAL_BOTTLE_STOCK = 24435;
const INITIAL_BLISTER_STOCK = 20492;
const STOCK_ADDITIONS_STORAGE_KEY = "gutguard-inventory-stock-additions";

type ReleaseMovement = {
  blisterOut: number;
  bottleOut: number;
  date: string;
};

type StockAddition = {
  blisterIn: number;
  bottleIn: number;
  date: string;
  id: string;
  note: string;
};

type DailyInventoryRow = {
  blisterClosing: number;
  blisterIn: number;
  blisterOpening: number;
  blisterOut: number;
  bottleClosing: number;
  bottleIn: number;
  bottleOpening: number;
  bottleOut: number;
  date: string;
};

// Replace this with your released count source once Supabase or an API is connected.
const releaseMovements: ReleaseMovement[] = [];

function formatInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(parseDate(date));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function getDefaultRange() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);

  return {
    endDate: formatInputDate(today),
    startDate: formatInputDate(start),
  };
}

function getMovementTotalsByDate<T extends { date: string }>(
  items: T[],
  selector: (item: T) => { blister: number; bottle: number },
) {
  return items.reduce<Record<string, { blister: number; bottle: number }>>((acc, item) => {
    const current = acc[item.date] ?? { blister: 0, bottle: 0 };
    const values = selector(item);

    acc[item.date] = {
      blister: current.blister + values.blister,
      bottle: current.bottle + values.bottle,
    };

    return acc;
  }, {});
}

function getBaselineStock(startDate: string, stockAdditions: StockAddition[]) {
  const stockInsBeforeRange = stockAdditions.filter((item) => item.date < startDate);
  const releasesBeforeRange = releaseMovements.filter((item) => item.date < startDate);

  const addedBottle = stockInsBeforeRange.reduce((sum, item) => sum + item.bottleIn, 0);
  const addedBlister = stockInsBeforeRange.reduce((sum, item) => sum + item.blisterIn, 0);
  const releasedBottle = releasesBeforeRange.reduce((sum, item) => sum + item.bottleOut, 0);
  const releasedBlister = releasesBeforeRange.reduce((sum, item) => sum + item.blisterOut, 0);

  return {
    blister: INITIAL_BLISTER_STOCK + addedBlister - releasedBlister,
    bottle: INITIAL_BOTTLE_STOCK + addedBottle - releasedBottle,
  };
}

function buildInventoryRows(startDate: string, endDate: string, stockAdditions: StockAddition[]) {
  if (!startDate || !endDate || startDate > endDate) {
    return [];
  }

  const stockInByDate = getMovementTotalsByDate(stockAdditions, (item) => ({
    blister: item.blisterIn,
    bottle: item.bottleIn,
  }));
  const stockOutByDate = getMovementTotalsByDate(releaseMovements, (item) => ({
    blister: item.blisterOut,
    bottle: item.bottleOut,
  }));
  const baseline = getBaselineStock(startDate, stockAdditions);

  const rows: DailyInventoryRow[] = [];
  let bottleOpening = baseline.bottle;
  let blisterOpening = baseline.blister;

  for (let cursor = parseDate(startDate); cursor <= parseDate(endDate); cursor = addDays(cursor, 1)) {
    const date = formatInputDate(cursor);
    const stockIn = stockInByDate[date] ?? { blister: 0, bottle: 0 };
    const stockOut = stockOutByDate[date] ?? { blister: 0, bottle: 0 };
    const bottleClosing = bottleOpening + stockIn.bottle - stockOut.bottle;
    const blisterClosing = blisterOpening + stockIn.blister - stockOut.blister;

    rows.push({
      blisterClosing,
      blisterIn: stockIn.blister,
      blisterOpening,
      blisterOut: stockOut.blister,
      bottleClosing,
      bottleIn: stockIn.bottle,
      bottleOpening,
      bottleOut: stockOut.bottle,
      date,
    });

    bottleOpening = bottleClosing;
    blisterOpening = blisterClosing;
  }

  return rows;
}

export default function InventoryMovementClient() {
  const defaultRange = useMemo(() => getDefaultRange(), []);
  const [startDate, setStartDate] = useState(defaultRange.startDate);
  const [endDate, setEndDate] = useState(defaultRange.endDate);
  const [stockAdditions, setStockAdditions] = useState<StockAddition[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryDate, setEntryDate] = useState(defaultRange.endDate);
  const [bottleIn, setBottleIn] = useState("0");
  const [blisterIn, setBlisterIn] = useState("0");
  const [note, setNote] = useState("");
  const [hasLoadedStockAdditions, setHasLoadedStockAdditions] = useState(false);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(STOCK_ADDITIONS_STORAGE_KEY);

    if (!storedValue) {
      setHasLoadedStockAdditions(true);
      return;
    }

    try {
      const parsedValue = JSON.parse(storedValue) as StockAddition[];
      setStockAdditions(parsedValue);
    } catch {
      window.localStorage.removeItem(STOCK_ADDITIONS_STORAGE_KEY);
    } finally {
      setHasLoadedStockAdditions(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStockAdditions) {
      return;
    }

    window.localStorage.setItem(STOCK_ADDITIONS_STORAGE_KEY, JSON.stringify(stockAdditions));
  }, [hasLoadedStockAdditions, stockAdditions]);

  const rows = useMemo(
    () => buildInventoryRows(startDate, endDate, stockAdditions),
    [endDate, startDate, stockAdditions],
  );

  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, row) => ({
          blisterIn: acc.blisterIn + row.blisterIn,
          blisterOut: acc.blisterOut + row.blisterOut,
          bottleIn: acc.bottleIn + row.bottleIn,
          bottleOut: acc.bottleOut + row.bottleOut,
        }),
        { blisterIn: 0, blisterOut: 0, bottleIn: 0, bottleOut: 0 },
      ),
    [rows],
  );

  const latestRow = rows.at(-1);

  const resetModalFields = () => {
    setEntryDate(endDate);
    setBottleIn("0");
    setBlisterIn("0");
    setNote("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetModalFields();
  };

  const handleAddStock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bottleValue = Number(bottleIn);
    const blisterValue = Number(blisterIn);

    if (!entryDate || Number.isNaN(bottleValue) || Number.isNaN(blisterValue)) {
      return;
    }

    setStockAdditions((current) => [
      ...current,
      {
        blisterIn: blisterValue,
        bottleIn: bottleValue,
        date: entryDate,
        id: `${entryDate}-${Date.now()}`,
        note: note.trim(),
      },
    ]);

    closeModal();
  };

  return (
    <>
      <Navbar />
      <main className="pb-16 pt-8 sm:pb-20 sm:pt-10">
        <Container size="xl">
          <section className="premium-card overflow-hidden rounded-[34px] border border-white/75 bg-white/90">
            <div className="border-b border-slate-200/80 bg-[linear-gradient(135deg,#071B54_0%,#16358C_100%)] px-6 py-8 text-white sm:px-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">
                Inventory Control
              </p>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    Inventory Movement
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
                    Daily movement view for bottles and blisters. Opening stock rolls forward day by day,
                    `In` adds new stocks, and `Out` deducts released quantities for the selected date range.
                  </p>
                </div>
                <Button
                  className="w-full bg-white text-[var(--color-primary)] hover:bg-slate-100 lg:w-auto"
                  onClick={() => {
                    setEntryDate(endDate);
                    setIsModalOpen(true);
                  }}
                  size="lg"
                >
                  Add Stocks
                </Button>
              </div>
            </div>

            <div className="space-y-8 px-6 py-7 sm:px-8 sm:py-8">
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="rounded-[24px] border border-slate-200 bg-slate-50/85 p-4">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Start Date
                    </span>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[var(--brand)]"
                      max={endDate}
                      onChange={(event) => setStartDate(event.target.value)}
                      type="date"
                      value={startDate}
                    />
                  </label>
                  <label className="rounded-[24px] border border-slate-200 bg-slate-50/85 p-4">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      End Date
                    </span>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[var(--brand)]"
                      min={startDate}
                      onChange={(event) => setEndDate(event.target.value)}
                      type="date"
                      value={endDate}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Bottle Stock</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950">{formatNumber(latestRow?.bottleClosing ?? INITIAL_BOTTLE_STOCK)}</p>
                    <p className="mt-1 text-sm text-slate-500">Current closing in range</p>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Blister Stock</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950">{formatNumber(latestRow?.blisterClosing ?? INITIAL_BLISTER_STOCK)}</p>
                    <p className="mt-1 text-sm text-slate-500">Current closing in range</p>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Bottle Out</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950">{formatNumber(totals.bottleOut)}</p>
                    <p className="mt-1 text-sm text-slate-500">Total released count</p>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Blister Out</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950">{formatNumber(totals.blisterOut)}</p>
                    <p className="mt-1 text-sm text-slate-500">Total released blpk count</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-950">Movement Table</h2>
                    <p className="text-sm text-slate-500">
                      Initial stocks: {formatNumber(INITIAL_BOTTLE_STOCK)} bottles and {formatNumber(INITIAL_BLISTER_STOCK)} blisters.
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">
                    Stock-in entries are saved in your browser for now.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-[22px] border border-slate-200 bg-white">
                  <table className="min-w-[1020px] border-collapse text-sm">
                    <thead>
                      <tr className="bg-[linear-gradient(135deg,#0D3C92_0%,#2A63C4_100%)] text-white">
                        <th className="border-b border-white/15 px-4 py-3 text-left font-semibold">Date</th>
                        <th className="border-b border-white/15 px-4 py-3 text-center font-semibold" colSpan={4}>
                          Bottles
                        </th>
                        <th className="border-b border-white/15 px-4 py-3 text-center font-semibold" colSpan={4}>
                          Blister
                        </th>
                      </tr>
                      <tr className="bg-slate-100 text-slate-700">
                        <th className="border-b border-slate-200 px-4 py-3 text-left font-medium"> </th>
                        <th className="border-b border-slate-200 px-4 py-3 text-right font-medium">Opening</th>
                        <th className="border-b border-slate-200 px-4 py-3 text-right font-medium">In</th>
                        <th className="border-b border-slate-200 px-4 py-3 text-right font-medium">Out</th>
                        <th className="border-b border-slate-200 px-4 py-3 text-right font-medium">Closing</th>
                        <th className="border-b border-slate-200 px-4 py-3 text-right font-medium">Opening</th>
                        <th className="border-b border-slate-200 px-4 py-3 text-right font-medium">In</th>
                        <th className="border-b border-slate-200 px-4 py-3 text-right font-medium">Out</th>
                        <th className="border-b border-slate-200 px-4 py-3 text-right font-medium">Closing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td className="px-4 py-8 text-center text-slate-500" colSpan={9}>
                            Pick a valid date range to see the inventory movement.
                          </td>
                        </tr>
                      ) : (
                        rows.map((row, index) => (
                          <tr
                            className={index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                            key={row.date}
                          >
                            <td className="border-b border-slate-100 px-4 py-3 font-medium text-slate-700">
                              {formatDisplayDate(row.date)}
                            </td>
                            <td className="border-b border-slate-100 px-4 py-3 text-right text-slate-700">
                              {formatNumber(row.bottleOpening)}
                            </td>
                            <td className="border-b border-slate-100 px-4 py-3 text-right text-emerald-700">
                              {formatNumber(row.bottleIn)}
                            </td>
                            <td className="border-b border-slate-100 px-4 py-3 text-right text-rose-700">
                              {formatNumber(row.bottleOut)}
                            </td>
                            <td className="border-b border-slate-100 px-4 py-3 text-right font-semibold text-slate-950">
                              {formatNumber(row.bottleClosing)}
                            </td>
                            <td className="border-b border-slate-100 px-4 py-3 text-right text-slate-700">
                              {formatNumber(row.blisterOpening)}
                            </td>
                            <td className="border-b border-slate-100 px-4 py-3 text-right text-emerald-700">
                              {formatNumber(row.blisterIn)}
                            </td>
                            <td className="border-b border-slate-100 px-4 py-3 text-right text-rose-700">
                              {formatNumber(row.blisterOut)}
                            </td>
                            <td className="border-b border-slate-100 px-4 py-3 text-right font-semibold text-slate-950">
                              {formatNumber(row.blisterClosing)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">Stock In History</h2>
                    <p className="text-sm text-slate-500">Every stock-in entry you add from the modal appears here.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {stockAdditions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                      No stock-in entries yet. Use the <span className="font-semibold text-slate-700">Add Stocks</span> button to record inventory added to bottles or blisters.
                    </div>
                  ) : (
                    [...stockAdditions]
                      .sort((left, right) => right.date.localeCompare(left.date))
                      .map((item) => (
                        <div
                          className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/75 px-4 py-4 sm:grid-cols-[1fr_auto_auto]"
                          key={item.id}
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{formatDisplayDate(item.date)}</p>
                            <p className="text-sm text-slate-500">{item.note || "Manual stock-in entry"}</p>
                          </div>
                          <p className="text-sm font-medium text-emerald-700">
                            Bottles +{formatNumber(item.bottleIn)}
                          </p>
                          <p className="text-sm font-medium text-emerald-700">
                            Blisters +{formatNumber(item.blisterIn)}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Stock In">
        <form className="space-y-5" onSubmit={handleAddStock}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Date</span>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)]"
              max={formatInputDate(new Date("2099-12-31"))}
              onChange={(event) => setEntryDate(event.target.value)}
              required
              type="date"
              value={entryDate}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Bottle In</span>
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)]"
                min="0"
                onChange={(event) => setBottleIn(event.target.value)}
                required
                type="number"
                value={bottleIn}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Blister In</span>
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)]"
                min="0"
                onChange={(event) => setBlisterIn(event.target.value)}
                required
                type="number"
                value={blisterIn}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Note</span>
            <textarea
              className="min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)]"
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional note for this stock-in entry"
              value={note}
            />
          </label>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button className="justify-center" onClick={closeModal} type="button" variant="ghost">
              Cancel
            </Button>
            <Button className="justify-center" type="submit">
              Save Stock Entry
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
