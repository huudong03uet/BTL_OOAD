'use client'
import { info } from 'console';
import React, { useState } from 'react';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { Carousel } from 'react-bootstrap';
import { image } from '@nextui-org/react';

// type SizeType = ConfigProviderProps['componentSize'];
export default function SessionAuction() {
    const message = [
        {
            "id": 1,
            "cost_auction": [
                600, 600, 700, 700, 800, 900, 900, 1200, 1300, 1400
            ],
            "status": 1,
        },
        {
            "id": 2,
            "cost_auction": [
                600, 600, 700, 700, 800, 900, 900, 1200, 1300, 1400
            ],
            "status": 1,
        }
        ,
        {
            "id": 3,
            "cost_auction": [
                600, 600, 700, 700, 800, 900, 900, 1200, 1300, 1400
            ],
            "status": 1,
        },
        {
            "id": 4,
            "cost_auction": [
                600, 600, 700, 700, 800, 900, 900, 1200, 1300, 1400
            ],
            "status": 0,
        }
    ]

    return (
        <>
            <div>
                <div>
                    <div style={{ height: "200px", backgroundColor: "black" }}></div>
                </div>
                <div>
                    <div style={{ height: "300px", overflow: "auto" }}>
                        {message.map((lot_auction, index) => (
                            <div className='ms-4 me-3'>
                                <div className='d-flex justify-content-center' style={{ fontSize: "13px", fontWeight: "500" }}>
                                    {/* <i className="fa fa-info" aria-hidden="true"></i> */}
                                    <img src='/img/info-circle.svg' className='px-2'></img>
                                    Lot {lot_auction.id} open for bidding
                                </div>
                                {lot_auction.cost_auction.map((cost, index) => (

                                    <div className='d-flex justify-content-between' style={{ fontWeight: "500" }} >

                                        {index == 0 ? (
                                            <div className='d-flex justify-content-between w-100 p-3 border-start position-relative'>
                                                <i className="fa fa-circle position-absolute top-50 start-0 translate-middle" style={{ fontSize: "50%" }} aria-hidden="true"></i>


                                                <div>
                                                    ${cost}

                                                </div>
                                                <div>
                                                    Starting bid
                                                </div>
                                            </div>

                                        ) : index == lot_auction.cost_auction.length - 1 ? (
                                            

                                            <div className='d-flex justify-content-between w-100 p-3 border-start position-relative' style={{zIndex:"1", backgroundColor: "#f4f5f6"}}>
                                                {/* <div style={{backgroundColor: "#f4f5f6", zIndex:"0", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width:"200%", position: "absolute"}} className='position-absolute h-100'></div> */}

                                                <i className="fa fa-circle position-absolute top-50 start-0 translate-middle" style={{ fontSize: "50%", zIndex:"1" }} aria-hidden="true"></i>
                                                <div  style={{zIndex:"1"}}>
                                                    ${cost}

                                                </div>
                                                <div  style={{zIndex:"1"}}>
                                                    Sold!
                                                    <img src='/img/hammer-icon.svg' className='ps-2'></img>
                                                </div>
                                               
                                            </div>


                                        ) : (
                                            <>
                                                {cost > (lot_auction?.cost_auction?.at(index - 1) ?? 0) ? (

                                                    <div className='d-flex justify-content-between w-100 p-3 border-start position-relative'>
                                                        <i className="fa fa-circle position-absolute top-50 start-0 translate-middle" style={{ fontSize: "50%" }} aria-hidden="true"></i>
                                                        <div>
                                                            ${cost}

                                                        </div>
                                                        <div>
                                                            Competing Bid
                                                        </div>
                                                    </div>
                                                ) : (

                                                    <div style={{ color: "#e4002b" }} className='d-flex justify-content-between w-100 p-3 border-start position-relative'>
                                                        <i className="fa fa-circle position-absolute top-50 start-0 translate-middle" style={{ fontSize: "50%" }} aria-hidden="true"></i>
                                                        <div>
                                                            ${cost}

                                                        </div>
                                                        <div className='d-flex align-items-center'>
                                                            Fair Warning!
                                                            <img src='/img/bell-icon.svg' className='ps-2'></img>


                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                    </div>

                                ))}

                                {lot_auction.status == 1 ? (
                                    <div className='d-flex justify-content-center pb-3' style={{ fontSize: "13px", fontWeight: "500" }}>
                                        {/* <i className="fa fa-info" aria-hidden="true"></i> */}
                                        Lot {lot_auction.id} sold
                                    </div>

                                ) : (
                                    <div>

                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
}