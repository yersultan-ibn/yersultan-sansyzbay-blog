"use client";
import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Sansyzbay Yersultan",
//   description: "My Blog",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/app/favicon.ico" sizes="any" />;
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
