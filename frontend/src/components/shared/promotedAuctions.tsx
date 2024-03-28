import AuctionSummary from '@/models/auction_summary';
import React from 'react'

function PromotedAuctions({ obj }: { obj: AuctionSummary }) {
    return (
        <div style={{ border: "1px solid #bac4c9" }}>
            <div className="container">
                <div className="row">
                    <div className="col-6 p-2 d-flex justify-content-center">
                        <img src={obj.image_path} style={{ width: "auto", height: "200px", maxWidth: "100%" }} />
                    </div>
                    <div className="col-6">

                        <div className='my-1 fw-bold'
                            style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                        >                 {obj.title}
                        </div>
                        <div className="text-truncate">
                            by {obj.seller_name}
                        </div>
                        <div className="my-3">
                            {obj.time}
                        </div>
                        <button type="button" className="btn btn-danger w-100">View Items</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotedAuctions;