'use client'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableUser from "@/components/UsersManagement/TableUser";
import { user_manager } from "@/service/account";
import { User } from "@/types/user";
import { Metadata } from "next";
import { useEffect, useState } from "react";


// export const metadata: Metadata = {
//   title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

interface TableUserProps {
  packageData: User[];
}

const UserManager = () => {  
  const [packageDatafake, setPackageDatafake] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await user_manager();
        if (Array.isArray(data)) {
          setPackageDatafake(data);
        } else {
          setPackageDatafake([])
        }
      } catch (error) {
        console.error('Error fetching upcoming online auctions:', error);
      }
    };

    fetchData()
  }, [])


  // const packageDatafake: User[] = [
  //   {
  //       user_id: 123,
  //       user_name: "Free package",
  //       email: "abc@gmail.com",
  //       phone_number: "0123456789",
  //       created_at: `Jan 13,2023`,

  //   },
  //   {
  //       user_id: 123,
  //       user_name: "Free package",
  //       email: "abc@gmail.com",
  //       phone_number: "0123456789",
  //       created_at: `Jan 13,2023`,
  //   },
  //   {
  //       user_id: 123,
  //       user_name: "Free package",
  //       email: "abc@gmail.com",
  //       phone_number: "0123456789",
  //       created_at: `Jan 13,2023`,
  
  //   },
  //   {
  //       user_id: 123,
  //       user_name: "Free package",
  //       email: "abc@gmail.com",
  //       phone_number: "0123456789",
  //       created_at: `Jan 13,2023`,
 
  //   },
  // ];
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Information"></Breadcrumb>
      <TableUser packageData={packageDatafake}></TableUser>
    </DefaultLayout>

  );
};

export default UserManager;
