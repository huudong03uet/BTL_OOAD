'use client'

import { useEffect } from 'react';
import SellerDataService from "@/services/model/seller";

export default function MyAccount() {
    useEffect(() => {
        async function fetchData() {
            const data = await SellerDataService.getSellerData();
            if (data?.id == null) {
                window.location.href = '/my-account/register-seller';
            }
        }

        fetchData();
    }, []);

    return (
        <div className='row'>
            {/* <div className="col-2">
                <SideBarMyAccount />
            </div> */}
            <div className="col-10">

            </div>
        </div>
    );
}
