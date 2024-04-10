'use client'
import UpcomingAuctions from '@/components/shared/upcomingAuctions';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@smastrom/react-rating/style.css'
import { Container, } from "react-bootstrap";
import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/customer/auctionHouse.module.css';
import styles2 from '@/styles/auction_house/soldItem.module.css'
import AppHeader from '@/components/AppHeader';
import AppNav from '@/components/AppNav'
import AppBreadCrumb from '@/components/AppBreadCrumb'
import AppFooter from '@/components/AppFooter';
import Map from '@/components/auction-house/Map';
import Tab from '@/components/auction-house/Tab';
import TabContent from '@/components/auction-house/TabContent';
import AuctionInformation from '@/models/auction_information';
import ItemSummary from '@/models/product_summary';
import SoldItem from '@/components/shared/soldItem';
import User from '@/models/user';
import Comment from '@/components/auction-house/Comment';
import PassAuction from '@/components/auction-house/PastAuction';
import { user_get_auction_upcoming } from '@/services/auction/user';
import { Data } from '@react-google-maps/api';
import { seller_info } from '@/services/account/seller';
import { seller_auction_past_service } from '@/services/auction/seller';
import { seller_product_sold_service } from '@/services/product/seller';
import get_review_service from '@/services/component/review';


interface CommentProps {
    id?: string;
    user: User;
    vote: number;
    comment: string;
    time_create: Date;
}

