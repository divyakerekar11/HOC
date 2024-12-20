import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import DefaultLayout from "@/layout/DefaultLayout";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "High Oaks Media",
  description:
    "Enhance your customer relationships with our advanced Oaks Media CRM solutions. Streamline your sales, marketing, and customer service processes for improved efficiency.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const token = Cookies.get("accessToken");
  // console.log("accessToken", token);
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors expand={true} />
      </body>
    </html>
  );
}
