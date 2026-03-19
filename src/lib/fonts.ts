import { DM_Sans, Epilogue, Work_Sans } from "next/font/google";

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});
