import React from 'react'

// 
//         "image": "https://image.invaluable.com/housePhotos/ShowplaceAntiques/29/764929/H20259-L362812913.jpg",
// "time": "Mar 17, 11:00 PM GMT+7",
// "name": "Auctions at",
// "user_sell": "Auctions at",

interface PromotedAuctionsInterface {
    image: string,
    time: string,
    name: string,
    user_sell: string
}

function PromotedAuctions({ obj }: { obj: PromotedAuctionsInterface }) {
    return (
        <div style={{ border: "1px solid #bac4c9" }}>
            <div className="container">
                <div className="row">
                    <div className="col-6 p-2 d-flex justify-content-center">
                        <img src={obj.image} style={{ width: "auto", height: "200px", maxWidth: "100%" }} />
                    </div>
                    <div className="col-6">

                        <div className='my-1 fw-bold'
                            style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                        >                 {obj.name}
                        </div>
                        <div className="text-truncate">
                            by {obj.user_sell}
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