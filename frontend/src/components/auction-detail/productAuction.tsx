'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import dateFormat, { masks } from "dateformat";
import { check_user_love_product, user_delete_love_product, user_love_product } from '@/services/component/love_product';
// http://localhost:8080/product/user/detail/product_id=10/user_id=10000
import Product from '@/models/product';


function ProductAuction({ obj }: { obj: Product }) {
    const [status, setStatus] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await check_user_love_product(obj.id);
            if (data) {
                setStatus(true);
            } else {
                setStatus(false); 
            }
          } catch (error) {
            console.error('Error fetching upcoming online auctions:', error);
          }
        };
    
        fetchData()
      }, [])

    let onClickHeart = async () => {
        if (status) {
            setStatus(false);
            await user_delete_love_product(obj.id)
        } else {
            setStatus(true);
            await user_love_product(obj.id)
        }
    }
    return (
        <div>
            <div style={{ height: "250px" }} className='position-relative d-flex align-items-center justify-content-center'>
                {/* <i className="fa fa-heart-o fa-2x" aria-hidden="true"></i> */}
                {status ? (
                    <button onClick={onClickHeart}
                    className='position-absolute rounded-circle p-2 d-flex justify-content-center align-items-center' 
                    style={{ border: "1px solid red", backgroundColor: "white", width: "35px", height: "35px", left: "80%", top: "-0%" }}>

                    <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                </button>
                    

                ) : (
                    <button
                        className='position-absolute  rounded-circle p-2 d-flex justify-content-center align-items-center'
                        style={{ border: "1px solid #797676", backgroundColor: "white", width: "35px", height: "35px", left: "80%", top: "-0%" }}
                        onClick={onClickHeart}>

                        <i className="fa-regular fa-heart" style={{ color: "#797676" }}></i>
                    </button>

                )}
                <img src={obj.images?.[0]?.url ?? 'defaultImageUrl'}  alt={obj.title} style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }} className="img-thumbnail border-0"></img>

            </div>
            {/* <div

            
            > */}
            <Link href={{ pathname: '/item_detail', query: { product_id: obj.id } }}
                style={{ textDecoration: "none", color: "black" }}
            >

                <div>
                    {dateFormat(obj.auction?.time_auction, " mmm dd, yyyy - hh:MM TT")}
                </div>
                <div style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                    className='my-1 fw-bold'>
                    {obj.title}
                </div>
                {/* <div>
                    <StyledLink href={`/auction-house/${obj.seller?.id}`}
                    onClick={(e) => e.stopPropagation()}
                    >by {obj.seller?.name}</StyledLink>
                </div> */}
                <div className="fw-bold">
                    Est: {obj.min_estimate} - {obj.max_estimate}
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

export default ProductAuction;