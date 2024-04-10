'use client'
import { Package } from "@/types/package";
import { FormRegisterSeller } from "@/types/form_register_seller";
import CreateModal from "../Modal/ModalUser";
import { useState } from "react";
import { User } from "@/types/user";
import { Order } from "@/types/order";


interface TableUserProps {
    packageData: Order[];
}

const TableUser: React.FC<TableUserProps> = ({ packageData }) => {

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between px-8 pb-4"><div className="w-100"><input className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary" placeholder="Search..." type="text"/></div><div className="flex items-center font-medium"><select className="bg-transparent pl-2"><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="50">50</option></select><p className="pl-2 text-black dark:text-white">Entries Per Page</p></div></div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th>#</th>
                            <th className=" px-4 py-4 font-medium text-black dark:text-white">
                                Order ID
                            </th>
                            <th className=" px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Date
                            </th>
                            <th className=" px-4 py-4 font-medium text-black dark:text-white">
                                Product Name
                            </th>
                            <th className=" px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Price
                            </th>
                            <th className=" px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Paid
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Seller 
                            </th>
                            <th className=" px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageData.map((packageItem, key) => (
                            <tr key={key}>
                                <th>
                                    {key}
                                </th>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.order_id}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.date}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.product_name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.price}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${packageItem.paid === "Yes"
                                            ? "bg-success text-success"
                                            : "bg-danger text-danger"
                                            }`}
                                    >
                                        {packageItem.paid}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.seller}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${packageItem.status === "Paid"
                                            ? "bg-success text-success"
                                            : packageItem.status === "Unpaid"
                                                ? "bg-danger text-danger"
                                                : "bg-warning text-warning"
                                            }`}
                                    >
                                        {packageItem.status}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark"><p className="font-medium">Showing 1 0f 3 pages</p><div className="flex"><button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-whiter" ><svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z" fill=""></path></svg></button><button className="bg-primary text-white mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">1</button><button className="false mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">2</button><button className="false mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">3</button><button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"><svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z" fill=""></path></svg></button></div></div>
        </div>
    );
};

export default TableUser;
