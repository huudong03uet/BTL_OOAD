'use client'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@smastrom/react-rating/style.css'
import { Container, } from "react-bootstrap";
import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from '@/styles/auction_detail/index.module.css';
import AppHeader from '@/components/AppHeader';
import AppNav from '@/components/AppNav'
import AppFooter from '@/components/AppFooter';
import ProductAuction from '@/components/auction-detail/productAuction';
import { useRouter } from 'next/navigation';
import { user_get_auction_info_pk } from '@/services/auction/user';
import { UserContext } from '@/services/context/UserContext';
import Auction from '@/models/auction';


const AuctionDetail = ({ params }: { params: { id: string } }) => {
    const auction_id = Number(params.id);

    const {user} = useContext(UserContext)
    const [statusAuction, setStatusAuction] = useState<'upcoming_ac' | 'ongoing_ac' | 'pass_ac'>('upcoming_ac');
    const router = useRouter();
    // const auctionDetailFake = {
    //     id: 1,
    //     name: "Asian Art including Two Distinguished Collections",
    //     status: "Active",
    //     time_auction: new Date('2022-12-31T00:00:00Z'),
    //     condition_coin: 100,
    //     description: "This is a test auction",
    //     time_register: "2022-01-01T00:00:00Z",
    //     location: {

    //         city: "City",
    //         state: "State",
    //         country: "Country",
    //         zip: "12345"
    //     },
    //     seller: {

    //         id: 1,
    //         name: "Seller 1",
    //         rating: 4.5
    //     },
    //     products: [
    //         {
    //             id: 1,
    //             images: [
    //                 {
    //                     id: 1,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //                 {
    //                     id: 2,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //             ],
    //             title: "Biblia germanica: ",
    //             status: "Active",
    //             numerical_order: 1,
    //             max_bid: 100,
    //             min_estimate: 50,
    //             max_estimate: 150,
    //             description: "This is a test product",
    //             dimensions: "10x10x10",
    //             artist: "Artist 1",
    //             love: 10,
    //             condition_report: "Good",
    //             provenance: "Unknown",
    //             inspection: null,
    //             visibility: "Public",
    //             categories: [
    //                 {
    //                     id: 1,
    //                     title: "Category 1",
    //                 },
    //             ],
    //             seller: {
    //                 id: 1,
    //                 name: "Seller 1",
    //             },
    //             createdAt: "2022-01-01T00:00:00Z",
    //             auction: {
    //                 id: 1,
    //                 name: "Auction 1",
    //                 time_auction: new Date('2022-12-31T00:00:00Z'),
    //             },
    //         },
    //         {
    //             id: 1,
    //             images: [
    //                 {
    //                     id: 1,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //                 {
    //                     id: 2,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //             ],
    //             title: "Product 1",
    //             status: "Active",
    //             numerical_order: 1,
    //             max_bid: 100,
    //             min_estimate: 50,
    //             max_estimate: 150,
    //             description: "This is a test product",
    //             dimensions: "10x10x10",
    //             artist: "Artist 1",
    //             love: 10,
    //             condition_report: "Good",
    //             provenance: "Unknown",
    //             inspection: null,
    //             visibility: "Public",
    //             categories: [
    //                 {
    //                     id: 1,
    //                     title: "Category 1",
    //                 },
    //             ],
    //             seller: {
    //                 id: 1,
    //                 name: "Seller 1",
    //             },
    //             createdAt: "2022-01-01T00:00:00Z",
    //             auction: {
    //                 id: 1,
    //                 name: "Auction 1",
    //                 time_auction: new Date('2022-12-31T00:00:00Z'),
    //             },
    //         },
    //         {
    //             id: 1,
    //             images: [
    //                 {
    //                     id: 1,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //                 {
    //                     id: 2,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //             ],
    //             title: "Product 1",
    //             status: "Active",
    //             numerical_order: 1,
    //             max_bid: 100,
    //             min_estimate: 50,
    //             max_estimate: 150,
    //             description: "This is a test product",
    //             dimensions: "10x10x10",
    //             artist: "Artist 1",
    //             love: 10,
    //             condition_report: "Good",
    //             provenance: "Unknown",
    //             inspection: null,
    //             visibility: "Public",
    //             categories: [
    //                 {
    //                     id: 1,
    //                     title: "Category 1",
    //                 },
    //             ],
    //             seller: {
    //                 id: 1,
    //                 name: "Seller 1",
    //             },
    //             createdAt: "2022-01-01T00:00:00Z",
    //             auction: {
    //                 id: 1,
    //                 name: "Auction 1",
    //                 time_auction: new Date('2022-12-31T00:00:00Z'),
    //             },
    //         },
    //         {
    //             id: 1,
    //             images: [
    //                 {
    //                     id: 1,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //                 {
    //                     id: 2,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //             ],
    //             title: "Product 1",
    //             status: "Active",
    //             numerical_order: 1,
    //             max_bid: 100,
    //             min_estimate: 50,
    //             max_estimate: 150,
    //             description: "This is a test product",
    //             dimensions: "10x10x10",
    //             artist: "Artist 1",
    //             love: 10,
    //             condition_report: "Good",
    //             provenance: "Unknown",
    //             inspection: null,
    //             visibility: "Public",
    //             categories: [
    //                 {
    //                     id: 1,
    //                     title: "Category 1",
    //                 },
    //             ],
    //             seller: {
    //                 id: 1,
    //                 name: "Seller 1",
    //             },
    //             createdAt: "2022-01-01T00:00:00Z",
    //             auction: {
    //                 id: 1,
    //                 name: "Auction 1",
    //                 time_auction: new Date('2022-12-31T00:00:00Z'),
    //             },
    //         },
    //         {
    //             id: 1,
    //             images: [
    //                 {
    //                     id: 1,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //                 {
    //                     id: 2,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //             ],
    //             title: "Product 1",
    //             status: "Active",
    //             numerical_order: 1,
    //             max_bid: 100,
    //             min_estimate: 50,
    //             max_estimate: 150,
    //             description: "This is a test product",
    //             dimensions: "10x10x10",
    //             artist: "Artist 1",
    //             love: 10,
    //             condition_report: "Good",
    //             provenance: "Unknown",
    //             inspection: null,
    //             visibility: "Public",
    //             categories: [
    //                 {
    //                     id: 1,
    //                     title: "Category 1",
    //                 },
    //             ],
    //             seller: {
    //                 id: 1,
    //                 name: "Seller 1",
    //             },
    //             createdAt: "2022-01-01T00:00:00Z",
    //             auction: {
    //                 id: 1,
    //                 name: "Auction 1",
    //                 time_auction: new Date('2022-12-31T00:00:00Z'),
    //             },
    //         },
    //         {
    //             id: 1,
    //             images: [
    //                 {
    //                     id: 1,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //                 {
    //                     id: 2,
    //                     url: "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //                 },
    //             ],
    //             title: "Product 1",
    //             status: "Active",
    //             numerical_order: 1,
    //             max_bid: 100,
    //             min_estimate: 50,
    //             max_estimate: 150,
    //             description: "This is a test product",
    //             dimensions: "10x10x10",
    //             artist: "Artist 1",
    //             love: 10,
    //             condition_report: "Good",
    //             provenance: "Unknown",
    //             inspection: null,
    //             visibility: "Public",
    //             categories: [
    //                 {
    //                     id: 1,
    //                     title: "Category 1",
    //                 },
    //             ],
    //             seller: {
    //                 id: 1,
    //                 name: "Seller 1",
    //             },
    //             createdAt: "2022-01-01T00:00:00Z",
    //             auction: {
    //                 id: 1,
    //                 name: "Auction 1",
    //                 time_auction: new Date('2022-12-31T00:00:00Z'),
    //             },
    //         }
    //     ]
    // };


    // Gán dữ liệu giả cho auctionDetail
    // const auctionDetail = auctionDetailFake
    const [auctionDetail, setAuctionDetail] = useState({} as Auction)

    useEffect(() => {
        const fetch = async () => {
            if (user?.id) {
                let data = await user_get_auction_info_pk(user?.id, auction_id)
                setAuctionDetail(data)
            }
        }

        fetch()
    }, [auction_id, user?.id])

    // useEffect(() => {
    //     const currentTime = new Date();
    //     const auctionTimeStart = new Date(auctionDetail.time_auction);
    //     const auctionTimeEnd = new Date(auctionTimeStart);
    //     auctionTimeEnd.setMinutes(auctionTimeEnd.getMinutes() + auctionDetail.products.length * 10);
    
    
    //     if (currentTime < auctionTimeStart) {
    //         setStatusAuction('upcoming_ac');
    //     } else if (currentTime >= auctionTimeStart && currentTime <= auctionTimeEnd) {
    //         setStatusAuction('ongoing_ac');
    //     } else {
    //         setStatusAuction('pass_ac');
    //     }
    
    //     //fake
    //     setStatusAuction('ongoing_ac');    

    // }, [auctionDetail])


    if (Object.keys(auctionDetail).length === 0) {
        return <></>
    }


    return (
        <>
            <AppHeader />
            <AppNav />
            <Container>
                {auctionDetail && (
                    <div className={` ${styles.ahInformation} ${styles.colMd8}`}>
                        <div className="catalog-header row">
                            <div className="col-md-8 col-lg-8">
                                <div className="mt-2 mb-2">
                                    <span >
                                        {
                                            statusAuction === 'upcoming_ac' ? (
                                                <span className={` ${styles.status}`} style={{ background: 'red' }}>closing now</span>
                                            ) : statusAuction === 'ongoing_ac' ? (
                                                <span className={` ${styles.status}`} style={{ background: 'red' }}>now</span>
                                            ) : statusAuction === 'pass_ac' ? (
                                                <span className={` ${styles.status} `}>auction closed</span>
                                            ) : null
                                        }
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <i className="fa fa-rss" style={{ marginRight: '5px' }}></i>
                                    <span className="">
                                        <span className="localized-date">April  17, 2024 1:00 PM GMT+7</span>
                                    </span> • {auctionDetail?.location?.city}, {auctionDetail?.location?.state}, {auctionDetail?.location?.country} •<a role="button" className={styles.a}>Auction Details</a>
                                </div>
                                <h1 style={{ fontSize: '28px' }}>{auctionDetail.name}</h1>
                                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: '10px' }}>
                                    <div>by <div id="sellerName" onClick={() => {router.push(`/auction-house/${auctionDetail.seller.id}`)}} className={styles.a}>{auctionDetail.seller.name}</div></div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                {
                                    statusAuction == 'upcoming_ac' ? (
                                        <div>
                                            <div className="text-center mb-4 mt-4">
                                                <h3 style={{ fontSize: '20px' }}>Timed items are closing. Bid Now!</h3>
                                            </div>
                                            <div className="text-center mb-4">
                                                <button className={styles.BtnRegister} data-rfa-link="/bidNow/reqForApproval?catalogRef=NNS0JFZHXY" rel="nofollow">Register to Bid</button>
                                            </div>
                                        </div>
                                    ) : statusAuction == 'ongoing_ac' ? (
                                        <div className="mt-5 text-center">
                                            <button className={styles.btnEnterLive} >Enter Live Auction</button>
                                            <a className={styles.a} role="button" data-rfa-link="/bidNow/reqForApproval?catalogRef=N11AFOTREA" rel="nofollow">Register to Bid</a>
                                        </div>
                                    ) : statusAuction == 'pass_ac' ? (
                                        <div className="ended-text" style={{ fontSize: '15px', marginTop: '30px' }}>This auction has passed.</div>
                                    ) : null
                                }
                            </div>

                            <div className="container">

                            </div>
                        </div>
                    </div>
                )}
                <div>
                    {/* CONTEND */}
                    <div className="col-md-8" style={{ width: '100%' }}>
                        <div className="row justify-content-center">
                            <div className={styles.contentContainer}>
                                <span>
                                    <div className="ais-Stats">
                                        <span className="ais-Stats-text">
                                            <h3>{auctionDetail.products.length} items</h3>
                                        </span>
                                    </div>
                                </span>
                                <div className="widget-holder">
                                    <div className="form-group form-tooltip-group form-group-special mb-0 custom-search-box">
                                        <div className="dropdown btn-group false">
                                            <div className={`input-group ${styles.formSearch}`} aria-controls="termsList" aria-expanded="false">
                                                <div className={`input-group-addon`}>
                                                    <i className={`fa fa-search cat-search-icon text-complimentary ${styles.iconSearch}`}></i>
                                                </div>
                                                <input className="search-items form-control" type="searchbox" placeholder="Search by keyword" value="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-holder" style={{ display: 'flex' }}>
                                    <div className="widgets" style={{ display: 'flex', flexDirection: 'row' }}>
                                        <span style={{
                                            padding: '15px',
                                            fontSize: '1rem', 
                                            color: '#6c757d', 
                                        }}>Sort By: </span>
                                        <div className="ais-SortBy">
                                            <select className="ais-SortBy-select" style={{
                                                marginTop:'8px',
                                                padding: '0.375rem 1.75rem 0.375rem 0.75rem', 
                                                fontSize: '1rem', 
                                                lineHeight: '1.5', 
                                                color: '#495057', 
                                                backgroundColor: '#fff', 
                                                border: '1px solid #ced4da',
                                                borderRadius: '0.25rem',
                                            }}>
                                                <option className="ais-SortBy-option" value="price_low_to_high">Price: Low to High</option>
                                                <option className="ais-SortBy-option" value="upcoming_lots_currentBid_desc_prod">Price: High to Low</option>
                                            
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="mobile-toggle-button" style={{ display: 'none' }}>
                                <button className="btn btn-default">
                                    <i className="fa fa-search mob-search-icon" aria-hidden="true"></i>
                                </button>&nbsp;
                                <button className="btn btn-default"> </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4" id="content">
                        <div className="col-md-12 mt-3 text-center">
                            <div
                                className=" text-primary mx-auto my-5"
                                id="spinner"
                                role="status"
                                style={{ display: "block" }}
                            >
                                <Container>
                                    <div className={styles.row} style={{ width: '100%' }}>
                                        {
                                            auctionDetail.products.map((obj, index) => {
                                                return (
                                                    <div  className="col-sm-3"  key={index}>
                                                        <ProductAuction obj={obj}></ProductAuction>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <AppFooter />
        </>
    );
}

export default AuctionDetail;

// function body goes here