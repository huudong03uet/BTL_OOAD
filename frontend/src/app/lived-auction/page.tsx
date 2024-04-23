'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import ItemLivedAuction from './itemLivedAuction';
import ItemCurrentLived from './itemCurrentLived';
import SessionAuction from './sessionAuction';
import { LinearProgress } from '@mui/material';
import './style.css';
import { Radio } from 'antd';
import { useRouter } from 'next/navigation'
import Product from '@/models/product';
import { user_get_detail_product } from '@/services/product/user';
import { user_add_bid, user_get_auction_info } from '@/services/auction/user';
import Auction from '@/models/auction';
import WatchChannel from '@/components/live-stream/watch-channel';
import { UserContext } from '@/services/context/UserContext';

export default function LivedAuction() {
    const { user, setUser } = useContext(UserContext);

    const [infoAuction, setInfoAuction] = useState({} as Auction);
    const [lotsAuction, setLotsAuction] = useState<Product[]>([]);
    const [selectedLotId, setSelectedLotId] = useState<number>(1);
    const [lastBid, setLastBid] = useState<number>(0);
    const [currentAuction, setCurrentAuction] = useState({} as Product)

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const data = await user_get_auction_info(4, user?.id);
                setInfoAuction(data.infoAuction);
                if (Array.isArray(data.lotsAuction)) {
                    setLotsAuction(data.lotsAuction);
                    //  if there is a list of lots, set the selected lot to the first one
                    setSelectedLotId(data.lotsAuction[0].id);
                    setCurrentAuction(data.lotsAuction[0]);
                    setLastBid(data.lotsAuction[0].cost_auction?.[data.lotsAuction[0].cost_auction.length - 1] || 0);
                } else {
                    setLotsAuction([])
                }
            } catch (error) {
                console.error("Error fetching item data:", error);
            }
        };

        fetchItemData();
    }, [user]);

    

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const data = await user_get_detail_product(1, user?.id);
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

    function getSlugChannel() {
        return "exampleSlug"
    }

    const handleLotClick = async (productId: number) => {
        try {
            const data = await user_get_detail_product(productId, user?.id);
            setCurrentAuction(data);
            setSelectedLotId(productId);
        } catch (error) {
            console.error("Error fetching item data:", error);
        }
    };

 
    const ws = useRef<WebSocket | null>(null);
    const lastData = useRef("0");
    


    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8000');
    
        ws.current.addEventListener('open', () => {
            console.log('Connected to WebSocket server');
            // Gửi dữ liệu ở đây
        });
    
        ws.current.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
    
            console.log(data)
            // console.log("123231421", JSON.stringify(data));
            if (data.event === 'update_bid') {
                callChildFunction();

                // console.log("abc");
                // handleLotClick(selectedLotId)
                // lastData.current = JSON.stringify(data);
                // reload 

            }
        });
    
        ws.current.addEventListener('error', (error) => {
            console.error('WebSocket Error:', error);
        });
    
        return () => {
            ws.current?.close();
        };
    }, []);
    
    const Register2Bid = async () => {
        console.log(selectedLotId)
        await user_add_bid(selectedLotId, lastBid + 1, 1)
        setLastBid(lastBid + 1);
        
    }
    const childRef = useRef<any>();

    const callChildFunction = () => {
        childRef.current?.someFunction();
    };

    return (
        <>
            <div style={{ height: "100vh", width: "100vw", backgroundColor: "#D1D6DB", overflow: "hidden" }}>

                <div className='row py-2' style={{ height: "50px; !important", backgroundColor: "white" }}>

                    <div className='col-9 px-5 d-flex align-items-center'>
                        <img src="/logo.png" alt="Logo" height={50} onClick={clickLogo} style={{ cursor: "pointer" }}></img>
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
                                    {infoAuction.name}
                                </div>
                                <div style={{ marginBottom: "0px", fontWeight: "500", fontSize: "16px" }}>
                                    by {infoAuction.seller?.name}
                                </div>
                                <div>
                                    <i className="fa fa-star" aria-hidden="true" style={{ color: "#ffc107" }}></i>

                                    {/* {
                    infoAuction && infoAuction.seller && infoAuction.seller.reviews && {
                        <>
                            {' '}({infoAuction.seller.reviews.length > 0 && infoAuction.seller.reviews.reduce((a, b) => a + b.rating, 0) / infoAuction.seller.reviews.length || 0}) 
                            {' '}({infoAuction.seller.reviews.length} reviews)
                        </>

    )
} */}


                                    {
                                        infoAuction.seller?.reviews && infoAuction.seller.reviews.length > 0 && infoAuction.seller.reviews.reduce((a, b) => a + b.rating, 0) / infoAuction.seller.reviews.length || 0
                                    }
                                    {' '}({infoAuction.seller?.reviews?.length || 0} reviews)
                                </div>

                                {/* <div className='d-flex align-items-center'>
                                    <LinearProgress color="warning" variant="determinate" value={23} style={{ height: "2px", width: '100%' }} className="me-3" />
                                    <div>
                                        12/23
                                    </div>

                                </div> */}

                            </div>
                            <div>


                                <div className='border'>
                                    <Radio.Group value={size} onChange={(e) => setSize(e.target.value)} className='row px-3'>
                                        <Radio.Button value="button_1" className={`col-12 d-flex justify-content-center ${size === "button_1" ? "active-radio" : "radio-not-active"}`}>All Lots</Radio.Button>
                                        {/* <Radio.Button value="button_2" className={`col-6 d-flex justify-content-center ${size === "button_2" ? "active-radio" : "radio-not-active"}`}>My items</Radio.Button> */}
                                    </Radio.Group>
                                </div>

                                <div style={{ overflowY: 'scroll', height: "calc(100vh - 270px)", position: "relative" }}>
                                    {lotsAuction.map((object, index) => (
                                        <div key={index} className='p-3' style={{ backgroundColor: object.status === "1" ? '#FDF3F5' : 'white' }}>
                                            <ItemLivedAuction obj={object} onClick={() => handleLotClick(object.id)} />
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
                            {/* <div className='col-5 border p-0'>
                                <SessionAuction></SessionAuction>
                            </div> */}
                            <div className='col-5 border p-0'>
                                <div>
                                    <div style={{ height: "230px" }}>
                                        <WatchChannel slug={getSlugChannel()} />
                                    </div>
                                </div>
                                <SessionAuction  key={selectedLotId} id={selectedLotId} lastBid={lastBid} setLastBid={setLastBid}/>
                            </div>
                        </div>
                        <div style={{ height: "170px", backgroundColor: "#F4F5F6" }}>
                            <div className='h-100 px-5 py-3'>
                                <div className='h-50 d-flex justify-content-center align-items-center'>

                                    <div className="border border-secondary h-75 btn btn-light w-100 rounded-pill d-flex justify-content-end align-items-center pe-4" style={{ fontWeight: "500", fontSize: "32px" }}>{lastBid + 1}$</div>
                                </div >
                                <div className='h-50 d-flex justify-content-center align-items-center'>
                                    <button type="button" onClick={Register2Bid} className="btn btn-dark w-100 h-75 rounded-pill" style={{ fontWeight: "500", fontSize: "20px" }}>Bid product</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>

    );
}