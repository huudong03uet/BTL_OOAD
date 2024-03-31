'use client'
import React, { useEffect, useState } from 'react';
import ItemLivedAuction from './itemLivedAuction';
import ItemCurrentLived from './itemCurrentLived';
import SessionAuction from './sessionAuction';
import { LinearProgress } from '@mui/material';
import './style.css';
import { Radio } from 'antd';
import { useRouter } from 'next/navigation'
import ProductDetail from '@/models/product_detail';
import ProductSummary from '@/models/product_summary';
import AuctionDetail from '@/models/auction_detail';
// type SizeType = ConfigProviderProps['componentSize'];
export default function LivedAuction() {

    const infoAuction: AuctionDetail = {
        "auction_room_name": "Key Date Coins Spectacular AM Live Auction 11 pt 1 Day 3",
        "seller_name": "Key Date Coins",
        "number_watching": 84,
        "voting_avg_review": 4.6,
        "number_review": 24,
    }

    const lotsAuction: ProductSummary[] = [
        {
            "status": "0",
            "title": "Royal Mint 1980 gold proof set of 4 coins, compris",
            "id": 1,
            "max_bid": 10,
            "love": 1,
            "estimate_min": 10,
            "image_path": "https://image.invaluable.com/housePhotos/Ewbank/74/767174/H0472-L366354002_mid.jpg",
        },
        {
            "status": "0",
            "title": "A collection of British pre-decimal coins as taken",
            "id": 2,
            "max_bid": 10,
            "love": 1,
            "estimate_min": 10,
            "image_path": "https://image.invaluable.com/housePhotos/Ewbank/74/767174/H0472-L366354000_mid.jpg",
        },
        {
            "status": "1",
            "title": "dang ban rat nhieu la nhieu la nhieu ng ban rat nhieu la nhieu la nhieu ng ban rat nhieu la nhieu la nhieu",
            "id": 3,
            "max_bid": 10,
            "love": 1,
            "estimate_min": 10,
            "image_path": "https://image.invaluable.com/housePhotos/Raffan_Kelaher_and_Thomas/75/765975/H3937-L364405684_mid.jpg",
        },
        {
            "status": "2",
            "title": "Two half sovereigns, one dated 1895, with veiled V",
            "id": 4,
            "max_bid": 10,
            "love": 1,
            "estimate_min": 10,
            "image_path": "https://image.invaluable.com/housePhotos/Ewbank/74/767174/H0472-L366353894_mid.jpg",
        },
        {
            "status": "2",
            "title": "A collection of 14 circulated silver coins and an ",
            "id": 5,
            "max_bid": 10,
            "love": 1,
            "estimate_min": 10,
            "image_path": "https://image.invaluable.com/housePhotos/Ewbank/74/767174/H0472-L366353885_mid.jpg",
        },
        {
            "status": "2",
            "title": "A large official Royal Mint silver medal celebrati",
            "id": 6,
            "max_bid": 10,
            "love": 1,
            "estimate_min": 10,
            "image_path": "https://image.invaluable.com/housePhotos/Ewbank/74/767174/H0472-L366353897_mid.jpg",
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
    const currentAuction: ProductDetail = {
        "id": 1234,
        "images": [
            {
                "id": 1,
                "path": "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731521.jpg",
            },
            {
                "id": 1,
                "path": "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731519.jpg",
            },
            {
                "id": 1,
                "path": "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731520.jpg",
            },
            {
                "id": 1,
                "path": "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731527.jpg",
            },
            {
                "id": 1,
                "path": "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731523.jpg",
            },
            {
                "id": 1,
                "path": "https://image.invaluable.com/housePhotos/loeckx/34/766834/H3359-L365731529.jpg"
            },
        ],
        "title": "Two half sovereigns, one dated 1895, with veiled V",
        "status": "2",
        "count_bid": 10,
        "max_bid": 100,
        "estimate_min": 123,
        "estimate_max": 125,
        "description": "Two half sovereigns, one dated 1895, with veiled V",

        "dimensions": "3x3x4",
        "artist": "Dagoty à Paris (*)",
        "love": 1,
        "condition_report": "chip to foot, chip to lion",

        "provenance": "A rare pair of Empire porcelain vases 'karyatids', by Dagoty à Paris (*)",
    }

    const [size, setSize] = useState<String>('button_1');

    const router = useRouter();

    const clickLogo = () => {
        router.push('/');
    }

    const containerRef = React.useRef(null);

    // const handleViewLotDetailsClick = () => {
    //     if (containerRef.current) {
    //       (containerRef.current as HTMLElement).scrollTop = (containerRef.current as HTMLElement).scrollHeight;
    //     }
    // };

    const handleViewLotDetailsClick = () => {
        if (containerRef.current) {
            const container = containerRef.current as HTMLElement;
            const scrollHeight = container.scrollHeight;
            container.scrollTo({
                top: scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div style={{ height: "100vh", width: "100vw", backgroundColor: "#D1D6DB", overflow: "hidden" }}>

                <div className='row' style={{ height: "50px; !important", backgroundColor: "white" }}>

                    <div className='col-9 px-5 d-flex align-items-center'>
                        <img src="/img/logo.svg" alt="Logo" onClick={clickLogo} style={{ cursor: "pointer" }}></img>
                    </div>
                    <div className='col-3 d-flex align-items-center'>
                        Welcome


                    </div>
                </div>
                <div className='row m-3' style={{ height: "calc(100vh - 150px)" }}>
                    <div className='col-3 ps-0' >
                        <div style={{ backgroundColor: "white" }} >
                            <div className='p-3'>
                                <div style={{ marginBottom: "5px", fontWeight: "500", fontSize: "20px" }}>
                                    {infoAuction.auction_room_name}
                                </div>
                                <div style={{ marginBottom: "0px", fontWeight: "500", fontSize: "16px" }}>
                                    by {infoAuction.seller_name}
                                </div>
                                <div>
                                    <i className="fa fa-star" aria-hidden="true" style={{ color: "#ffc107" }}></i>
                                    {' '}{infoAuction.voting_avg_review}{' '}({infoAuction.number_review})
                                </div>
                                <div className='d-flex align-items-center'>
                                    <LinearProgress color="warning" variant="determinate" value={23} style={{ height: "2px", width: '100%' }} className="me-3" />
                                    <div>
                                        12/23
                                    </div>

                                </div>

                            </div>
                            <div>


                                <div className='border'>
                                    <Radio.Group value={size} onChange={(e) => setSize(e.target.value)} className='row px-3'>
                                        <Radio.Button value="button_1" className={`col-6 d-flex justify-content-center ${size === "button_1" ? "active-radio" : "radio-not-active"}`}>All Lots</Radio.Button>
                                        <Radio.Button value="button_2" className={`col-6 d-flex justify-content-center ${size === "button_2" ? "active-radio" : "radio-not-active"}`}>My items</Radio.Button>
                                    </Radio.Group>
                                </div>

                                <div style={{ overflowY: 'scroll', height: "calc(100vh - 270px)", position: "relative" }}>
                                    {lotsAuction.map((object, index) => (
                                        <div key={index} className='p-3' style={{ backgroundColor: object.status === "1" ? '#FDF3F5' : 'white' }}>
                                            <ItemLivedAuction obj={object} />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='col-9 px-0' style={{ backgroundColor: "white", height: "calc(100vh - 240px)" }}>
                        <div className='row ps-2' style={{ height: "100%" }}>
                            <div ref={containerRef} className='col-7 border' style={{ padding: "24px 24px 16px", overflowY: "scroll", height: "100%" }}>
                                <ItemCurrentLived obj={currentAuction} handleButtonClick={handleViewLotDetailsClick}></ItemCurrentLived>
                            </div>
                            <div className='col-5 border p-0'>
                                <SessionAuction></SessionAuction>
                            </div>
                        </div>
                        <div style={{ height: "170px", backgroundColor: "#F4F5F6" }}>
                            <div className='h-100 px-5 py-3'>
                                <div className='h-50 d-flex justify-content-center align-items-center'>

                                    <div className="border border-secondary h-75 btn btn-light w-100 rounded-pill d-flex justify-content-end align-items-center pe-4" style={{ fontWeight: "500", fontSize: "32px" }}>{nextCostAuction(currentCost)}$</div>
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