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
import ItemSummary from '@/models/product_summary';
import { user_get_detail_product } from '@/services/product/user';
import { user_get_auction_info } from '@/services/auction/user';
import AuctionSummary from '@/models/auction_summary';

export default function LivedAuction() {

    const [infoAuction, setInfoAuction] = useState({} as AuctionSummary);
    const [lotsAuction, setLotsAuction] = useState<ItemSummary[]>([]);

    useEffect(() => {
        const fetchItemData = async () => {
          try {
            const data = await user_get_auction_info(1);
            setInfoAuction(data.infoAuction);
            if (Array.isArray(data.lotsAuction)) {
                setLotsAuction(data.lotsAuction);
            } else {
                setLotsAuction([])
            }
          } catch (error) {
            console.error("Error fetching item data:", error);
          }
        };
    
        fetchItemData();
      }, []);

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

    const [currentAuction, setCurrentAuction] = useState({} as ProductDetail)

    useEffect(() => {
        const fetchItemData = async () => {
          try {
            const data = await user_get_detail_product(1);
            setCurrentAuction(data);
          } catch (error) {
            console.error("Error fetching item data:", error);
          }
        };
    
        fetchItemData();
      }, []);

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

    const handleLotClick = async (productId: number) => {
        try {
            const data = await user_get_detail_product(productId);
            setCurrentAuction(data);
        } catch (error) {
            console.error("Error fetching item data:", error);
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
                                            <ItemLivedAuction obj={object} onClick={() => handleLotClick(object.id)}/>
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