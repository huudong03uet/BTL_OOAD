'use client'
import PromotedAuctions from '@/components/shared/promotedAuctions';
import UpcomingAuctions from '@/components/shared/upcomingAuctions';
import ViewItem from '@/components/shared/viewItem';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import Head from 'next/head';
import styles from '@/styles/customer/auctionHouse.module.css';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import Map from '@/components/auction-house/Map';

interface UpcomingAuction {
    id: number;
    image: string;
    time: string;
    name: string;
    max_est: number;
    min_est: number;
    user_sell: string;
    location: string;
    voting: number;
    comment_number: number;
    image_child: string[];
    status: number;
    type: number;
}

interface SoldAuction {
    id: number;
    image: string;
    time: string;
    name: string;
    max_est: number;
    min_est: number;
    price: number;
    user_sell: string;
    location: string;
    voting: number;
    comment_number: number;
    image_child: string[];
    status: number;
    type: number;
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
    auctionHouse_review?: string[];
    auctionHouse_upcomingAuctions?: UpcomingAuction[];
    auctionHouse_soldAuctions?: SoldAuction[];
    auctionHouse_pastAuctions?: PastAuction[];
}
const AuctionHouse = (auctionHouse: AuctionHouseProps) => {
    const createdTime = new Date(auctionHouse.auctionHouse_createdTime);
    const ahCreateTime = createdTime.getFullYear();

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
                id: 1,
                image: "url_to_image",
                time: "2022-04-01 10:00:00",
                name: "Upcoming Auction 1",
                max_est: 1000,
                min_est: 500,
                user_sell: "Seller 1",
                location: "Location 1",
                voting: 4.8,
                comment_number: 10,
                image_child: ["url_to_image_1", "url_to_image_2"],
                status: 1,
                type: 1
            },
            // Add more upcoming auctions if needed
        ],
        auctionHouse_soldAuctions: [
            {
                id: 1,
                image: "url_to_image",
                time: "2022-03-01 10:00:00",
                name: "Sold Auction 1",
                max_est: 800,
                min_est: 400,
                price: 900,
                user_sell: "Seller 2",
                location: "Location 2",
                voting: 4.7,
                comment_number: 8,
                image_child: ["url_to_image_1", "url_to_image_2"],
                status: 2,
                type: 2
            },
            // Add more sold auctions if needed
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

            </div>
            <AppFooter />
        </>
    );
}

export default AuctionHouse;