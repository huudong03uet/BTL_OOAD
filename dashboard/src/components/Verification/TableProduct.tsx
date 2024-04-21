'use client'
import { Package } from "@/types/package";
import CreateModal from "../Modal/ModalProduct";
import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
import { Pagination } from "@nextui-org/react";
import Product from "@/types/product";
import dateFormat from "dateformat";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
    productInformation: Product;
}

interface TableProductProps {
    packageData: Product[];
}

export enum StatusProductVerification {
    pending = "pending",
    accepted = "accepted",
    rejected = "rejected",

}

const TableUser: React.FC<TableProductProps> = ({ packageData }) => {
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [selectedPackage, setSelectedPackage] = useState<Product | null>(null);
    // const [packageDataState, setPackageDataState] = useState<FormRegisterProduct[]>(packageData);
    const [packageDataState, setPackageDataState] = useState(packageData);

    useEffect(() => {
        setPackageDataState(packageData);
    }, [packageData]);

    const handleViewProduct = (packageItem: Product) => {
        setSelectedPackage(packageItem);
        setShowModalCreate(true);
    }

    // const [currentPackage, setCurrentPackage] = useState<FormRegisterProduct | null>(null);

    const handleAcceptReject = (statusProductVerification: StatusProductVerification, packageItem: Product) => {
        const newPackageData = [...packageDataState];
        // Tìm index của packageItem trong mảng
        const index = newPackageData.findIndex((item) => item.id === packageItem.id);
        // Thay đổi status của packageItem
        newPackageData[index].status = statusProductVerification;
        // Cập nhật lại packageDataState
        setPackageDataState(newPackageData);
        // Ẩn modal

    };


    // <Pagination 
    // showControls total={pageCount}
    // onChange={changePage}
    // initialPage={1} 
    // />
    /// set page
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 5;
    const pagesVisited = (pageNumber - 1) * itemsPerPage;
    const pageCount = Math.ceil(packageDataState.length / itemsPerPage);
    const changePage = (selected: number) => {
        setPageNumber(selected);
    }


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between px-8 pb-4">
                <div className="w-100">
                    <input className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                        placeholder="Search..."
                        type="text" /></div>
                <div className="flex items-center font-medium">
                    <select className="bg-transparent pl-2">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                Product ID
                            </th>
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Product title
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Date created
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                Status
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageDataState.slice(pagesVisited, pagesVisited + itemsPerPage)
                            .map((packageItem, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {packageItem.id}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {packageItem.title}
                                        </h5>

                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {/* {packageItem.createdAt} */}
                                            {/* \nhh:MM TT */}
                                            {dateFormat(packageItem.createdAt, "mmm dd, yyyy")}
                                            
                                        </p>
                                        <p className="text-black dark:text-white">
                                            {dateFormat(packageItem.createdAt, "hh:MM TT")}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${packageItem.status === "accepted"
                                                ? "bg-success text-success"
                                                : packageItem.status === "rejected"
                                                    ? "bg-danger text-danger"
                                                    : "bg-warning text-warning"
                                                }`}
                                        >
                                            {packageItem.status}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-primary" onClick={() => { handleViewProduct(packageItem) }}>
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark">
                <p className="font-medium">Showing 1 of 3 pages</p>
                <div className="flex">
                    <button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-whiter" >
                        <svg className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z" fill=""></path>
                        </svg>
                    </button>
                    <button className="bg-primary text-white mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">1</button>
                    <button className="false mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">2</button>
                    <button className="false mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">3</button>
                    <button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white">
                        <svg className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z" fill="">
                            </path>
                        </svg>
                    </button>
                </div>
            </div> */}
            <div className='flex'>
                <div className='w-1/2'>

                </div>
                <div className='w-1/2 '>
                    {
                        packageDataState.length > 0 && <Pagination
                        className='flex justify-end p-6'
                            showControls
                            total={pageCount}
                            onChange={changePage}
                            // first is 1
                            initialPage={1}
                        />
                    }

                </div>

            </div>


            {showModalCreate && selectedPackage && (
                <CreateModal
                    onAcceptReject={handleAcceptReject}
                    showModalCreate={showModalCreate}
                    setShowModalCreate={setShowModalCreate}
                    productInformation={selectedPackage}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default TableUser;
