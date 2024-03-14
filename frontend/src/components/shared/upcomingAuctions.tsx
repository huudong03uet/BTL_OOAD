import React from 'react'

import '@smastrom/react-rating/style.css'
// 
//         "image": "https://image.invaluable.com/housePhotos/ShowplaceAntiques/29/764929/H20259-L362812913.jpg",
// "time": "Mar 17, 11:00 PM GMT+7",
// "name": "Auctions at",
// "user_sell": "Auctions at",
import { Rating, ThinStar } from '@smastrom/react-rating'

// Declare it outside your component so it doesn't get re-created
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#a36b0d',
  inactiveFillColor: '#ffffff',
  itemStrokeWidth: 1 ,
  inactiveStrokeColor:  '#a36b0d',
  activeStrokeColor: '#a36b0d',
}


interface UpcomingAuctionsInterface {
    image: string,
    time: string,
    name: string,
    user_sell: string,
    location: string,
    voting: number,
    comment_number: number,
    image_child: string[],
    status: number,
}

function UpcomingAuctions({ obj }: { obj: UpcomingAuctionsInterface }) {
    return (
        <div style={{ borderTop: "2px solid #440a77" }}>
            <div className="container">
                <div className="row py-4">
                    <div className="col-3 d-flex justify-content-center" style={{ border: "1px solid #bac4c9" }}>
                        <img src={obj.image} style={{ width: "auto", height: "300px", maxWidth: "100%" }} />
                    </div>


                    <div className="col-9">
                        <div className="row">
                            <div className="col-8">

                                <div className='my-1 fw-bold'
                                    style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                                >                 {obj.name}
                                </div>
                                <div className="text-truncate">
                                    by {obj.user_sell}
                                </div>
                                <div className='d-flex'>
                                    <Rating style={{ maxWidth: 100 }} value={obj.voting} readOnly={true} itemStyles={myStyles}/>
                                    {' '} {obj.voting} ({obj.comment_number} Reviews)
                                </div>
                                <div className="my-3">
                                    {obj.time}
                                </div>
                                <div>
                                    {obj.location}
                                </div>
                            </div>


                            <div className="col-4">
                                <p>
                                    <i className='fa fa-feed'>
                                    </i>
                                    {' '}Live Auction

                                </p>
                                {obj.status == 1 ? (
                                    <button type="button" className="btn btn-danger w-100">Enter Live Auction</button>

                                ) : (
                                    <button type="button" className="btn btn-dark w-100">View Items</button>
                                )}
                                <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
                                    Register to bid
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            {obj.image_child && obj.image_child.length > 0 && obj.image_child.map((object, i) => (
                                <div className="col-2 mx-3 px-0 " >
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