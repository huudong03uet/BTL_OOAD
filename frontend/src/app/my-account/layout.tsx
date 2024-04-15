"use client";

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import AppNav from "@/components/AppNav";
import Container from "react-bootstrap/Container";
import SideBarUser from "@/components/my-account/sideBarUser";

const inter = Inter({ subsets: ["latin"] });

export default function MyAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={inter.className}>
      {/* <div>
        <button onClick={openNewPage}>
          Detail page
        </button>
      </div> */}

      <AppHeader />
      <AppNav />
      <div className="row  mx-0">
        <div className="col-2">
          <SideBarUser />
        </div>
        <div className="col-10">{children}</div>
      </div>
      <AppFooter />
    </section>
  );
}
