'use client'
import { info } from 'console';
import React, { useState } from 'react';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';
interface ItemLivedAuctionInterface {
    "status": number,
    "name": string,
    "id": number,
    "sold": number,
    "love": number,
    "image": string,
    "start_sell": number,
}

enum StatusItemAuction {
    SOLD = 0, CURRENT = 1, UP_COMING = 2,
}
// type SizeType = ConfigProviderProps['componentSize'];
export default function ItemLivedAuction({ obj }: { obj: ItemLivedAuctionInterface }) {

    return (
        <>
            <div className='row'>
                <div className='col-5 px-2'>
                    <div style={{ backgroundColor: "#dde0e4", position: "absolute", color: "#28292a", fontSize: "14px" }}>
                        {obj.status == StatusItemAuction.SOLD ? (
                            <div style={{margin: "3px 7px"}}>
                        Sold
                    </div>
                    ) : obj.status == StatusItemAuction.CURRENT ? (
                    <div style={{  backgroundColor: "#e4002b", color: 'white', fontWeight: "500", padding: "3px 7px" }}>
                        Live Now
                    </div>
                    ) : (
                    <div style={{margin: "3px 7px" }}>
                        Lot away
                    </div>
                    )}
                </div>

                        <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
                            <img src={obj.image} alt={obj.name} style={{ width: "auto", height: "100px", maxWidth: "100%" }}></img>

                        </div>

            </div>
            <div className='col-7 px-2'>
                <span style={{ fontWeight: "500", fontSize: "12px", marginBottom: "8px" }}>
                    Lot {obj.id}
                </span>
                {/* <div className="text-uppercase">
                        {obj.name}
                    </div> */}
                <div className='my-1 text-uppercase'
                    style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                >                 {obj.name}</div>
                <div style={{ fontWeight: 500, fontSize: "14px" }}>
                    {obj.status == StatusItemAuction.SOLD ? (
                        <div>
                            Sold: ${obj.sold}
                        </div>
                    ) : obj.status == StatusItemAuction.CURRENT ? (
                        <div>

                        </div>
                    ) : (
                        <div>
                            Current: ${obj.sold}
                        </div>
                    )}
                </div>
            </div>
        </div >
        </>

    );
}