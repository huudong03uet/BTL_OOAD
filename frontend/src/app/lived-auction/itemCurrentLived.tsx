'use client'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Carousel } from 'react-bootstrap';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
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
export default function ItemLivedAuction({ obj, handleButtonClick }: { obj: ItemCurrentLivedInterface , handleButtonClick: any}) {

    const nextIcon = <ArrowForwardIosOutlinedIcon style={{ color: "black" }} />;
    const prevIcon = <ArrowBackIosOutlinedIcon style={{ color: "black" }} />
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };


    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <>
            <div>
                <div className='d-flex' style={{ fontWeight: "500", marginBottom: "5px", fontSize: "14px" }}>
                    <p className='text-danger' style={{ marginRight: '5px' }}>Live Now</p>Lot {obj.id}
                </div>
                <div>
                    {obj.name}
                </div>
                <div>
                    <Carousel activeIndex={index} onSelect={handleSelect} nextIcon={nextIcon} prevIcon={prevIcon}>

                        {obj.image_child.map((image_child_obj, index) => (
                            <Carousel.Item key={index}>
                                <div className='bg-white w-100 h-100 d-flex justify-content-center align-items-center'>
                                    <img src={image_child_obj} style={{ maxHeight: "300px", width: "auto" }}></img>

                                </div>

                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div style={{ fontWeight: "400", fontSize: "16px" }} className="mt-3">
                    Estimate: ${obj.estimate_begin} - ${obj.estimate_end}
                </div>
                <div className="d-flex justify-content-center m-2">
                    <Button variant="outline-dark d-flex align-items-center rounded-pill" onClick={handleButtonClick}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                        <div className='px-3'>
                            View Lot Details
                        </div>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Button>
                </div>
                <div className="p-0">
                    <Accordion

                        expanded={expanded}
                        onChange={handleExpansion}
                        slots={{ transition: Fade as AccordionSlots['transition'] }}
                        slotProps={{ transition: { timeout: 400 } }}
                        sx={{
                            '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                            '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography style={{ fontSize: "20px" }}>Overview</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {obj.over_view}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography style={{ fontSize: "20px" }}>Payment and Shipping</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Payment
                                Accepted forms of payment: MasterCard, Visa, Wire Transfer
                                Shipping
                                Please contact the auction house regarding shipping.
                                Cost might vary depend on your location.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </>

    );
}