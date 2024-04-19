'use client'
import { info } from 'console';
import React, { useEffect, useState } from 'react';
import SessionAuctionCost from '@/models/session_auction_cost';
import WatchChannel from '@/components/live-stream/watch-channel';
import { user_get_bid_history } from '@/services/auction/user';

interface SessionAuctionProps {
    key: number;
    id: number;
    setLastBid: (bid: number) => void;
}

// type SizeType = ConfigProviderProps['componentSize'];
const SessionAuction: React.FC<SessionAuctionProps> = ({ id, setLastBid }) => {
    // const message: SessionAuctionCost[] = [
    //     {
    //         "id": 1,
    //         "cost_auction": [
    //             600, 600, 700, 700, 800, 900, 900, 1200, 1300, 1400
    //         ],
    //         "status": 1,
    //     },
    //     {
    //         "id": 2,
    //         "cost_auction": [
    //             600, 600, 700, 700, 800, 900, 900, 1200, 1300, 1400
    //         ],
    //         "status": 1,
    //     }
    //     ,
    //     {
    //         "id": 3,
    //         "cost_auction": [
    //             600, 600, 700, 700, 800, 900, 900, 1200, 1300, 1400
    //         ],
    //         "status": 1,
    //     },
    //     {
    //         "id": 4,
    //         "cost_auction": [
    //             600, 600, 700, 700, 800, 900, 900, 1200, 1300, 1400
    //         ],
    //         "status": 0,
    //     }
    // ]


    const [message, setMessage] = useState({} as SessionAuctionCost)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await user_get_bid_history(id);
            setMessage(data)
            setLastBid(data.cost_auction?.[data.cost_auction.length - 1] || 0)
          } catch (error) {
            console.error('Error fetching upcoming online auctions:', error);
          }
        };
    
        fetchData()
      }, [])


    return (
        <>
            <div>
                <div>
                    <div style={{ height: "265px", overflow: "auto" }} className='me-3'>

                        {message && message.cost_auction && message.cost_auction.map((cost, index) => (

                            <div
                                // set key= random number
                                key={Math.random()}


                                className='d-flex justify-content-between' style={{ fontWeight: "500" }} >

                                {index == 0 ? (
                                    <div className='d-flex justify-content-between w-100 px-3 py-2 border-start position-relative'>
                                        <i className="fa fa-circle position-absolute top-50 start-0 translate-middle" style={{ fontSize: "50%" }} aria-hidden="true"></i>


                                        <div>
                                            ${cost}

                                        </div>
                                        <div>
                                            Starting bid
                                        </div>
                                    </div>

                                ) : index == message.cost_auction.length - 1 && message.status == 1? (


                                    <div className='d-flex justify-content-between w-100 px-3 pt-3 pb-2  border-start position-relative' style={{ zIndex: "1", backgroundColor: "#f4f5f6" }}>
                                        {/* <div style={{backgroundColor: "#f4f5f6", zIndex:"0", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width:"200%", position: "absolute"}} className='position-absolute h-100'></div> */}

                                        <i className="fa fa-circle position-absolute top-50 start-0 translate-middle" style={{ fontSize: "50%", zIndex: "1" }} aria-hidden="true"></i>
                                        <div style={{ zIndex: "1" }}>
                                            ${cost}

                                        </div>
                                        <div style={{ zIndex: "1" }}>
                                            Sold!
                                            <img src='/img/hammer-icon.svg' className='ps-2'></img>
                                        </div>

                                    </div>


                                ) : (
                                    <>
                                        {cost > (message?.cost_auction?.at(index - 1) ?? 0) ? (

                                            <div className='d-flex justify-content-between w-100 px-3 pt-3 pb-2 border-start position-relative'>
                                                <i className="fa fa-circle position-absolute top-50 start-0 translate-middle" style={{ fontSize: "50%" }} aria-hidden="true"></i>
                                                <div>
                                                    ${cost}

                                                </div>
                                                <div>
                                                    Competing Bid
                                                </div>
                                            </div>
                                        ) : (

                                            <div style={{ color: "#e4002b" }} className='d-flex justify-content-between w-100 px-3 pt-3 pb-2  border-start position-relative'>
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
                    </div>
                </div>
            </div>
        </>

    );
}


export default SessionAuction;
