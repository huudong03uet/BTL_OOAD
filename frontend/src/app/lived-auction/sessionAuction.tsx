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
                    <div style={{height: "300px", overflow: "auto"}}>
                        {message.map((lot_auction, index) => (
                            <div>
                                <div>
                                    <i className="fa fa-info" aria-hidden="true"></i>
                                    Lot {lot_auction.id} open for bidding
                                </div>
                                {lot_auction.cost_auction.map((cost, index) => (
                                    <div className='d-flex'>
                                        ${cost}
                                        {index == 0 ? (
                                            <div>
                                                Starting bid
                                            </div>
                                        ) : index == lot_auction.cost_auction.length - 1 ? (

                                            <div>
                                                Sold!

                                            </div>


                                        ) : (
                                            <div>
                                                {cost > (lot_auction?.cost_auction?.at(index - 1) ?? 0) ? (
                                                    <div>
                                                        Competing Bid
                                                    </div>
                                                ) : (
                                                    <div>
                                                        Fair Warning!

                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    </div>
                                ))}

                                {lot_auction.status == 1 ? (
                                    <div>
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