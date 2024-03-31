'use client'
import UpcomingAuctions from '@/components/shared/upcomingAuctions';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@smastrom/react-rating/style.css'
import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import React, { useState, useRef } from 'react';
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
import ItemSummary from '@/models/item_summary';
import SoldItem from '@/components/shared/soldItem';
import User from '@/models/user';
import Comment from '@/components/auction-house/Comment';
import PassAuction from '@/components/auction-house/PastAuction';
import { object } from 'zod';


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
    auctionHouse_createdTime: Date;
    auctionHouse_location: Location;
    auctionHouse_vote?: number;
    auctionHouse_review?: CommentProps[];
    auctionHouse_upcomingAuctions?: AuctionInformation[];
    auctionHouse_soldAuctions?: ItemSummary[];
    auctionHouse_pastAuctions?: PastAuction[];
}
const AuctionHouse = (auctionHouse: AuctionHouseProps) => {
    const createdTime = new Date(auctionHouse.auctionHouse_createdTime);
    const ahCreateTime = createdTime.getFullYear();

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

    //fake data
    const auctionHouseFake = {
        auctionHouse_id: 1,
        auctionHouse_name: "Auction House Name",
        auctionHouse_createdTime: new Date("2022-01-01"),
        auctionHouse_location: { x: 21.037562478546963, y: 105.78229869782993 },
        auctionHouse_vote: 4.5,
        auctionHouse_review: [{
            id: '123',
            user: {
                user_id: 1,
                email: 'example@example.com',
                first_name: 'John',
                last_name: 'Doe',
                user_name: 'john_doe',
                coin: 100,
                phone: '123456789',
                location_id: 123,
            },
            vote: 4.5,
            comment: 'This is a great product!',
            time_create: new Date('2024-03-30T08:00:00Z'),
        },
        {
            id: '123',
            user: {
                user_id: 1,
                email: 'example@example.com',
                first_name: 'Linh',
                last_name: 'Nguyen',
                user_name: 'john_doe',
                coin: 100,
                phone: '123456789',
                location_id: 123,
            },
            vote: 3.5,
            comment: 'This is a great product!',
            time_create: new Date('2024-03-30T08:00:00Z'),
        },
        {
            id: '123',
            user: {
                user_id: 1,
                email: 'example@example.com',
                first_name: 'Đạt',
                last_name: 'Đạt',
                user_name: 'john_doe',
                coin: 100,
                phone: '123456789',
                location_id: 123,
            },
            vote: 1.5,
            comment: 'This is a great product!',
            time_create: new Date('2024-03-30T08:00:00Z'),
        },
        {
            id: '123',
            user: {
                user_id: 1,
                email: 'example@example.com',
                first_name: 'Khang',
                last_name: 'Là tôi',
                user_name: 'toi_la_khang',
                coin: 100,
                phone: '123456789',
                location_id: 123,
            },
            vote: 1.5,
            comment: 'This is a great product!',
            time_create: new Date('2024-03-30T08:00:00Z'),
        },{
            id: '123',
            user: {
                user_id: 1,
                email: 'example@example.com',
                first_name: 'Hiền',
                last_name: 'Nguyễn',
                user_name: 'Hiền',
                coin: 100,
                phone: '123456789',
                location_id: 123,
            },
            vote: 4.5,
            comment: 'This is a great product!',
            time_create: new Date('2024-03-30T08:00:00Z'),
        },
        {
            id: '123',
            user: {
                user_id: 1,
                email: 'example@example.com',
                first_name: 'Đồng',
                last_name: 'Đồng',
                user_name: 'Đồng',
                coin: 100,
                phone: '123456789',
                location_id: 123,
            },
            vote: 3.5,
            comment: 'This is a great product!',
            time_create: new Date('2024-03-30T08:00:00Z'),
        },],
        auctionHouse_upcomingAuctions: [
            {

                "image_path": "https://image.invaluable.com/housePhotos/ShowplaceAntiques/29/764929/H20259-L362812913.jpg",
                "time": "Mar 17, 11:00 PM GMT+7",
                "auction_room_name": "Prints, Multiples & Works on Paper",
                "seller_name": "Auctions at",
                "address": "Zurich, Switzerland",
                "voting_avg_review": 4.5,
                "number_review": 44,
                images: [
                    "https://image.invaluable.com/housePhotos/schuler/81/766081/H0928-L364614319_mid.jpg",
                    "https://image.invaluable.com/housePhotos/schuler/81/766081/H0928-L364614319_mid.jpg",
                    "https://image.invaluable.com/housePhotos/schuler/81/766081/H0928-L364614319_mid.jpg",
                    "https://image.invaluable.com/housePhotos/schuler/81/766081/H0928-L364614319_mid.jpg",
                    "https://image.invaluable.com/housePhotos/schuler/34/766134/H0928-L364617627_mid.jpg"
                ]
                , status: "1",

            }
            // Add more upcoming auctions if needed
        ],
        auctionHouse_soldAuctions: [
            {
                "image_path": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
                "time": "Jan 1, 8:00 AM GMT+7",
                "title": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
                "price": 1000,
                "user_sell": "testtt",
                id: 1000,

            },
            {
                "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
                "time": "Jan 1, 8:00 AM GMT+7",
                "title": "John Nieto, Corn Dancers, ca. 1989",
                "price": 1000,
                "user_sell": "testtt",
                id: 1100,

            },
            {
                "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
                "time": "Jan 1, 8:00 AM GMT+7",
                "title": "Luis Jimenez, American Dream, 1972",
                "price": 4000,
                "user_sell": "testtt",
                id: 1200,
            }
        ],
        auctionHouse_pastAuctions: [
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            {
                date: new Date("2021-12-01"),
                title: "Past Auction 1",
                location: "Location 3"
            },
            // Add more past auctions if needed
        ]
    };

    auctionHouse = auctionHouseFake;
    const YOUR_API_KEY = 'AIzaSyCcTwD5Ct7hXkxHRrs8kcyaw1lvAedFEGs';

    return (
        <>
            <AppHeader />
            <AppNav />
            <AppBreadCrumb />
            <Container>
                <div>
                    <div className={` ${styles.ahInformation} ${styles.colMd8}`}>
                        <div className={styles.ahBioContainer}>
                            <h1 className={styles.ahName}>
                                {auctionHouse.auctionHouse_name}
                            </h1>
                            <p className={styles.ahTime}>
                                Invalua Seller since {ahCreateTime}
                            </p>
                            <div className={styles.voteContainer}>
                                <div className={styles.yotpoStars}>
                                    <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                    <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                    <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                    <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                    <span className={`${styles.yellowIcon} fas fa-star`}></span>
                                    <span className={styles.spanReview}>{auctionHouse && auctionHouse.auctionHouse_vote}</span>
                                    <span className={styles.spanReview}>from {auctionHouse && auctionHouse.auctionHouse_review && auctionHouse.auctionHouse_review.length} Reviews</span>
                                </div>
                            </div>

                        </div>
                        <div className={styles.ahContactContainer}>
                            <div className={styles.locationMap}>
                                <Map location={auctionHouse.auctionHouse_location}></Map>

                            </div>
                            <div className={styles.button}>
                                <button type="button" className={`btn btn-primary btn-lg btn-block ${styles['btn-follow']} ${styles['button-style']}`}>+ Follow This Seller</button>
                                <button type="button" className={`btn btn-primary btn-lg btn-block ${styles['btn-contact']} ${styles['button-style']}`}>Contact</button>
                            </div>
                        </div>
                    </div>
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
                                <div className={styles2.header_section}>Upcoming Auctions from {auctionHouse.auctionHouse_name} ({auctionHouse.auctionHouse_upcomingAuctions?.length})</div>
                                <div className='py-3'>
                                    <Container>
                                        {auctionHouse.auctionHouse_upcomingAuctions && auctionHouse.auctionHouse_upcomingAuctions.map((obj, index) => (
                                            <div className="row" key={index}>
                                                <UpcomingAuctions obj={obj} />
                                            </div>
                                        ))}
                                    </Container>
                                </div>
                            </TabContent>

                            <TabContent id="review" active={activeTab === 'review'} ref={tabContentRefs.review}>
                                {/* Nội dung của tab review */}
                                <div className={styles2.header_section}>Reviews ({auctionHouse.auctionHouse_review?.length})</div>
                                <div className='py-3'>
                                    <Container>
                                        {auctionHouse.auctionHouse_review && auctionHouse.auctionHouse_review.length > 0 && auctionHouse.auctionHouse_review.map((obj, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <Comment user={obj.user} vote={obj.vote} comment={obj.comment} time_create={obj.time_create}></Comment>
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
                                            {auctionHouse.auctionHouse_soldAuctions && auctionHouse.auctionHouse_soldAuctions.map((obj, index) => (
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
                                <div className={styles2.header_section}>Past Auctions from {auctionHouse.auctionHouse_name}</div>
                                <div >
                                    <Container>
                                        <div>
                                            {auctionHouse.auctionHouse_pastAuctions && auctionHouse.auctionHouse_pastAuctions.map((obj, index) => {
                                                return (
                                                    <PassAuction date={obj.date} title={obj.title} location={obj.location}></PassAuction>
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