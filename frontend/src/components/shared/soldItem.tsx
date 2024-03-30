'use client'
import ItemDetail from '@/models/item_detail';
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';


function SoldItem({ obj }: { obj: ItemDetail }) {
    const [status, setStatus] = useState<number>(0);


    return (
        <div >
            <Container>
                <div style={{ minHeight: "250px" }} className='position-relative d-flex align-items-center justify-content-center'>
                    <img src={obj.images[0]} alt={obj.title} className="img-thumbnail border-0"></img>
                </div>
                <div >
                    <div style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                        className='my-1'>
                        {obj.title}
                    </div>
                    <div>
                        by {obj.artist}
                    </div>
                    <div className="fw-bold">
                        ${obj.price}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default SoldItem;