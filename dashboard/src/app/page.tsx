'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as React from "react";

import {NextUIProvider} from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      </NextUIProvider>

    </>
  );
}
