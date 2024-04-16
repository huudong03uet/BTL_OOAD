'use client'
import ItemSummary from '@/models/product_summary';
import Link from 'next/link';
import React, { useState } from 'react'
import dateFormat, { masks } from "dateformat";
// http://localhost:8080/product/user/detail/product_id=10/user_id=10000


function ViewItem({ obj }: { obj: ItemSummary }) {
    const [status, setStatus] = useState<number>(0);

    function onClickHeart() {
        setStatus(status === 0 ? 1 : 0);
    }
    return (
        <div>
            <div style={{ height: "250px" }} className='position-relative d-flex align-items-center justify-content-center'>
                {/* <i className="fa fa-heart-o fa-2x" aria-hidden="true"></i> */}
                {status == 0 ? (
                    <button
                        className='position-absolute  rounded-circle p-2 d-flex justify-content-center align-items-center'
                        style={{ border: "1px solid #797676", backgroundColor: "white", width: "35px", height: "35px", right: "5%", top: "-3%" }}
                        onClick={onClickHeart}>

                        <i className="fa-regular fa-heart" style={{ color: "#797676" }}></i>
                    </button>

                ) : (
                    <button onClick={onClickHeart}
                        className='position-absolute rounded-circle p-2 d-flex justify-content-center align-items-center' style={{ border: "1px solid red", backgroundColor: "white", width: "35px", height: "35px", right: "5%", top: "-3%" }}>

                        <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                    </button>

                )}
                <img src={obj.image_path} alt={obj.title} style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }} className="img-thumbnail border-0"></img>

            </div>
            {/* <div

            
            > */}
            <Link href={{ pathname: '/item_detail', query: { product_id: obj.id } }}
                style={{ textDecoration: "none", color: "black" }}
            >

                <div>
                    {dateFormat(obj.time, " mmm dd, yyyy - hh:MM TT")}
                </div>
                <div style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                    className='my-1 fw-bold'>
                    {obj.title}
                </div>
                <div>
                    <Link href={`/auction-house/${obj.seller_id}`}>by {obj.user_sell}</Link>
                </div>
                <div className="fw-bold">
                    {/* ${obj.max_bid} */}
                    ${
                        obj.min_estimate == null ? obj.max_bid : obj.min_estimate
                    }


                    {/* min  */}
                </div>
            </Link>
        </div >
    );
}

export default ViewItem;