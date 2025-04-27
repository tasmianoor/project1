import type { Metadata } from "next";
import { Inter, Outfit, Hepta_Slab } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";
import HeroBanner from "@/components/HeroBanner";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });
const heptaSlab = Hepta_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finding Home",
  description: "Finding Home - Your trusted partner in real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${outfit.className} ${heptaSlab.className}`}>
        <AuthProvider>
          <MainNav />
          <HeroBanner />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
