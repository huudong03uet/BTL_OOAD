'use client'
import React, { useState, useEffect } from "react";
import FormElements from "@/components/FormElements";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableUser from "@/components/Verification/TableUser";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FormRegisterSeller } from "@/types/form_register_seller"; 
import axios from 'axios';
import { HOST } from "@/service/host";



interface TableUserProps {
  packageData: FormRegisterSeller[];
}

const VerificationSellerPage = () => {  

  const [packageData, setPackageData] = useState<FormRegisterSeller[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/account/seller/all`);
        const data = response.data;
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
        setPackageData(data);
        console.log(data[0])
        console.log(packageData);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchData();
  }, []);


  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Verification Seller"></Breadcrumb>
      <TableUser packageData={packageData}></TableUser>
    </DefaultLayout>

  );
};

export default VerificationSellerPage;
