'use client'
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableLocation from "@/components/ViewItem/TableViewLocation";
import { ViewLocation } from "@/types/viewLocation"


interface TablelocationProps {
  packageData: ViewLocation[];
}

const ViewLocationPage = () => {

  const packageDatafake: ViewLocation[] = [
    {
        postal_code: '10001',
        country: 'USA',
        quantity: 10,
    },
    {
        postal_code: '20002',
        country: 'Canada',
        quantity: 20,
    },
    {
        postal_code: '30003',
        country: 'UK',
        quantity: 30,
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="View location"></Breadcrumb>
      <TableLocation packageData={packageDatafake}></TableLocation>
    </DefaultLayout>
  );
};

export default ViewLocationPage;
