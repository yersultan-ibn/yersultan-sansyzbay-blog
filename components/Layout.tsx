import React, { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
