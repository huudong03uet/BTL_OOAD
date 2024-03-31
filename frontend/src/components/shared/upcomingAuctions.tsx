import React from 'react'

import '@smastrom/react-rating/style.css'
import { Rating, ThinStar } from '@smastrom/react-rating'
import AuctionDetail from '@/models/auction_detail';

// Declare it outside your component so it doesn't get re-created
const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#a36b0d',
    inactiveFillColor: '#ffffff',
    itemStrokeWidth: 1,
    inactiveStrokeColor: '#a36b0d',
    activeStrokeColor: '#a36b0d',
}

enum StatusAuction {
    EventOrganizing = "0",
    UpcomingEvent = "1",
    EventOrganized = "2",

}



function openLivedAuction() {
    let width = window.screen.width - 100;
    let height = window.screen.height - 200;
    let left = 50;
    let top = 50;

    let windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
    window.open('/lived-auction', '_blank', windowFeatures);
}

function UpcomingAuctions({ obj }: { obj: AuctionDetail }) {
    return (
        <div style={{ borderTop: "2px solid #440a77" }}>
            <div className="container">
                <div className="row py-4">
                    <div className="col-3 d-flex justify-content-center align-items-center" style={{ border: "1px solid #bac4c9" }}>
                        <img src={obj.image_path} style={{ width: "auto", height: "300px", maxWidth: "100%" }} />
                    </div>


                    <div className="col-9">
                        <div className="row">
                            <div className="col-8">

                                <div className='my-1 fw-bold'
                                    style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                                >                 {obj.auction_room_name}
                                </div>
                                <div className="text-truncate">
                                    by {obj.seller_name}
                                </div>
                                <div className='d-flex'>
                                    <Rating style={{ maxWidth: 100 }} value={obj.voting_avg_review} readOnly={true} itemStyles={myStyles} />
                                    {' '} {obj.voting_avg_review} ({obj.number_review} Reviews)
                                </div>
                                <div className="my-3">
                                    {obj.time}
                                </div>
                                <div>
                                    {obj.address}
                                </div>
                            </div>


                            <div className="col-4">
                                <p>
                                    <i className='fa fa-feed'>
                                    </i>
                                    {' '}Live Auction
                                </p>




                                {obj.status == StatusAuction.EventOrganizing ? (
                                    <button type="button" className="btn btn-danger w-100">
                                        <div onClick={openLivedAuction}>
                                            Enter Lived Auction
                                        </div>


                                    </button>

                                ) : (
                                    <button type="button" className="btn btn-dark w-100">View Items</button>

                                )}
                                <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
                                    Register to bid
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            {obj.images && obj.images.length > 0 && obj.images.map((object, i) => (
                                <div className="col-2 mx-2 px-0 " key={i}>
                                    <img src={object} style={{ width: "100%", height: "auto", maxWidth: "100%" }} className='position-relative top-50 start-50 translate-middle' />
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default UpcomingAuctions;