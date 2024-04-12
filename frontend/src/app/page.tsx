'use client'

import AppHeader from "@/components/AppHeader";
import HomePage from "./(home)/page";
import styles from "./page.module.css";
import Link from 'next/link';
import AppFooter from "@/components/AppFooter";
import AppBreadCrumb from "@/components/AppBreadCrumb";
import AppNav from "@/components/AppNav";
import ChatSupport from "@/components/chat/chat_support";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { makeStyles } from "@mui/styles";
import zIndex from "@mui/material/styles/zIndex";
import ChatComponent from "@/components/chat/chat_component";


export default function Home() {



  return (
    <>
      <AppHeader />
      {/* <Link href="/item_detail">detail/home.html</Link> */}
      <AppNav />
      <AppBreadCrumb />

      <HomePage />

  

    


      <AppFooter />
    </>
  );
}
