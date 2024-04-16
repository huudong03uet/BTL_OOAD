'use client'
import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableProduct from "@/components/ViewItem/TableViewProduct";
import { product_all } from "@/service/product";
import Product from "@/types/product";


// export const metadata: Metadata = {
//   title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

interface TableProductProps {
  packageData: Product[];
}

const ViewProductPage = () => {
  // const metadata: Metadata = {
  //   title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  //   description:
  //     "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
  // };

  

  // const packageDatafake: ProductDetail[] = [
  //   {
  //       id: 1,
  //       title: '2313',
  //       status: 'Available',
  //       count_bid: 5,
  //       max_bid: 1000,
  //       estimate_min: 500,
  //       estimate_max: 1500,
  //       description: 'This is a fake product for testing purposes.',
  //       dimensions: '10x10x10',
  //       artist: 'Fake Artist',
  //       love: 10,
  //       condition_report: 'Excellent',
  //       provenance: 'Fake Provenance',
  //   },
  //   {
  //       id: 1,
  //       title: 'Fake Product',
  //       status: 'Available',
  //       count_bid: 5,
  //       max_bid: 1000,
  //       estimate_min: 500,
  //       estimate_max: 1500,
  //       description: 'This is a fake product for testing purposes.',
  //       dimensions: '10x10x10',
  //       artist: 'Fake Artist',
  //       love: 10,
  //       condition_report: 'Excellent',
  //       provenance: 'Fake Provenance',
  //   },
  //   {
  //       id: 1,
  //       title: 'Fake Product',
  //       status: 'Available',
  //       count_bid: 5,
  //       max_bid: 1000,
  //       estimate_min: 500,
  //       estimate_max: 1500,
  //       description: 'This is a fake product for testing purposes.',
  //       dimensions: '10x10x10',
  //       artist: 'Fake Artist',
  //       love: 10,
  //       condition_report: 'Excellent',
  //       provenance: 'Fake Provenance',
  //   }
  // ];
  // const packageDatafake: ProductDetail[] = [
  //   {
  //       id: 1,
  //       title: 'Fake Product',
  //       status: 'Available',
  //       count_bid: 5,
  //       max_bid: 1000,
  //       estimate_min: 500,
  //       estimate_max: 1500,
  //       description: 'This is a fake product for testing purposes.',
  //       dimensions: '10x10x10',
  //       artist: 'Fake Artist',
  //       love: 10,
  //       condition_report: 'Excellent',
  //       provenance: 'Fake Provenance',
  //   },
  //   {
  //       id: 1,
  //       title: 'Fake Product',
  //       status: 'Available',
  //       count_bid: 5,
  //       max_bid: 1000,
  //       estimate_min: 500,
  //       estimate_max: 1500,
  //       description: 'This is a fake product for testing purposes.',
  //       dimensions: '10x10x10',
  //       artist: 'Fake Artist',
  //       love: 10,
  //       condition_report: 'Excellent',
  //       provenance: 'Fake Provenance',
  //   },
  //   {
  //       id: 1,
  //       title: 'Fake Product',
  //       status: 'Available',
  //       count_bid: 5,
  //       max_bid: 1000,
  //       estimate_min: 500,
  //       estimate_max: 1500,
  //       description: 'This is a fake product for testing purposes.',
  //       dimensions: '10x10x10',
  //       artist: 'Fake Artist',
  //       love: 10,
  //       condition_report: 'Excellent',
  //       provenance: 'Fake Provenance',
  //   }
  // ];
  const [packageDatafake, setPackageDatafake] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await product_all();
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

       <Breadcrumb pageName="View Product"></Breadcrumb>
        <TableProduct packageData={packageDatafake}></TableProduct> 
     </DefaultLayout>
 
  );
};

export default ViewProductPage;
