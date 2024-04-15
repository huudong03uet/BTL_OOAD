'use client'

import AppHeader from "@/components/AppHeader";
import HomePage from "./(home)/page";
import AppFooter from "@/components/AppFooter";
// import AppBreadCrumb from "@/components/AppBreadCrumb";
import AppNav from "@/components/AppNav";

export default function Home() {


  return (
    <>
      <AppHeader />
      {/* <Link href="/item_detail">detail/home.html</Link> */}
      <AppNav />
      {/* <AppBreadCrumb /> */}

      <HomePage />
      <AppFooter />
    </>
  );
}
