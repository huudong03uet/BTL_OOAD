'use client'
import { info } from 'console';
import React, { useState } from 'react';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { Carousel } from 'react-bootstrap';
import { image } from '@nextui-org/react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
interface ItemCurrentLivedInterface {
    "status": number,
    "name": string,
    "id": number,
    "sold": number,
    "love": number,
    "image": string,
    "start_sell": number,
    "estimate_begin": number,
    "estimate_end": number,
    "image_child": string[],
    "over_view": string,
    "condition_report": string,

}
// type SizeType = ConfigProviderProps['componentSize'];
export default function ItemLivedAuction({ obj }: { obj: ItemCurrentLivedInterface }) {
    
    const nextIcon = <ArrowForwardIosOutlinedIcon style={{color: "black"}}/>;
    const prevIcon = <ArrowBackIosOutlinedIcon style={{color: "black"}}/>
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <div>
                <div className='d-flex' style={{fontWeight: "500", marginBottom: "5px", fontSize: "14px"}}>
                <p className='text-danger' style={{ marginRight: '5px' }}>Live Now</p>Lot {obj.id}
                </div>
                <div>
                    {obj.name}
                </div>
                <div>
                    <Carousel activeIndex={index} onSelect={handleSelect} nextIcon={nextIcon} prevIcon={prevIcon}>

                        {obj.image_child.map((image_child_obj, index) => (
                            <Carousel.Item >
                                <div className='bg-white w-100 h-100 d-flex justify-content-center align-items-center'>
                                    <img src={image_child_obj} style={{ maxHeight: "300px", width: "auto" }}></img>

                                </div>

                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div>
                    Estimate: ${obj.estimate_begin} - ${obj.estimate_end}
                </div>
            </div>
        </>

    );
}