import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableUser from "@/components/UsersManagement/TableUser";
import { User } from "@/types/user";
import { Metadata } from "next";


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
        user_id: 123,
        user_name: "Free package",
        email: "abc@gmail.com",
        phone_number: "0123456789",
        created_at: `Jan 13,2023`,

    },
    {
        user_id: 123,
        user_name: "Free package",
        email: "abc@gmail.com",
        phone_number: "0123456789",
        created_at: `Jan 13,2023`,
    },
    {
        user_id: 123,
        user_name: "Free package",
        email: "abc@gmail.com",
        phone_number: "0123456789",
        created_at: `Jan 13,2023`,
  
    },
    {
        user_id: 123,
        user_name: "Free package",
        email: "abc@gmail.com",
        phone_number: "0123456789",
        created_at: `Jan 13,2023`,
 
    },
  ];
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Information"></Breadcrumb>
      <TableUser packageData={packageDatafake}></TableUser>
    </DefaultLayout>

  );
};

export default UserManager;
