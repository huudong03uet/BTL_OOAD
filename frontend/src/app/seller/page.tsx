'use client'

import { get_seller_by_user } from '@/services/account/seller';
import { SellerContext } from '@/services/context/SellerContext';
import { UserContext } from '@/services/context/UserContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function MyAccount() {
    const router = useRouter();
    const {seller, setSeller} = useContext(SellerContext);
    const {user, setUser} = useContext(UserContext);
    useEffect(() => {
        if (seller?.id == null && user) {
            router.push('/my-account/register-seller');
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
