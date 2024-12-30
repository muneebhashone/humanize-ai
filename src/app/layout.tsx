import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Toaster } from "@/components/ui/sonner";
import ClientLayout from "@/components/ClientLayout";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Humanize AI",
  description: "AI-powered customer service platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
        
            <ClientLayout>{children}</ClientLayout>
       
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