interface PastAuction {
    date: Date;
    title: string;
    location: string;
}
interface Location {
    x: number;
    y: number;
}
interface AuctionHouseProps {
    auctionHouse_id: number;
    auctionHouse_name: string;
    auctionHouse_createdTime: string;
    auctionHouse_location: Location;
    auctionHouse_vote?: number;
}
const AuctionHouse = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'review' | 'sold' | 'past_ac'>('upcoming');
    const tabContentRefs = {
        upcoming: useRef<HTMLDivElement>(null),
        review: useRef<HTMLDivElement>(null),
        sold: useRef<HTMLDivElement>(null),
        past_ac: useRef<HTMLDivElement>(null),
    };

    const handleTabClick = (tabId: 'upcoming' | 'review' | 'sold' | 'past_ac') => {
        setActiveTab(tabId);
        scrollToTabContent(tabId);
    };

    const scrollToTabContent = (tabId: 'upcoming' | 'review' | 'sold' | 'past_ac') => {
        const tabContentRef = tabContentRefs[tabId].current;
        if (tabContentRef) {
            tabContentRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // data
    // const auctionHouse = {
    //     auctionHouse_id: 1,
    //     auctionHouse_name: "Auction House Name",
    //     auctionHouse_createdTime: new Date("2022-01-01"),
    //     auctionHouse_location: { x: 21.037562478546963, y: 105.78229869782993 },
    //     auctionHouse_vote: 4.5,
    // };
    const [auctionHouse, setAuctionHouse] = useState<{
        auctionHouse_id: number,
        auctionHouse_name: string,
        auctionHouse_createdTime: string,
        auctionHouse_location: { "x": number, "y": number },
        auctionHouse_vote: number,
    } | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_info();
                setAuctionHouse(data);
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

    // const review = [
    //     {
    //         id: '123',
    //         user: {
    //             user_id: 1,
    //             email: 'example@example.com',
    //             first_name: 'John',
    //             last_name: 'Doe',
    //             user_name: 'john_doe',
    //             coin: 100,
    //             phone: '123456789',
    //             location_id: 123,
    //         },
    //         vote: 4.5,
    //         comment: 'This is a great product!',
    //         time_create: new Date('2024-03-30T08:00:00Z'),
    //     },
    //     {
    //         id: '123',
    //         user: {
    //             user_id: 1,
    //             email: 'example@example.com',
    //             first_name: 'Linh',
    //             last_name: 'Nguyen',
    //             user_name: 'john_doe',
    //             coin: 100,
    //             phone: '123456789',
    //             location_id: 123,
    //         },
    //         vote: 3.5,
    //         comment: 'This is a great product!',
    //         time_create: new Date('2024-03-30T08:00:00Z'),
    //     },
    //     {
    //         id: '123',
    //         user: {
    //             user_id: 1,
    //             email: 'example@example.com',
    //             first_name: 'Đạt',
    //             last_name: 'Đạt',
    //             user_name: 'john_doe',
    //             coin: 100,
    //             phone: '123456789',
    //             location_id: 123,
    //         },
    //         vote: 1.5,
    //         comment: 'This is a great product!',
    //         time_create: new Date('2024-03-30T08:00:00Z'),
    //     },
    //     {
    //         id: '123',
    //         user: {
    //             user_id: 1,
    //             email: 'example@example.com',
    //             first_name: 'Khang',
    //             last_name: 'Là tôi',
    //             user_name: 'toi_la_khang',
    //             coin: 100,
    //             phone: '123456789',
    //             location_id: 123,
    //         },
    //         vote: 1.5,
    //         comment: 'This is a great product!',
    //         time_create: new Date('2024-03-30T08:00:00Z'),
    //     }, {
    //         id: '123',
    //         user: {
    //             user_id: 1,
    //             email: 'example@example.com',
    //             first_name: 'Hiền',
    //             last_name: 'Nguyễn',
    //             user_name: 'Hiền',
    //             coin: 100,
    //             phone: '123456789',
    //             location_id: 123,
    //         },
    //         vote: 4.5,
    //         comment: 'This is a great product!',
    //         time_create: new Date('2024-03-30T08:00:00Z'),
    //     },
    //     {
    //         id: '123',
    //         user: {
    //             user_id: 1,
    //             email: 'example@example.com',
    //             first_name: 'Đồng',
    //             last_name: 'Đồng',
    //             user_name: 'Đồng',
    //             coin: 100,
    //             phone: '123456789',
    //             location_id: 123,
    //         },
    //         vote: 3.5,
    //         comment: 'This is a great product!',
    //         time_create: new Date('2024-03-30T08:00:00Z'),
    //     }
    // ]

    const [review, setReview] = useState<{
        id: number,
        user: {
            user_id: number,
            email: string,
            first_name: string,
            last_name: string,
            user_name: string,
            coin: number,
            phone: string,
            location_id: number,
        },
        vote: number,
        comment: string,
        time_create: string,
    }[] | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_review_service();
                setReview(data);
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

    const [upcomingAuctions, setUpcomingAuctions] = useState<AuctionInformation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await user_get_auction_upcoming();
                setUpcomingAuctions(data);
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])
    // const upcomingAuctions = [
    //     {

    //         "image_path": "https://image.invaluable.com/housePhotos/ShowplaceAntiques/29/764929/H20259-L362812913.jpg",
    //         "time": "Mar 17, 11:00 PM GMT+7",
    //         "auction_room_name": "Prints, Multiples & Works on Paper",
    //         "seller_name": "Auctions at",
    //         "address": "Zurich, Switzerland",
    //         "voting_avg_review": 4.5,
    //         "number_review": 44,
    //         images: [
    //             "https://image.invaluable.com/housePhotos/schuler/81/766081/H0928-L364614319_mid.jpg",
    //             "https://image.invaluable.com/housePhotos/schuler/81/766081/H0928-L364614319_mid.jpg",
    //             "https://image.invaluable.com/housePhotos/schuler/81/766081/H0928-L364614319_mid.jpg",
    //             "https://image.invaluable.com/housePhotos/schuler/81/766081/H0928-L364614319_mid.jpg",
    //             "https://image.invaluable.com/housePhotos/schuler/34/766134/H0928-L364617627_mid.jpg"
    //         ]
    //         , status: "1",

    //     }
    // ]
    // const soldAuctions = [
    //     {
    //         "image_path": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "title": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
    //         "price": 1000,
    //         "user_sell": "testtt",
    //         id: 1000,

    //     },
    //     {
    //         "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "title": "John Nieto, Corn Dancers, ca. 1989",
    //         "price": 1000,
    //         "user_sell": "testtt",
    //         id: 1100,

    //     },
    //     {
    //         "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "title": "Luis Jimenez, American Dream, 1972",
    //         "price": 4000,
    //         "user_sell": "testtt",
    //         id: 1200,
    //     }
    // ]
    // const pastAuctions = [
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     {
    //         date: new Date("2021-12-01"),
    //         title: "Past Auction 1",
    //         location: "Location 3"
    //     },
    //     // Add more past auctions if needed
    // ]


    const [soldAuctions, setSoldAuctions] = useState<{
        "image_path": string,
        "time": string,
        "title": string,
        "price": number,
        "user_sell": string,
        id: number,
    }[] | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_product_sold_service();
                setSoldAuctions(data);
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])



    const [pastAuctions, setPastAuctions] = useState<{
        date: string,
        title: string,
        location: string,
    }[] | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_auction_past_service();
                setPastAuctions(data);
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

    // auctionHouse = auctionHouse;
    // const YOUR_API_KEY = 'AIzaSyCcTwD5Ct7hXkxHRrs8kcyaw1lvAedFEGs';

    return (
        <>
            <AppHeader />
            <AppNav />
            <AppBreadCrumb />
            <Container>
                <div>
                    {auctionHouse && (
                        <div className={` ${styles.ahInformation} ${styles.colMd8}`}>
                            <div className={styles.ahBioContainer}>
                                <h1 className={styles.ahName}>
                                    {auctionHouse.auctionHouse_name}
                                </h1>
                                <p className={styles.ahTime}>
                                    Invalua Seller since {auctionHouse && auctionHouse.auctionHouse_createdTime}
                                </p>
                                <div className={styles.voteContainer}>
                                    <div className={styles.yotpoStars}>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                        <span className={styles.spanReview}>{auctionHouse && auctionHouse.auctionHouse_vote}</span>
                                        <span className={styles.spanReview}>from {review && review.length} Reviews</span>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.ahContactContainer}>
                                <div className={styles.locationMap}>
                                    <Map location={auctionHouse && auctionHouse.auctionHouse_location}></Map>

                                </div>
                                <div className={styles.button}>
                                    <button type="button" className={`btn btn-primary btn-lg btn-block ${styles['btn-follow']} ${styles['button-style']}`}>+ Follow This Seller</button>
                                    <button type="button" className={`btn btn-primary btn-lg btn-block ${styles['btn-contact']} ${styles['button-style']}`}>Contact</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <Container>
                            <div className={styles.tabs}>
                                <Tab
                                    id="upcoming"
                                    title="Upcoming Auctions"
                                    active={activeTab === 'upcoming'}
                                    onClick={() => handleTabClick('upcoming')}
                                />
                                <Tab
                                    id="review"
                                    title="Buyer Reviews"
                                    active={activeTab === 'review'}
                                    onClick={() => handleTabClick('review')}
                                />
                                <Tab
                                    id="past_ac"
                                    title="Past Auctions"
                                    active={activeTab === 'past_ac'}
                                    onClick={() => handleTabClick('past_ac')}
                                />
                            </div>
                        </Container>

                        <div>
                            <TabContent id="upcoming" active={activeTab === 'upcoming'} ref={tabContentRefs.upcoming}>
                                {/* Nội dung của tab upcoming */}
                                <div className={styles2.header_section}>Upcoming Auctions from {auctionHouse && auctionHouse.auctionHouse_name} ({upcomingAuctions?.length})</div>
                                <div className='py-3'>
                                    <Container>
                                        {upcomingAuctions && Array.isArray(upcomingAuctions) && upcomingAuctions.length > 0 ? (
                                            upcomingAuctions.map((obj, index) => (
                                                <div className="row" key={index}>
                                                    <UpcomingAuctions obj={obj} />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="row">
                                                <div className="col">
                                                    No upcoming auctions found.
                                                </div>
                                            </div>
                                        )}
                                    </Container>
                                </div>
                            </TabContent>

                            <TabContent id="review" active={activeTab === 'review'} ref={tabContentRefs.review}>
                                {/* Nội dung của tab review */}
                                <div className={styles2.header_section}>Reviews ({review?.length})</div>
                                <div className='py-3'>
                                    <Container>
                                        {review && review.length > 0 && review.map((obj, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <Comment user={obj.user} vote={obj.vote} comment={obj.comment} dateString={obj.time_create}></Comment>
                                                </div>
                                            );
                                        })}

                                    </Container>
                                </div>

                            </TabContent>

                            <TabContent id="sold" active={activeTab === 'sold'} ref={tabContentRefs.sold}>
                                {/* Nội dung của tab sold */}
                                <div className={styles2.header_section}>Notable Past Lots Sold at Auction</div>
                                <div className='py-3'>
                                    <Container>
                                        <div className="row">
                                            {soldAuctions && soldAuctions.map((obj, index) => (
                                                <div className="col-sm-3" key={index}>
                                                    <SoldItem obj={obj} />
                                                </div>
                                            ))}
                                        </div>
                                    </Container>
                                </div>

                            </TabContent>

                            <TabContent id="past_ac" active={activeTab === 'past_ac'} ref={tabContentRefs.past_ac}>
                                {/* Nội dung của tab past_ac */}
                                <div className={styles2.header_section}>Past Auctions from {auctionHouse && auctionHouse.auctionHouse_name}</div>
                                <div >
                                    <Container>
                                        <div>
                                            {pastAuctions && pastAuctions.map((obj, index) => {
                                                return (
                                                    <PassAuction dateString={obj.date} title={obj.title} location={obj.location}></PassAuction>
                                                );
                                            })}
                                        </div>
                                    </Container>
                                </div>
                            </TabContent>
                        </div>

                        <style jsx>{`
                        .tabs {
                        margin-bottom: 20px;
                        }
                        .tabcontent {
                        display: none;
                        }
                        .active {
                        display: block;
                        }
                    `}</style>
                    </div>

                </div>
            </Container>
            <AppFooter />
        </>
    );
}

export default AuctionHouse;