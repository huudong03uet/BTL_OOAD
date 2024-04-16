'use client'
import ItemSummary from '@/models/product_summary';
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import styles from '@/styles/auction_house/soldItem.module.css'

function SoldItem({ obj }: { obj: ItemSummary }) {
    const [status, setStatus] = useState<number>(0);

    function onClickHeart() {
        setStatus(status === 0 ? 1 : 0);
    }
    return (
        <div>
            <div style={{ minHeight: "200px" }} className='position-relative d-flex align-items-center justify-content-center'>
                <button
                    className='position-absolute p-2 d-flex justify-content-center align-items-center'
                    style={{ border: "1px solid #797676", backgroundColor: "gray", width: "35px", height: "35px", left: "5%", top: "-3%", borderRadius: "8px" }}>
                    <span className={styles.span}>Sold</span>
                </button>
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
                <img src={obj.image_path} alt={obj.title} className="img-thumbnail border-0"></img>

            </div>
            <div >
                <div>
                    {obj.time}
                </div>
                <div style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                    className='my-1'>
                    {obj.title}
                </div>
                <div>
                    <Link to={`/auction-house/${obj.seller_id}`}>by {obj.user_sell}</Link>
                </div>
                <div className="fw-bold">
                    ${obj.price}
                </div>
            </div>

        </div>
    );
}

export default SoldItem;