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

  useEffect(() => {
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

    fetchData()
  }, [])

  // const packageDatafake: Category[] = [
  //   {
  //       id: 1,
  //       title: 'Category 1',
  //   },
  //   {
  //       id: 2,
  //       title: 'Category 2',
  //   },
  //   {
  //       id: 3,
  //       title: 'Category 3',
  //   },
  // ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="View Category"></Breadcrumb>
      <TableCategory packageData={packageDatafake}></TableCategory>
    </DefaultLayout>
  );
};

export default ViewCategoryPage;
