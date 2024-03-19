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
// type SizeType = ConfigProviderProps['componentSize'];
export default function ItemLivedAuction({ obj }: { obj: ItemLivedAuctionInterface }) {

    return (
        <>
            <div className='row'>
                <div className='col-5'>
                    <img src={obj.image} alt={obj.name} style={{ width: "auto", height: "100px", maxWidth: "100%" }}></img>
                </div>
                <div className='col-7'>
                    <div>
                        Lot {obj.id}
                    </div>
                    <div>
                        {obj.name}
                    </div>
                    <div>
                        {obj.status == 0 ? (
                            <div>
                                Sold: ${obj.sold}
                            </div>
                        ) : obj.status == 1 ? (
                            <div>

                            </div>
                        ) : (
                            <div>
                                Current: ${obj.sold}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}