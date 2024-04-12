import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCategory from "@/components/ViewItem/TableViewCategory";
import Category from "@/types/category";


interface TableCategoryProps {
  packageData: Category[];
}

const ViewCategoryPage = () => {

  const packageDatafake: Category[] = [
    {
        id: 1,
        title: 'Category 1',
    },
    {
        id: 2,
        title: 'Category 2',
    },
    {
        id: 3,
        title: 'Category 3',
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="View Category"></Breadcrumb>
      <TableCategory packageData={packageDatafake}></TableCategory>
    </DefaultLayout>
  );
};

export default ViewCategoryPage;
