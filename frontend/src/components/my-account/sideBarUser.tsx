import style from './style.module.css';
import Link from 'next/link';
function SideBarUser() {
    const acceptRegister: boolean = true;

    return (
        // <div className='ps-5 ms-3'>
        <div className='ps-0 ms-3'>
            <div className={style.div_module}>
                <Link className={style.div_text} href="/my-account/home" >
                    My Invaluable
                </Link>

            </div>
            <div className={style.div_module}>
                <div className={style.div_text}>
                    Bids
                </div>
                <div className={style.div_text}>
                    Auctions
                </div>
                <div className={style.div_text}>
                    Purchases
                </div>
            </div>
            <div className={style.div_module}>
                <Link className={style.div_text} href="/my-account/saved-items">
                    <i className="fa fa-heart space-right-sm"></i>
                    {' '}Saved Items
                </Link>
                <div className={style.div_text}>
                    Following
                </div>
                <div className='ps-4'>
                    <div className={style.div_text}>
                        Keywords
                    </div>
                    <div className={style.div_text}>
                        Artists
                    </div>
                    <div className={style.div_text}>
                    <Link className={style.div_text} href="/my-account/register-seller">
                        {' '}Sellers
                    </Link>
                    </div>
                    <div className={style.div_text}>
                        Categories
                    </div>
                </div>

            </div>


            {/* {
                    !registeredSeller ? (



                        <div className={style.div_text}>
                            <Link className={style.div_text} href="/my-account/register-seller">
                                Seller Register
                            </Link>
                        </div>
                    ) : (
                        <div className='ps-4'>
                            <div className={style.div_text}>
                                Edit seller profile
                            </div>
                            <div className={style.div_text}>
                                Add product
                            </div>
                            <div className={style.div_text}>
                                Add auction
                            </div>
                            <div className={style.div_text}>
                                Product manage
                            </div>
                            <div className={style.div_text}>
                                Auction manage
                            </div>
                            <div className={style.div_text}>
                                Unregister seller
                            </div>
                        </div>
                    )
                } */}

            <div className={style.div_module}>
                {
                    !acceptRegister ? (
                        // <div className={style.div_module}>
                            <Link className={style.div_text} href="/my-account/register-seller">
                                Register seller
                            </Link>
                        // </div>
                    ) : (
                        // <div className='ps-4'>
                        //     <div className={style.div_text}>
                        //         Edit seller profile
                        //     </div>
                        //     <div className={style.div_text}>
                        //         Add product
                        //     </div>
                        //     <div className={style.div_text}>
                        //         Add auction
                        //     </div>
                        //     <div className={style.div_text}>
                        //         Product manage
                        //     </div>
                        //     <div className={style.div_text}>
                        //         Auction manage
                        //     </div>
                        //     <div className={style.div_text}>
                        //         Unregister seller
                        //     </div>
                        // </div>
                        // <div className={style.div_module}>





                            <Link className={style.div_text} href="/seller">
                                Seller center
                            </Link>
                        // </div>
                    )
                }

            </div>
            <div className={style.div_module}>
                <div className={style.div_text}>
                    Help
                </div>
                <div className={style.div_text}>
                    Messages
                </div>
                <Link className={style.div_text} href="/my-account/edit-profile">
                    Edit Profile
                </Link>
                <div className={style.div_text}>
                    Notification & Email Preferences
                </div>
                <div className={style.div_text}>
                    Subscriptions
                </div>
                <Link className={style.div_text} href="/my-account/payment-options">
                    Payment Options

                </Link>
            </div>
            <div className={style.div_module}>
                <div className={style.div_text} style={{ color: '#797676' }}>
                    Signout
                </div>
            </div>


        </div>
    );
}

export default SideBarUser;