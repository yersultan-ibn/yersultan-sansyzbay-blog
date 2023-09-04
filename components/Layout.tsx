"use client";
import React, { ReactNode } from "react";
import Header from "./Header";
import { Footer } from "@/components";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
