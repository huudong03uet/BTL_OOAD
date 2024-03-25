'use client'
import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import style from '@/styles/customer/item.module.css';
import React, { useState } from 'react';
import { title } from "process";
import MagnifyingGlassImage from "@/components/item/MagnifyingGlassImage";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import VerticalSlide from "@/components/item/VerticalSlide";

interface ItemProps {
  id: number;
  images: string[]; // Danh sách các ảnh
  title: string; // Tiêu đề
  status: string;
  price?: number;
  countBid?: number;
  max_bid?: number;
  est_min?: number;
  est_max?: number;
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
    id: 1,
    images: [
      'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg',
      'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg',
      'https://via.placeholder.com/300',
    ],
    status: 'live now',
    countBid: 10,
    max_bid: 100,
    est_min: 2000,
    est_max: 3000,
    title: 'John Nieto, Corn Dancers, ca. 1989',
    description: 'This is an example description of the item.',
    dimensions: '10cm x 20cm',
    artist: 'John Doe',
    conditionReport: 'No damages observed.',
    provenance: 'Purchased from XYZ Gallery in 2020.',
  };


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
                  <a href="/" target="_blank" rel="noreferrer" className={style['black-link']}><div>{itemData.artist}</div></a>
                </div>
                <h1 className={`${style['title']} ${style['mb-4']}`}>Lot {itemData.id}:<span className="font-italic">&nbsp;{itemData.title}</span></h1>
              </div>
            </div>
          </Container>
        </div>

        {/* Selection 3: Main*/}
        <div>
          <Container>
            <div className={style['contend-aside-holder']}>
              <div className={style.contend}>
                <VerticalSlide images={itemData.images}></VerticalSlide>
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
                                <b>{itemData.artist}</b> <br />

                                <p>{itemData.description}</p>
                              </div>
                            </div>
                            <div>
                              <h4>Dimensions</h4>
                              <div>{itemData.dimensions}</div>
                            </div>
                            <div>
                              <h4>Artist or Maker</h4>
                              <div className="artist-info">
                                <a href="/artist/nieto-john-w-d664fsop1m" target="_blank" rel="noreferrer">
                                  <div>{itemData.artist}</div>
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
                                <i>{itemData.conditionReport}</i>
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
              {itemData.status === 'sold' ? (
                <div className={style.aside}>
                  <div className={style['bid-room-inner']}>
                    <div className={style['bid-status']}>
                      <p className={style.usd}><b>Sold</b></p> <br />
                      <p className={style.est}>Est: ${itemData.est_min} USD - ${itemData.est_max} USD</p>
                      <p className={style.usd}><b>${itemData.price} USD</b></p>
                    </div>      
                  </div>
                </div>

              ) : (<div className={style.aside}>
                <div className={style['bid-room-inner']}>
                  <div className={style['bid-status']}>
                    <p className={style.est}>Est: ${itemData.est_min} USD - ${itemData.est_max} USD</p>
                    <p className={style.usd}><b>${itemData.max_bid} USD</b><span className={style['bid-count']}>     {itemData.countBid} bids</span></p>
                  </div>
                  <Form action="" className={style['form-group-bid']}>
                    <label htmlFor=""><span>Set Max Bid:</span></label>
                    <div className={style['select-dropdown']}>
                      <select className={`${style['form-control']} ${style['select-single']}`} >
                        {/* Kiểm tra xem max_bid có tồn tại và không phải là undefined không trước khi tạo các option */}
                        {itemData.max_bid !== undefined && [...Array(10)].map((_, index) => (
                          <option key={index}>${itemData.max_bid! + index * 5} USD</option>
                        ))}
                      </select>
                    </div>
                    <button type="button" className={`btn btn-primary btn-lg btn-block ${style['btn-place-bid']} ${style['button-style']}`}>Place Bid</button>
                    <div className={style.secure}>
                      <span className={style['secure-bidding']}><i className="fa fa-lock"></i>Secure Bidding</span>
                    </div>

                  </Form>
                </div>
              </div>)}

            </div>
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