'use client'
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableLocation from "@/components/ViewItem/TableViewLocation";
import { ViewLocation } from "@/types/viewLocation"
import { location_analist } from "@/service/component";


interface TablelocationProps {
  packageData: ViewLocation[];
}

const ViewLocationPage = () => {

  const [packageDatafake, setPackageDatafake] = useState<ViewLocation[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await location_analist();
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

  // const packageDatafake: ViewLocation[] = [
  //   {
  //       postal_code: '10001',
  //       country: 'USA',
  //       quantity: 10,
  //   },
  //   {
  //       postal_code: '20002',
  //       country: 'Canada',
  //       quantity: 20,
  //   },
  //   {
  //       postal_code: '30003',
  //       country: 'UK',
  //       quantity: 30,
  //   },
  // ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="View location"></Breadcrumb>
      <TableLocation packageData={packageDatafake}></TableLocation>
    </DefaultLayout>
  );
};

export default ViewLocationPage;
