import type { Metadata } from "next";

import { dmSans, epilogue, workSans } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "GutGuard | Modern Gut Health Landing Page",
  description: "Science-led digestive wellness landing page for GutGuard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${epilogue.variable} ${workSans.variable} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
