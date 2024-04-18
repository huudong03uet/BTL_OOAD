import Auction from '@/models/auction';
import React from 'react'
import dateFormat, { masks } from "dateformat";
import styled from 'styled-components';
const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;
function PromotedAuctions({ obj }: { obj: Auction }) {
    return (
        <div style={{ border: "1px solid #bac4c9" }}>
            <div className="container">
                <div className="row">
                    <div className="col-6 p-0 d-flex justify-content-center">
                        <img src={obj.products?.[0].images?.[0].url} style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "200px" }} />
                    </div>
                    <div className="col-6 ps-0">

                        <div className='my-1 fw-bold'
                            style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
                        >                 {obj.name}
                        </div>
                        {/* <div className="text-truncate"
                            onClick={() => {
                                <StyledLink href={`/auction-house/${obj.seller?.id}`}
                    onClick={(e) => e.stopPropagation()}
                    >by {obj.seller?.name}</StyledLink>
                                direct to auction house
                                
                            }}
                        
                        >
                            by {obj.name}
                        </div> */}

                        <StyledLink href={`/auction-house/${obj.seller?.id}`}
                            onClick={(e) => e.stopPropagation()}
                        >by {obj.seller?.name}</StyledLink>

                        
                        <div className="my-3">
                            {/* {obj.time} */}
                            {dateFormat(obj.time_auction, " mmm dd, yyyy - hh:MM TT")}
                        </div>
                        <button type="button" className="btn btn-danger w-100"
                            onClick={() => {
                                let width = window.screen.width;
                                let height = window.screen.height;
                                let left = 0;
                                let top = 0;

                                let windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
                                window.open('/lived-auction', '_blank', windowFeatures);
                            }}



                        >View Auction</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotedAuctions;