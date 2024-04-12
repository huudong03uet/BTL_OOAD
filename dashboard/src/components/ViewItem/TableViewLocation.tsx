'use client'
import { ViewLocation } from "@/types/viewLocation"
import { useState } from "react";

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
    locationInformation: Location;
}

interface TablelocationProps {
    packageData: ViewLocation[];
}

const Tablelocation: React.FC<TablelocationProps> = ({ packageData }) => {

    const [selectedPackage, setSelectedPackage] = useState<Location | null>(null);

    const [locations, setlocations] = useState<Location[]>([]);

    const [searchPostalCode, setSearchPostalCode] = useState('');
    const [searchStatus, setSearchStatus] = useState('');

    const handleSearchPostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPostalCode(event.target.value);
        //call api search location với SearchPostal
        
        //setSelectedPackage(response.data)
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between px-8 pb-4">
            <div className="w-100">
            <input 
                className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                placeholder="Search postalCode location..."
                type="text"
                value={searchPostalCode}
                onChange={handleSearchPostalCodeChange}
            />
        </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Postal-code
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                Country
                            </th>
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Quantity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageData.map((packageItem, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {packageItem.postal_code}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {packageItem.country}
                                    </h5>

                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {packageItem.quantity}
                                    </h5>

                                </td>
                             
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark">
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
            </div>
        </div>
    );
};

export default Tablelocation;
