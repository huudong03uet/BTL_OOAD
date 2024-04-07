import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableProduct from "@/components/Verification/TableProduct";
import { FormRegisterProduct } from "@/types/form_register_product";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

interface TableUserProps {
  packageData: FormRegisterProduct[];
}

const VerificationProductPage = () => {

  const packageDatafake: FormRegisterProduct[] = [
    {
      product_id: 78431,
      title: "Free package",
      time_create: `Jan 13,2023`,
      status: 'pending',
      seller: {name: "Linh", user_id:32834},
    },
    {
      product_id: 7374,
      title: "Free package",
      time_create: `Jan 13,2023`,
      status: 'pending',
      seller: {name: "Linh", user_id:32834},

    },
    {
      product_id: 345645,
      title: "Free package",
      time_create: `Jan 13,2023`,
      status: 'pending',
      seller: {name: "Linh", user_id:32834},

    },
    {
      product_id: 234325,
      title: "Free package",
      time_create: `Jan 13,2023`,
      status: 'pending',
      seller: {name: "Linh", user_id:32834},

    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Verification Product"></Breadcrumb>
      <TableProduct packageData={packageDatafake}></TableProduct>
    </DefaultLayout>
  );
};

export default VerificationProductPage;