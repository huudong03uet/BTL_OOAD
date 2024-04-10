import React, { useState } from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableUser from "@/components/Verification/TableUser";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FormRegisterSeller } from "@/types/form_register_seller";


export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

interface TableUserProps {
  packageData: FormRegisterSeller[];
}

const VerificationSellerPage = () => {  

  const packageDatafake: FormRegisterSeller[] = [
    {
        user_id: "HA8HA",
        name: "Free package",
        time_create: `Jan 13,2023`,
        email: 'abc@gmail.com',
        status: 'pending',
  
    },
    {
        user_id: "HA8HA",
        name: "Free package",
        time_create: `Jan 13,2023`,
        email: 'abc@gmail.com',
        status: 'pending',
  
    },
    {
        user_id: "HA8HA",
        name: "Free package",
        time_create: `Jan 13,2023`,
        email: 'abc@gmail.com',
        status: 'pending',
  
    },
    {
        user_id: "HA8HA",
        name: "Free package",
        time_create: `Jan 13,2023`,
        email: 'abc@gmail.com',
        status: 'pending',
  
    },
  ];
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Verification Seller"></Breadcrumb>
      <TableUser packageData={packageDatafake}></TableUser>
    </DefaultLayout>

  );
};

export default VerificationSellerPage;
