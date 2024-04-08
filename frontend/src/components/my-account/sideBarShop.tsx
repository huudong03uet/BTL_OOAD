import style from './style.module.css';
import Link from 'next/link';
function SideBarShop() {
    const registeredSeller: boolean = false;


    return (
        // <div className='ps-5 ms-3'>
        <div className='ps-0 ms-3'>
            <div className={style.div_module}>
                <Link className={style.div_text} href="/seller" >
                    Seller center
                </Link>

            </div>

            <div className={style.div_module}>
                <div className={style.div_text}>
                    Shipment
                </div>
                <div className='ps-4'>
                    <div className={style.div_text}>
                        My Orders
                    </div>
                    <div className={style.div_text}>
                        Cancellation
                    </div>
                    <div className={style.div_text}>
                        Return/Refund
                    </div>
                </div>

            </div>
            <div className={style.div_module}>
                <div className={style.div_text}>
                    Product
                </div>
                <div className='ps-4'>
                    <Link className={style.div_text} href="/seller/my-products">
                        My products
                    </Link>

                    <Link className={style.div_text} href="/seller/add-product" >
                        Add New Product
                    </Link>
                    
                    <Link className={style.div_text} href="/seller/product-history" >
                        Product history
                    </Link>
                </div>
            </div>
            <div className={style.div_module}>
                <div className={style.div_text} >
                    Auction
                </div>
                <div className='ps-4'>
                    <Link className={style.div_text} href="/seller/my-auction">
                        My auction
                    </Link>
                    <Link className={style.div_text} href="/seller/add-auction">
                        Add New Auction
                    </Link>
                    <Link className={style.div_text} href="/seller/auction-history">
                        Auction history
                    </Link>
                </div>
            </div>
            <div className={style.div_module}>
                <div className={style.div_text}>
                    Seller information
                </div>

                <div className='ps-4'>

                    <Link className={style.div_text} href="/seller/edit-profile">
                        Edit Profile
                    </Link>
                    <div className={style.div_text}>
                        Payment-options
                    </div>
                    <div className={style.div_text}>
                        Bid history
                    </div>
                </div>
            </div>

            <div className={style.div_module}>

                <Link className={style.div_text} href="/my-account/home" >
                    Change to User
                </Link>

            </div>
            <div className={style.div_module}>
                <div className={style.div_text} style={{ color: '#797676' }}>
                    Sign out
                </div>
            </div>


        </div>
    );
}

export default SideBarShop;