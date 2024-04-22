import Auction from '@/models/auction';
import React from 'react'
import dateFormat, { masks } from "dateformat";
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;
function PromotedAuctions({ obj }: { obj: Auction }) {

    const router = useRouter()
    return (
        <div style={{ border: "1px solid #bac4c9" }}>
            <div className="container">
                <div className="row">
                    <div className="col-6 p-0 d-flex justify-content-center">
                        <img src={obj.products?.length > 0 && obj.products[0].images?.length > 0 ? obj.products[0].images[0].url : 'fallbackImageURL'} style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "200px" }} />
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
                            onClick={() => router.push(`/auction-detail/${obj.id}`)}



                        >View Auction</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotedAuctions;