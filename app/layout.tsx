import type { Metadata } from "next";
import { Inter, Inter_Tight, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

/* Body text */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Headings — the tight grotesk from the "Idea → impact" reference */
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const editorial = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MODERN4LABS | Digital Agency",
  description: "Transforming Brands. Driving Real Leads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${editorial.variable} antialiased`}
    >
      <body className="bg-brand-dark font-sans text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}