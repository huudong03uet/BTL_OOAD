'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AnalyticChart from "@/components/Analytics/Analytics";
import * as React from "react";

import {NextUIProvider} from "@nextui-org/react";
import RouterProvider from 'next/router';
export default function Home() {
  return (
    <>
      {/* <NextUIProvider>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      </NextUIProvider> */}
      <NextUIProvider>
        <DefaultLayout>
          <AnalyticChart></AnalyticChart>
        </DefaultLayout>
      </NextUIProvider>
    </>
  );
}
