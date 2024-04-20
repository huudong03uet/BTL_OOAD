'use client'

import { SellerContext } from '@/services/context/SellerContext';
import { useContext, useEffect } from 'react';

export default function MyAccount() {
    const {seller, setSeller} = useContext(SellerContext);
    useEffect(() => {
        if (seller?.id == null) {
            window.location.href = '/my-account/register-seller';
        }
    }, [seller]);

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
