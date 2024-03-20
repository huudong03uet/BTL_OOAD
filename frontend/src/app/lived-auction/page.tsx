'use client'
import { info } from 'console';
import React, { useState } from 'react';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';
import ItemLivedAuction from './itemLivedAuction';
import ItemCurrentLived from './itemCurrentLived';
import SessionAuction from './sessionAuction';
import { LinearProgress } from '@mui/material';
// type SizeType = ConfigProviderProps['componentSize'];
export default function LivedAuction() {

    const infoAuction = {
        "name": "Key Date Coins Spectacular AM Live Auction 11 pt 1 Day 3",
        "user_sell": "Key Date Coins",
        "number_watching": 84,
        "voting": 4.6,
        "number_voting": 24,


    }

    const lotsAuction = [
        {
            "status": 0,
            "name": "da ban",
            "id": 1234,
            "sold": 10,
            "love": 1,
            "start_sell": 10,
            "image": "https://image.invaluable.com/housePhotos/Raffan_Kelaher_and_Thomas/75/765975/H3937-L364405684_mid.jpg",
        },
        {
            "status": 0,
            "name": "da ban",
            "id": 1234,
            "sold": 10,
            "love": 1,
            "start_sell": 10,
            "image": "https://image.invaluable.com/housePhotos/Raffan_Kelaher_and_Thomas/75/765975/H3937-L364405684_mid.jpg",
        },
        {
            "status": 1,
            "name": "dang ban",
            "id": 1234,
            "sold": 10,
            "love": 1,
            "start_sell": 10,
            "image": "https://image.invaluable.com/housePhotos/Raffan_Kelaher_and_Thomas/75/765975/H3937-L364405684_mid.jpg",
        },
        {
            "status": 2,
            "name": "da ban",
            "id": 1234,
            "sold": 10,
            "love": 1,
            "start_sell": 10,
            "image": "https://image.invaluable.com/housePhotos/Raffan_Kelaher_and_Thomas/75/765975/H3937-L364405684_mid.jpg",
        },
        {
            "status": 2,
            "name": "da ban",
            "id": 1234,
            "sold": 10,
            "love": 1,
            "start_sell": 10,
            "image": "https://image.invaluable.com/housePhotos/Raffan_Kelaher_and_Thomas/75/765975/H3937-L364405684_mid.jpg",
        },
        {
            "status": 2,
            "name": "da ban",
            "id": 1234,
            "sold": 10,
            "love": 1,
            "start_sell": 10,
            "image": "https://image.invaluable.com/housePhotos/Raffan_Kelaher_and_Thomas/75/765975/H3937-L364405684_mid.jpg",
        }
    ]
    function nextCostAuction(currentCost: number) {
        if (currentCost < 200) {
            return currentCost + 10;
        } else if (currentCost < 500) {
            return currentCost + 20;
        } else if (currentCost < 1000) {
            return currentCost + 50;
        } else if (currentCost < 2000) {
            return currentCost + 100;
        } else if (currentCost < 5000) {
            return currentCost + 200;
        } else if (currentCost < 10000) {
            return currentCost + 500;
        } else if (currentCost < 20000) {
            return currentCost + 1000;
        } else if (currentCost < 50000) {
            return currentCost + 2000;
        } else if (currentCost < 100000) {
            return currentCost + 5000;
        } else if (currentCost < 200000) {
            return currentCost + 10000;
        } else if (currentCost < 500000) {
            return currentCost + 20000;
        } else {
            return currentCost + 50;
        }
    }


    const currentCost = 100;
    const currentAuction = {
        "status": 2,
        "name": "da ban",
        "id": 1234,
        "sold": 10,
        "love": 1,
        "start_sell": 10,
        "image": "https://image.invaluable.com/housePhotos/Raffan_Kelaher_and_Thomas/75/765975/H3937-L364405684_mid.jpg",
        "estimate_begin": 123,
        "estimate_end": 125,
        "image_child": [
            "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731521.jpg",
            "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731519.jpg",
            "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731520.jpg",
            "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731527.jpg",
            "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731523.jpg",
            "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731529.jpg"
        ],
        "over_view": "A rare pair of Empire porcelain vases 'karyatids', by Dagoty à Paris (*)",
        "condition_report": "chip to foot, chip to lion",
    }

    const [size, setSize] = useState<String>('button_1');
    return (
        <>
            <div style={{ height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#D1D6DB" }}>

                <div className='row' style={{ height: "50px; !important", backgroundColor: "white" }}>

                    <div className='col-9 px-5'>
                        <img src="/img/logo.svg" alt="Logo"></img>
                    </div>
                    <div className='col-3'>
                        Welcome
                    </div>
                </div>
                <div className='row m-3' style={{ height: "calc(100% - 50px)" }}>
                    <div className='col-3 ps-0' >
                        <div style={{ backgroundColor: "white" }} >
                            <div className='p-3'>
                                <div style={{ marginBottom: "5px", fontWeight: "500", fontSize: "20px" }}>
                                    {infoAuction.name}
                                </div>
                                <div style={{ marginBottom: "0px", fontWeight: "500", fontSize: "16px" }}>
                                    by {infoAuction.user_sell}
                                </div>
                                <div>
                                    <i className="fa fa-star" aria-hidden="true" style={{ color: "#ffc107" }}></i>
                                    {' '}{infoAuction.voting}{' '}({infoAuction.number_voting})
                                </div>
                                <div className='d-flex align-items-center'>
                                    <LinearProgress color="warning" variant="determinate" value={23} style={{height: "2px", width:'100%'}} className="me-3"/> 
                                    <div>
                                        12/23
                                    </div>
                                
                                </div>

                            </div>
                            <div>
                                <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                                    <Radio.Button value="button_1">All Lots</Radio.Button>
                                    <Radio.Button value="button_2">My items</Radio.Button>
                                </Radio.Group>
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {lotsAuction.map((object, i) => (
                                        <div>
                                            <ItemLivedAuction obj={object} />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='col-9 px-0' style={{ backgroundColor: "white" }}>
                        <div className='row ps-2' style={{ height: "calc(100% - 200px)" }}>
                            <div className='col-7' style={{padding: "24px 24px 16px;"}} >
                                <ItemCurrentLived obj={currentAuction}></ItemCurrentLived>
                            </div>
                            <div className='col-5'>
                                <SessionAuction></SessionAuction>
                            </div>
                        </div>
                        <div style={{ height: "200px", backgroundColor: "#F4F5F6" }}>
                            <div className='h-100 px-5 pt-3 pb-5'>
                                <div className='h-50 d-flex justify-content-center align-items-center'>
                                    {/* <div className='w-100 h-100 d-flex justify-content-center align-items-center'> */}

                                    <div className="border border-secondary h-75 btn btn-light w-100 rounded-pill d-flex justify-content-end align-items-center pe-4" style={{ fontWeight: "500", fontSize: "32px" }}>{nextCostAuction(currentCost)}$</div>
                                    {/* </div> */}
                                </div >
                                <div className='h-50 d-flex justify-content-center align-items-center'>
                                    <button type="button" className="btn btn-dark w-100 h-75 rounded-pill" style={{ fontWeight: "500", fontSize: "20px" }}>Register to Bid</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>

    );
}