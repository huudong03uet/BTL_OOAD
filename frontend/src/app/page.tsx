'use client'

import AppHeader from "@/components/AppHeader";
import HomePage from "./(home)/page";
import AppFooter from "@/components/AppFooter";
// import AppBreadCrumb from "@/components/AppBreadCrumb";
import AppNav from "@/components/AppNav";
import { UserContext } from "@/services/context/UserContext";
import { useContext, useEffect } from "react";

export default function Home() {
  let {setUser} = useContext(UserContext);


  useEffect(() => {

  }, []);


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
