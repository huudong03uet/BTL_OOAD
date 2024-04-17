'use client'
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import VerticalSlide from "@/components/item/VerticalSlide";
import style from '@/styles/customer/item.module.css';
import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { useTimer } from 'react-timer-hook';

import AppNav from "@/components/AppNav";
import Product from "@/models/product";
import { user_get_detail_product } from "@/services/product/user";
import { useSearchParams } from "next/navigation";
import { Modal } from 'react-bootstrap';

function MyTimer({ expiryTimestamp }: { expiryTimestamp: number }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  console.log('totalSeconds:', totalSeconds)
  console.log("expiryTimestamp:", expiryTimestamp);
  console.log('days:', days)
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '50px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}




// export default function Item(props: ProductDetail) {
export default function Item() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // const [itemData, setItemData] = useState({} as Product);
  const [itemData, setItemData] = useState({} as Product);
  const [isItemOverviewOpen, setIsItemOverviewOpen] = useState(true);
  const [isPaymentShippingOpen, setIsPaymentShippingOpen] = useState(true);

  const toggleItemOverviewAccordion = () => {
    setIsItemOverviewOpen(!isItemOverviewOpen);
  };

  const togglePaymentShippingAccordion = () => {
    setIsPaymentShippingOpen(!isPaymentShippingOpen);
  };
  // Error: NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted
  const searchParams = useSearchParams();


  // var time_remain_auction = 120000;



  const [time_remain_auction, set_time_remain_auction] = useState(0);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const productId = Number(searchParams.get('product_id'));
          const data = await user_get_detail_product(productId);
          setItemData(data);
          // console.log('time_remain_auction:', time_remain_auction)

          // console.log('data:', Date().getTime().toString());
        } catch (error) {
          console.error('Error fetching product detail:', error);
        }
      }

      fetchData()
    }, [searchParams])







    return (
      <>
        <AppHeader></AppHeader>
        <AppNav />
        <div>
          {/* Selection 1: Banner */}
          {/* <div className={style.banner}>
          <Container>
            <img alt="BP Parity Banner" src="https://image.invaluable.com/static/home/PDP_Desktop_bp_parity_banner.png"></img>
          </Container>
        </div> */}

          {/* Selection 2: Title */}
          <div >
            <Container>
              <div className={`${style['main-lot-title']} ${style['d-none']} ${style['d-md-block']}`}>
                <div>
                  {/* <div className={style['artist-title']}>
                  <a href="/" target="_blank" rel="noreferrer" className={style['black-link']}><div>{itemData?.artist}</div></a>
                </div> */}
                  <h1 className={`${style['title']} ${style['mb-4']}`}>Lot {itemData?.id}:<span className="font-italic">&nbsp;{itemData?.title}</span></h1>
                </div>
              </div>
            </Container>
          </div>

          {/* Selection 3: Main*/}
          <div>
            <Container>
              <div className={style['contend-aside-holder']}>
                <div className={style.contend}>
                  <VerticalSlide images={itemData.images ? itemData.images.map(image => image.url) : []}></VerticalSlide>
                  <div className="share-sec">
                    <div className={style['sharing-btn']}>
                      <i className="fa fa-envelope"></i>
                      <i className="fa fa-share"></i>
                      <i className="fa fa-print"></i>
                    </div>
                  </div>
                  <div>
                    <div className={style['accordion-holder1']}>
                      <div className='d-flex align-items-center' id="itemOverviewAccordion" role="button" onClick={toggleItemOverviewAccordion}>
                        <h2 className='pe-2'>Item Overview

                        </h2>
                        <i className={`fa fa-angle-${isItemOverviewOpen ? 'up' : 'down'}`}></i>

                      </div>
                      {isItemOverviewOpen && (
                        <div className={style.collapse}>
                          <div className="card border-0">
                            <div className="card-body">
                              <div className='py-2'>
                                <h4>Description</h4>
                                <div>
                                  <b>{itemData?.artist}</b> <br />

                                  <p>{itemData?.description}</p>
                                </div>
                              </div>
                              <div className='py-2'>
                                <h4>Dimensions</h4>
                                <div>{itemData?.dimensions}</div>
                              </div>
                              <div className='py-2'>
                                <h4>Artist or Maker</h4>
                                <div className="artist-info">
                                    <div>{itemData?.artist}</div>
                                </div>
                              </div>
                              <div className='py-2'>
                                <h4>Condition Report</h4>
                                <div>
                                  <i>{itemData?.condition_report}</i>
                                </div>
                              </div>
                              <div className='py-2'>
                                <h4>Provenance</h4>
                                <div>
                                  <i>{itemData?.provenance}</i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={style['accordion-holder2']}>
                      <div className='d-flex align-items-center' id="paymentNShipmentToggler" role="button" onClick={togglePaymentShippingAccordion}>
                        <h2 className='pe-2'>Payment & Shipping


                        </h2>
                        <i className={`fa fa-angle-${isPaymentShippingOpen ? 'up' : 'down'}`}></i>

                      </div>
                      {isPaymentShippingOpen && (
                        <div className={style.collapse}>
                          <div className="card border-0">
                            <div className="card-body">
                              <div className='py-2'>
                              <h4>Payment</h4>
<div>
Accepted forms of payment: <span>American Express, MasterCard, Money Order / Cashiers Check, Personal Check, Visa, Wire Transfer</span>

</div>

                                </div>
                              {/* <div className="cc-icons space-bottom">
                                <i className="fa fa-cc-visa"></i>
                                <i className="fa fa-cc-mastercard"></i>
                                <i className="fa fa-cc-amex"></i>
                              </div> */}
                              <div className='py-2'>
                                <h4>Shipping</h4>
                                <div>
                                  The Santa Fe Art Auction does not provide in-house shipping services for online-only auctions but we are happy to provide a selection of local third-party shippers. Buyers are required to provide written authorization by submitting a signed shipping release and waiver of liability form, included with our invoice, in order to release property to the third party shipper of Buyer's choice.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {itemData?.status === 'sold' ? (
                  <p className={style.est}>Est: ${itemData?.min_estimate} USD - ${itemData?.max_estimate} USD</p>
                ) : (<div className={style.aside}>
                  <div className={style['bid-room-inner']}>
                    <div className={style['bid-status']}>
                      <p className='fw-bold'>Est: ${itemData?.min_estimate} USD - ${itemData?.max_estimate} USD</p>
                      {/* <p className={style.usd}><b>${itemData?.max_bid} USD</b><span className={style['bid-count']}>     {itemData?.numerical_order} bids</span></p> */}
                    </div>
                    {/* <form action="" className={style['form-group-bid']}>
                    <label htmlFor=""><span>Set Max Bid:</span></label>
                    <div className={style['select-dropdown']}>
                      <select className={`${style['form-control']} ${style['select-single']}`} >
                        {itemData?.max_bid !== undefined && [...Array(10)].map((_, index) => (
                          <option key={index}>${itemData?.max_bid! + index * 5} USD</option>
                        ))}
                      </select>
                    </div>
                    <button type="button" className={`btn btn-primary btn-lg btn-block ${style['btn-place-bid']} ${style['button-style']}`} onClick={handleShowModal}>Place Bid</button>
                    <div className={style.secure}>
                      <span className={style['secure-bidding']}><i className="fa fa-lock pe-2"></i>Secure Bidding</span>
                    </div>

                  </form> */}
                    {/* {
                    new Date(itemData?.auction?.time_auction).getTime() < new Date().getTime() ? (
                      <button type="button" className={`btn btn-primary btn-lg btn-block ${style['btn-place-bid']} ${style['button-style']}`} onClick={handleShowModal}>Enter Live Auction</button>
                    ) : (
                      <p className={style['time-remain']}>Time Remaining: {(- new Date().getTime() + new Date(itemData?.auction?.time_auction).getTime())}</p>
                    )
                  } */}
                   {itemData && itemData.auction && <>
                    {
                      (new Date(itemData.auction.time_auction).getTime() - new Date().getTime()) < 0 ? (
                        <button type="button" className={`btn btn-dark btn-lg btn-block ${style['btn-place-bid']} ${style['button-style']}`} onClick={handleShowModal}>Enter Live Auction</button>
                      ) : (
                        // <p className={style['time-remain']}>Time Remaining: {time_remain_auction}</p> = for mat Time remaining: xx day : xx hour : xx minute : xx second
                        <p className='fw-bold'>Time Remaining For Auction:

                          <div style={{ fontSize: '50px' }}>
                              <MyTimer expiryTimestamp={(new Date(itemData.auction.time_auction).getTime())} />
                          </div>


                        </p>
                      )
                    }
                    </>}
                    
                  </div>
                </div>)}

              </div>

              <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                  <h2 className="text-center">Review Your Bid</h2>
                  <p>Select the highest amount you are willing to bid. If you are outbid, we will increase your bid by one increment, up to your max.</p>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td style={{ border: 'none' }}>Estimate</td>
                        <td style={{ border: 'none' }}>$0 USD - $0 USD</td>
                      </tr>
                      <tr>
                        <td style={{ border: 'none' }}>Current bid</td>
                        <td style={{ border: 'none' }}>$1 USD</td>
                      </tr>
                      <tr>
                        <td style={{ border: 'none' }}>Your max bid</td>
                        <td style={{ border: 'none' }}>
                          <select className="form-select">
                            <option>$2 USD</option>
                            <option>$0.44 USD</option>
                            <option>$2.44 USD (+shipping, taxes & fees)</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ border: 'none' }}>Buyer's Premium</td>
                        <td style={{ border: 'none' }}>$0.44 USD</td>
                      </tr>
                      <tr>
                        <td style={{ border: 'none' }}>TOTAL</td>
                        <td style={{ border: 'none' }}>$2.44 USD (+ shipping, taxes & fees)</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  <h5>Shipping Address</h5>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="First Name" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Last Name" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Address Line 1" />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="City" />
                    </div>
                    <div className="col">
                      <select className="form-select">
                        <option>Country</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Zip/Postal Code" />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Province" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Phone Number" />
                  </div>
                  <hr />
                  <h5>Credit Card</h5>
                  <p>You won’t be charged unless you win. If you win, the auction house may auto-charge this card 2 days after the invoice is sent.</p>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Card Number" />
                  </div>
                  <p><i className="fa fa-lock" aria-hidden="true"></i><span className='mx-1'>Security server <a rel="noopener noreferrer" target="_blank" style={{ color: "#004bd6" }}>Certified by VikingCloud</a></span></p>
                  <div className="mb-3 d-flex">
                    <input type="text" className="form-control me-2" placeholder="MM/YY" />
                    <input type="text" className="form-control" placeholder="CVN" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Name on Card" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="billingAddress" />
                    <label className="form-check-label" htmlFor="billingAddress">Billing address is same as shipping address</label>
                  </div>
                  <hr />
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="textMe" />
                    <label className="form-check-label" htmlFor="textMe">Text me if I'm outbid and before the auction starts for my lots</label>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <select className="form-select">
                        <option>Country</option>
                      </select>
                    </div>
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Phone Number" />
                    </div>
                  </div>
                  <button type="button" className="btn btn-dark w-100">Place Bid</button>
                  <p className="text-center mt-2">By clicking "Place Bid", you agree to submit a bid for this item for the amount described above, not including shipping, taxes, and fees. All accepted bids are binding. Your address and payment information on file will be encrypted and securely submitted using SSL technology in order to complete your registration for this sale. After the sale, the seller may auto-charge the payment method used during registration.apply.</p>

                </Modal.Body>
              </Modal>
            </Container >
          </div >

        </div >
        <AppFooter />
      </>

    );
  }