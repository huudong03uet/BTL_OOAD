import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableUser from "@/components/ViewItem/TableViewUser";
import { User } from "@/types/user";


export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

interface TableUserProps {
  packageData: User[];
}

const ViewUserPage = () => {

  const packageDatafake: User[] = [
    {
      user_id: 1,
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe",
      coin: 100,
      phone: "123-456-7890",
      location_id: 1,
    },
    {
      user_id: 1,
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe",
      coin: 100,
      phone: "123-456-7890",
      location_id: 1,
    },
    {
      user_id: 1,
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe",
      coin: 100,
      phone: "123-456-7890",
      location_id: 1,
    },
    {
      user_id: 1,
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe",
      coin: 100,
      phone: "123-456-7890",
      location_id: 1,
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="View User"></Breadcrumb>
      <TableUser packageData={packageDatafake}></TableUser>
    </DefaultLayout>
  );
};

export default ViewUserPage;
