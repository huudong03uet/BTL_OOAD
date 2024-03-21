'use client'
import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import style from '@/styles/customer/item.module.css';
import React, { useState } from 'react';
import { title } from "process";
import MagnifyingGlassImage from "@/components/item/MagnifyingGlassImage";
import AppFooter from "@/components/AppFooter";

interface ItemProps {
  images: string[]; // Danh sách các ảnh
  title: string; // Tiêu đề
  description: string; // Mô tả
  dimensions: string; // Kích thước
  artist: string; // Tên nghệ sĩ
  conditionReport?: string; // Báo cáo tình trạng (tùy chọn)
  provenance?: string; // Nguồn gốc (tùy chọn)
}

export default function Item(props: ItemProps) {
  const [isItemOverviewOpen, setIsItemOverviewOpen] = useState(false);
  const [isPaymentShippingOpen, setIsPaymentShippingOpen] = useState(false);

  const toggleItemOverviewAccordion = () => {
    setIsItemOverviewOpen(!isItemOverviewOpen);
  };

  const togglePaymentShippingAccordion = () => {
    setIsPaymentShippingOpen(!isPaymentShippingOpen);
  };

  //fake data
  const itemData: ItemProps = {
    images: [
      'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg',
      'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg',
      'https://via.placeholder.com/300',
    ],
    title: 'John Nieto, Corn Dancers, ca. 1989',
    description: 'This is an example description of the item.',
    dimensions: '10cm x 20cm',
    artist: 'John Doe',
    conditionReport: 'No damages observed.',
    provenance: 'Purchased from XYZ Gallery in 2020.',
  };


  return (
    <>
      <div>
        {/* Selection 1: Banner */}
        <div className={style.banner}>
          <Container>
            <MagnifyingGlassImage imageUrl={"https://image.invaluable.com/static/home/PDP_Desktop_bp_parity_banner.png"}></MagnifyingGlassImage>
            {/* <img alt="BP Parity Banner" src="https://image.invaluable.com/static/home/PDP_Desktop_bp_parity_banner.png"></img> */}
          </Container>
        </div>

        {/* Selection 2: Title */}
        <div>
          <Container>
            <div className={`${style['main-lot-title']} ${style['d-none']} ${style['d-md-block']}`}>
              <div>
                <div className={style['artist-title']}>
                  <a href="/" target="_blank" rel="noreferrer" className={style['black-link']}><div>{itemData.artist}</div></a>
                </div>
                <h1 className={`${style['title']} ${style['mb-4']}`}>Lot 85:<span className="font-italic">&nbsp;{itemData.title}</span></h1>
              </div>
            </div>
          </Container>
        </div>

        {/* Selection 3: Main*/}
        <div>
          <Container>
            <div className={style['contend-aside-holder']}>
              <div className={style.contend}>
                <div className={style['carousel-image']}>
                  <div className={style['slides-thumbnail']}>
                    {/* <img src={itemData.images[0]} alt="" /> */}
                  </div>
                  <div className={style['main-slide-img']}>
                    {/* <img src={itemData.images[0]} alt="" /> */}
                    {/* <MagnifyingGlassImage imageUrl={itemData.images[0]}></MagnifyingGlassImage> */}
                  </div>
                </div>
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
                                <b>John Nieto</b> <br />
                                (1936 - 2018) <br />
                                <b>Corn Dancers, ca. 1989</b> <br />
                                serigraph, edition 92 of 100 <br />
                                signed lower left: Nieto <br />
                                editioned lower center: 92/100
                              </div>
                            </div>
                            <div>
                              <h4>Dimensions</h4>
                              <div>27 1/2 x 34 3/4 in. (69.9 x 88.3 cm.), frame 37 x 44 1/4 x .625 in. (94 x 112.4 x 1.6 cm.)</div>
                            </div>
                            <div>
                              <h4>Artist or Maker</h4>
                              <div className="artist-info">
                                <a href="/artist/nieto-john-w-d664fsop1m" target="_blank" rel="noreferrer">
                                  <div>John W Nieto</div>
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
                                <i>The condition reports for the lots offered by Santa Fe Art Auction (SFAA) are provided as a courtesy and convenience for potential buyers. The reports are not intended to nor do they substitute for physical examination by a buyer or the buyer's advisors. The condition reports are prepared by SFAA staff members who are not art conservators or restorers, nor do they possess the qualifications needed for comprehensive evaluation. Each condition report is an opinion of the staff member and should not be treated as a statement of fact. The absence of a condition report does not imply anything as to the condition of a particular lot. Buyers are reminded that the limited warranties are set forth in the Terms and Conditions of Sale and do not extend to condition. Each lot is sold as-is.</i>
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
              <div className={style.aside}>
                <div className={style['bid-room-inner']}>
                  <div className={style['bid-status']}>
                    <p className={style.est}>Est: $2,000 USD - $3,000 USD</p>
                    <p className={style.usd}><b>$1000 USD</b><span className={style['bid-count']}>o bids</span></p>
                  </div>
                  <form action="" className={style['form-group-bid']}>
                    <label htmlFor=""><span>Set Max Bid:</span></label>
                    <div className={style['custom-select-menu']}>
                      <div className={style['select-dropdown']}>
                        <button className={style['form-control']} data-toogle="dropdow">
                          <span>$1000 USD</span>
                          <span className={`${style['select-dropdown-caret']} fa fa-angle-down`}></span>
                        </button>
                        <button type="button" className={`btn btn-primary btn-lg btn-block ${style['btn-place-bid']}`}>Place Bid</button>
                      </div>
                      <div className={style.secure}>
                        <span className={style['secure-bidding']}><i className="fa fa-lock"></i>Secure Bidding</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Seletion 4: Image Footer */}
        <div className={style.imagefooter}>
          <img src="/footer.png" alt="" className={style.footerImage} />
        </div>
      </div>
      <AppFooter />
    </>

  );
}