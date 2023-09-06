"use client";
import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Sansyzbay Yersultan",
  description: "My Blog",
};

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
        <LanguageProvider>
          <ThemeProvider attribute="class">
            <Layout>{children}</Layout>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
