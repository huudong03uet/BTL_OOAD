import style from './style.module.css';
import Link from 'next/link';
import ModalConfirm from "@/components/ModalConfirm";
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { UserContext } from '@/services/context/UserContext';
import { SellerContext } from '@/services/context/SellerContext';
import { logout } from '@/services/auth/login';
function SideBarUser() {
    // const router = useRouter();
    const {user, setUser} = useContext(UserContext);
    const {seller, setSeller} = useContext(SellerContext);
    const acceptRegister: boolean = true;

    const [showModal, setShowModal] = useState<boolean>(false); // State for modal visibility

    const handleConfirmSignout = () => {
        toast.success('Logout successfully!', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      setShowModal(false);
      setUser(null);
      setSeller(null);
      logout()
    //   window.location.href = '/';

    };
  
    const handleCancelSignout = () => {
      setShowModal(false);
    };

    return (
        // <div className='ps-5 ms-3'>
        <div className='ps-4 ms-3 pe-4'>
            <div className={style.div_module}>
                <Link className={style.div_text} href="/my-account/home" >
                    My Auction
                </Link>
                <Link className={style.div_text} href="/my-account/edit-profile">
                    Edit Profile
                </Link>
                <Link className={style.div_text} style={{alignItems: 'center'}} href="/my-account/saved-items">
                    <i className="fa fa-heart space-right-sm"></i>
                    {" "}
                    Saved Items
                </Link>
            </div>
            <div className={style.div_module}>
                {/* <div className={style.div_text}>
                    Bids
                </div>
                <div className={style.div_text}>
                    Auctions
                </div> */}
                <Link className={style.div_text} href="my-account/purchases">
                    Purchases
                </Link>
                <Link className={style.div_text} href="/my-account/payment-options">
                    Payment Options

                </Link>
            </div>
          

        {showModal && (
            <ModalConfirm // Pass show prop with state value
              show={showModal}
              onConfirm={handleConfirmSignout}
              onCancel={handleCancelSignout}
            />
          )}
    


        

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
     
            <div className={style.div_module} onClick={() => setShowModal(true)}>
                <div className={style.div_text} style={{ color: '#797676' }}>
                    Signout
                </div>
            </div>


        </div>
    );
}

export default SideBarUser;