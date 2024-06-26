'use client'

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCategory from "@/components/ViewItem/TableViewCategory";
import Category from "@/types/category";
import { category_all } from "@/service/product";


interface TableCategoryProps {
  packageData: Category[];
}

const ViewCategoryPage = () => {

  const [packageDatafake, setPackageDatafake] = useState<Category[]>([])
  const fetchData = async () => {
    try {
      const data = await category_all();
      if (Array.isArray(data)) {
        setPackageDatafake(data);
      } else {
        setPackageDatafake([])
      }
    } catch (error) {
      console.error('Error fetching upcoming online auctions:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manager Category"></Breadcrumb>
      <TableCategory packageData={packageDatafake} onUpdateCategories={fetchData} ></TableCategory>
    </DefaultLayout>
  );
};

export default ViewCategoryPage;
