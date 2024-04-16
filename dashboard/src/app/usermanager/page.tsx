import React, { useState } from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableUser from "@/components/UsersManagement/TableUser";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { User } from "@/types/user";


export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

interface TableUserProps {
  packageData: User[];
}

const UserManager = () => {  

  const packageDatafake: User[] = [
    {
        id: 123,
        user_name: "Free package",
        email: "abc@gmail.com",
        phone: "0123456789",
        createdAt: `Jan 13,2023`,

    },
    {
      id: 123,
        user_name: "Free package",
        email: "abc@gmail.com",
        phone: "0123456789",
        createdAt: `Jan 13,2023`,
    },
    {
      id: 123,
        user_name: "Free package",
        email: "abc@gmail.com",
        phone: "0123456789",
        createdAt: `Jan 13,2023`,
  
    },
    {
      id: 123,
        user_name: "Free package",
        email: "abc@gmail.com",
        phone: "0123456789",
        createdAt: `Jan 13,2023`,
 
    },
  ];
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Verification Seller"></Breadcrumb>
      <TableUser packageData={packageDatafake}></TableUser>
    </DefaultLayout>

  );
};

export default UserManager;
