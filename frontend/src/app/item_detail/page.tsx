'use client'
import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import style from '@/styles/customer/homePage.module.css';
import React, { useState } from 'react';


export default function Home() {
  const [isItemOverviewOpen, setIsItemOverviewOpen] = useState(false);
  const [isPaymentShippingOpen, setIsPaymentShippingOpen] = useState(false);

  const toggleItemOverviewAccordion = () => {
    setIsItemOverviewOpen(!isItemOverviewOpen);
  };

  const togglePaymentShippingAccordion = () => {
    setIsPaymentShippingOpen(!isPaymentShippingOpen);
  };
  return (
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
                <a href="/" target="_blank" rel="noreferrer" className={style['black-link']}><div>John W Nieto</div></a>
              </div>
              <h1 className={`${style['title']} ${style['mb-4']}`}>Lot 85:<span className="font-italic">&nbsp;John Nieto, Corn Dancers, ca. 1989</span></h1>
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
                  <img src="data:image/jpeg;base64,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" alt="" />
                </div>
                <div className={style['main-slide-img']}>
                  <img src="data:image/jpeg;base64,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" alt="" />
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
  );
}