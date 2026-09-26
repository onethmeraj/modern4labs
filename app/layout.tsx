import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers"; /* FIX 1: was SmoothScroll — that component never renders ReactLenis */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const editorial = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
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
    <html lang="en" className={`${inter.variable} ${editorial.variable} antialiased`}>
      <body className="bg-brand-dark font-sans text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}