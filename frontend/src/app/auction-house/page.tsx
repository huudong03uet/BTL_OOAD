'use client'
import PromotedAuctions from '@/components/shared/promotedAuctions';
import UpcomingAuctions from '@/components/shared/upcomingAuctions';
import ViewItem from '@/components/shared/viewItem';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@smastrom/react-rating/style.css'
import styles1 from '@/app/(home)/page.module.css';
import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import Head from 'next/head';
import React, { useState, useRef } from 'react';
import styles from '@/styles/customer/auctionHouse.module.css';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import Map from '@/components/auction-house/Map';
import Tab from '@/components/auction-house/Tab';
import TabContent from '@/components/auction-house/TabContent';
import AuctionInformation from '@/models/auction_information';
import ItemDetail from '@/models/item_detail';
import SoldItem from '@/components/shared/soldItem';


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
    auctionHouse_review?: string[];
    auctionHouse_upcomingAuctions?: AuctionInformation[];
    auctionHouse_soldAuctions?: ItemDetail[];
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
        auctionHouse_review: ["Review 1", "Review 2", "Review 3"],
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
                id: 1,
                images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
                title: 'Example Item 1',
                status: 'Available',
                count_bid: 10,
                max_bid: 1000,
                estimate_min: 500,
                estimate_max: 1000,
                price: 1500,
                description: 'This is an example item description.',
                dimensions: '10cm x 20cm',
                artist: 'Example Artist 1',
                love: 50,
                condition_report: 'Excellent condition',
                provenance: 'Example provenance information',
            },
            {
                id: 2,
                images: ['image4.jpg', 'image5.jpg', 'image6.jpg'],
                title: 'Example Item 2',
                status: 'Sold',
                count_bid: 5,
                max_bid: 2000,
                estimate_min: 1000,
                estimate_max: 2000,
                price: 1800,
                description: 'This is another example item description.',
                dimensions: '15cm x 25cm',
                artist: 'Example Artist 2',
                love: 70,
                condition_report: 'Good condition',
                provenance: 'Another example provenance information',
            },
        ],
        auctionHouse_pastAuctions: [
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
            <div className={styles.mainContainer}>
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
                        <button type="button" className={`btn btn-primary btn-lg btn-block ${styles['btn-follow']} ${styles['button-style']}`}>+ Follow This Seller</button>
                        <button type="button" className={`btn btn-primary btn-lg btn-block ${styles['btn-contact']} ${styles['button-style']}`}>Contact</button>
                    </div>
                </div>

                <div>
                    <div className="tabs">
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

                    <div>
                        <TabContent id="upcoming" active={activeTab === 'upcoming'} ref={tabContentRefs.upcoming}>
                            {/* Nội dung của tab upcoming */}
                            <h1>Upcoming Auctions from {auctionHouse.auctionHouse_name} ({auctionHouse.auctionHouse_upcomingAuctions?.length})</h1>
                            {auctionHouse.auctionHouse_upcomingAuctions && auctionHouse.auctionHouse_upcomingAuctions.map((obj, index) => (
                                <UpcomingAuctions key={index} obj={obj} />
                            ))}
                        </TabContent>

                        <TabContent id="review" active={activeTab === 'review'} ref={tabContentRefs.review}>
                            {/* Nội dung của tab review */}
                            <h1>Nội dung của tab review</h1>
                            <div>Upcoming Auctions from TS Collectibles (0)</div>
                            <div>This house has no upcoming auctions. Follow this seller to get notified when new sales are added.</div>
                            <div>View all upcoming auctions on Invaluable</div>
                        </TabContent>

                        <TabContent id="sold" active={activeTab === 'sold'} ref={tabContentRefs.sold}>
                            {/* Nội dung của tab sold */}
                            <h1>Notable Past Lots Sold at Auction</h1>
                            {auctionHouse.auctionHouse_soldAuctions && auctionHouse.auctionHouse_soldAuctions.map((obj, index) => (
                                <SoldItem key={index} obj={obj}></SoldItem>
                            ))}
                        </TabContent>

                        <TabContent id="past_ac" active={activeTab === 'past_ac'} ref={tabContentRefs.past_ac}>
                            {/* Nội dung của tab past_ac */}
                            <h1>Past Auctions from {auctionHouse.auctionHouse_name}</h1>
                            Nội dung của tab past_ac
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
            <AppFooter />
        </>
    );
}

export default AuctionHouse;