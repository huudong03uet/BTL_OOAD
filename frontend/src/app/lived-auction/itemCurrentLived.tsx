'use client'
import { info } from 'console';
import React, { useState } from 'react';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { Carousel } from 'react-bootstrap';
import { image } from '@nextui-org/react';
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
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <div>
                <div>
                    Live Now Lot {obj.id}
                </div>
                <div>
                    {obj.name}
                </div>
                <div>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        
                        {obj.image_child.map((image_child_obj, index) => (
                            <Carousel.Item>
                            <img src={image_child_obj} style={{maxHeight: "400px", width: "auto"}}></img>

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