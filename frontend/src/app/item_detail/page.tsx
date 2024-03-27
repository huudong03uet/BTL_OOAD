'use client'
import { Container } from "react-bootstrap";
import style from '@/styles/customer/item.module.css';
import React, { useEffect, useState } from 'react';
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import VerticalSlide from "@/components/item/VerticalSlide";
import Item from "@/models/item";
import { get_detail_item } from "@/services/item/item";

import { Modal } from 'react-bootstrap';

export default function Item(props: Item) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [itemData, setItemData] = useState({
      "id": 2,
      "title": "name",
      "description": "des",
      "status": "not_sold",
      "max_bid": 0,
      "count_bid": 0,
      "estimate_min": 0,
      "estimate_max": 0,
      "dimensions": null,
      "artist": "UNK",
      "condition_report": "No damages observed.",
      "provenance": "proven",
      "createdAt": "2024-03-24T19:08:44.000Z",
      "updatedAt": "2024-03-24T19:08:44.000Z",
      "userId": 3,
      "images": [
          {
              "path": String,
          },
      ]
  });
  const [isItemOverviewOpen, setIsItemOverviewOpen] = useState(false);
  const [isPaymentShippingOpen, setIsPaymentShippingOpen] = useState(false);

  const toggleItemOverviewAccordion = () => {
    setIsItemOverviewOpen(!isItemOverviewOpen);
  };

  const togglePaymentShippingAccordion = () => {
    setIsPaymentShippingOpen(!isPaymentShippingOpen);
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const data = await get_detail_item(4);
        setItemData(data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  return (
    <>
      <AppHeader></AppHeader>
      <div>
        {/* Selection 1: Banner */}
        <div className={style.banner}>
          <Container>
            <img alt="BP Parity Banner" src="https://image.invaluable.com/static/home/PDP_Desktop_bp_parity_banner.png"></img>
          </Container>
        </div>

        {/* Selection 2: Title */}
        <div>
          <Container>
            <div className={`${style['main-lot-title']} ${style['d-none']} ${style['d-md-block']}`}>
              <div>
                <div className={style['artist-title']}>
                  <a href="/" target="_blank" rel="noreferrer" className={style['black-link']}><div>{itemData?.artist}</div></a>
                </div>
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
                {/* <VerticalSlide  images={itemData.images.map(image => image.path)}></VerticalSlide> */}
                <div className={style['sharing-btn']}>
                  <i className="fa fa-envelope"></i>
                  <i className="fa fa-share"></i>
                  <i className="fa fa-print"></i>
                </div>
                <div>
                  <div className={style['accordion-holder1']}>
                    <div className={style['accordion-heading']} id="itemOverviewAccordion" role="button" onClick={toggleItemOverviewAccordion}>
                      <h2>Item Overview</h2>
                      <i className={`fa fa-angle-${isItemOverviewOpen ? 'up' : 'down'}`}></i>
                    </div>
                    {isItemOverviewOpen && (
                      <div className={style.collapse}>
                        <div className="card">
                          <div className="card-body">
                            <div>
                              <h4>Description</h4>
                              <div>
                                <b>{itemData?.artist}</b> <br />

                                <p>{itemData?.description}</p>
                              </div>
                            </div>
                            <div>
                              <h4>Dimensions</h4>
                              <div>{itemData?.dimensions}</div>
                            </div>
                            <div>
                              <h4>Artist or Maker</h4>
                              <div className="artist-info">
                                <a href="/artist/nieto-john-w-d664fsop1m" target="_blank" rel="noreferrer">
                                  <div>{itemData?.artist}</div>
                                </a>
                              </div>
                            </div>
                            <div>
                              <h4>Medium</h4>
                              <div>serigraph, edition 92 of 100</div>
                            </div>
                            <div>
                              <h4>Condition Report</h4>
                              <div>
                                <i>{itemData?.condition_report}</i>
                              </div>
                            </div>
                            <div>
                              <h4>Provenance</h4>
                              <div>
                                The Artist <br />
                                Private Collection, New Mexico
                              </div>
                            </div>
                            <button type="button" className="btn btn-link">Request more information</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={style['accordion-holder2']}>
                    <div className={style['accordion-heading']} id="paymentNShipmentToggler" role="button" onClick={togglePaymentShippingAccordion}>
                      <h2>Payment & Shipping</h2>
                      <i className={`fa fa-angle-${isPaymentShippingOpen ? 'up' : 'down'}`}></i>
                    </div>
                    {isPaymentShippingOpen && (
                      <div className={style.collapse}>
                        <div className="card">
                          <div className="card-body">
                            <h4>Payment</h4>
                            <div className="cc-icons space-bottom">
                              <span className="fa fa-cc-visa"></span>
                              <span className="fa fa-cc-mastercard"></span>
                              <span className="fa fa-cc-amex"></span>
                            </div>
                            Accepted forms of payment: <span>American Express, MasterCard, Money Order / Cashiers Check, Personal Check, Visa, Wire Transfer</span>
                            <div>
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
                <p className={style.est}>Est: ${itemData?.estimate_min} USD - ${itemData?.estimate_max} USD</p>
              ) : (<div className={style.aside}>
                <div className={style['bid-room-inner']}>
                  <div className={style['bid-status']}>
                    <p className={style.est}>Est: ${itemData?.estimate_min} USD - ${itemData?.estimate_max} USD</p>
                    <p className={style.usd}><b>${itemData?.max_bid} USD</b><span className={style['bid-count']}>     {itemData?.count_bid} bids</span></p>
                  </div>
                  <form action="" className={style['form-group-bid']}>
                    <label htmlFor=""><span>Set Max Bid:</span></label>
                    <div className={style['select-dropdown']}>
                      <select className={`${style['form-control']} ${style['select-single']}`} >
                        {/* Kiểm tra xem max_bid có tồn tại và không phải là undefined không trước khi tạo các option */}
                        {itemData?.max_bid !== undefined && [...Array(10)].map((_, index) => (
                          <option key={index}>${itemData?.max_bid! + index * 5} USD</option>
                        ))}
                      </select>
                    </div>
                        <button type="button" className={`btn btn-primary btn-lg btn-block ${style['btn-place-bid']} ${style['button-style']}`} onClick={handleShowModal}>Place Bid</button>
                    <div className={style.secure}>
                      <span className={style['secure-bidding']}><i className="fa fa-lock"></i>Secure Bidding</span>
                    </div>

                  </form>
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
                                {/* Thêm các option cho select country */}
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
                    <p><i className="fa fa-lock" aria-hidden="true"></i><span className='mx-1'>Security server <a rel="noopener noreferrer" target="_blank" style={{color: "#004bd6"}}>Certified by VikingCloud</a></span></p>
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
                                {/* Thêm các option cho select country */}
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

        {/* Seletion 4: Image Footer */}
        <div className={style.imagefooter} >
          <img src="/footer.png" alt="" className={style.footerImage} />
        </div >
      </div >
      <AppFooter />
    </>

  );
}