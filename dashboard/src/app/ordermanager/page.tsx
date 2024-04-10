import React, { useState } from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOrder from "@/components/OrderManagement/TableOrder";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Order } from "@/types/order";


export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

interface TableUserProps {
  packageData: Order[];
}

const UserManager = () => {  

  const packageDatafake: Order[] = [
    {
        order_id: 123,
        items: "10",
        price: "$10000",
        paid: "Yes",
        seller: "123, ABC",
        date: `Jan 13,2023`,
        product_name: "Product Name",
        status: "Pending",
    },
    {
        order_id: 123,
        items: "10",
        price: "$10000",
        paid: "Yes",
        seller: "123, ABC",
        date: `Jan 13,2023`,
        product_name: "Product Name",
        status: "Pending",
    },
    {
        order_id: 123,
        items: "10",
        price: "$10000",
        paid: "Yes",
        seller: "123, ABC",
        date: `Jan 13,2023`,
        product_name: "Product Name",
        status: "Pending",
    },
    {
        order_id: 123,
        items: "10",
        price: "$10000",
        paid: "Yes",
        seller: "123, ABC",
        date: `Jan 13,2023`,
        product_name: "Product Name",
        status: "Pending",
    },
  ];
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order Manager"></Breadcrumb>
      <TableOrder packageData={packageDatafake}></TableOrder>
    </DefaultLayout>

  );
};

export default UserManager;
