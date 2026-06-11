import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { verifyAdmin } from "@/actions/auth";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WiCare NeurOptimal® Center | Kigali, Rwanda",
    template: "%s | WiCare NeurOptimal® Center",
  },
  description:
    "Rwanda's first NeurOptimal® neurofeedback center. Optimizing mind, enhancing performance, and elevating wellbeing through science-based, non-invasive brain training.",
  keywords: [
    "NeurOptimal",
    "neurofeedback",
    "Kigali",
    "Rwanda",
    "brain training",
    "mental wellness",
    "stress management",
    "cognitive performance",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await verifyAdmin();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Navbar isAdmin={isAdmin} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
