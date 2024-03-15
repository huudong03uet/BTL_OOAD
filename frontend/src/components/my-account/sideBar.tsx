import { Container } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import style from './style.module.css';
import Link from 'next/link';
function SideBarMyAccount() {
    return (
        // <div className='ps-5 ms-3'>
            <div className='ps-0 ms-3'>
             <div className={style.div_module}>
                <div className={style.div_text}>
                 My Invaluable
                </div>
                
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
                <div className={style.div_text}>
                    <i className="fa fa-heart space-right-sm"></i>
                    {' '}Saved Items
                </div>
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
                    Sellers
                </div>
                <div className={style.div_text}>
                    Categories
                </div>
                </div>
                
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
                <div className={style.div_text} style={{color: '#797676'}}>
                    Signout
                </div>
            </div>


        </div>
    );
}

export default SideBarMyAccount;