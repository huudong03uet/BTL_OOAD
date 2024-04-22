'use client'
import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableAuction from "@/components/ViewItem/TableViewAuction";
import { auction_all } from "@/service/auction";
import Auction from "@/types/auction";



interface TableAuctionProps {
  packageData: Auction[];
}

const ViewAuctionPage = () => {
 
  const [packageDatafake, setPackageDatafake] = useState<Auction[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await auction_all();
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


  return (

     <DefaultLayout>

       <Breadcrumb pageName="View Auction"></Breadcrumb>
        <TableAuction packageData={packageDatafake}></TableAuction> 
     </DefaultLayout>
 
  );
};

export default ViewAuctionPage;
