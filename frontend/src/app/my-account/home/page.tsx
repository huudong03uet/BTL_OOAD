'use client'
import { Container, } from "react-bootstrap";
import style from '../style.module.css';
import React, { useEffect, useState } from 'react';
import UpcomingAuctions from "@/components/shared/upcomingAuctions";
import ViewItem from "@/components/shared/viewItem";
import UserDataService from "@/services/model/user";
import { user_get_auction_upcoming } from "@/services/auction/user";
import get_artist_recommend_service from "@/services/component/artist";
import AuctionSummary from "@/models/auction_summary";
import { user_get_recently_product } from "@/services/product/user";


export default function MyInvaluable() {
    const user_name = UserDataService.getUserData()?.user_name;
    const [recentlyViewedItems, setRecentlyViewedItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await user_get_recently_product();
                if (Array.isArray(data)) {
                    setRecentlyViewedItems(data);
                } else {
                    setRecentlyViewedItems([])
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        }

        fetchData()
    }, [])
    // const recentlyViewedItems: any[] = [
    //     {
    //         "image": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "name": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
    //         "cost": 1000,


    //     },
    //     {
    //         "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "name": "John Nieto, Corn Dancers, ca. 1989",
    //         "cost": 1000,


    //     },
    //     {
    //         "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
    //         "time": "Jan 1, 8:00 AM GMT+7",
    //         "name": "Luis Jimenez, American Dream, 1972",
    //         "cost": 4000,

    //     },

    // ];

    const [upcomingOnlineAuctions, setUpcomingOnlineAuctions] = useState<AuctionSummary[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await user_get_auction_upcoming();
                if (Array.isArray(data)) {
                    setUpcomingOnlineAuctions(data);
                } else {
                    setUpcomingOnlineAuctions([])
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        }

        fetchData()
    }, [])

    const [exploreRecommendedArtists, setExploreRecommendedArtists] = useState<{ name: string; image: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_artist_recommend_service();
                if (Array.isArray(data)) {
                    setExploreRecommendedArtists(data);
                } else {
                    setExploreRecommendedArtists([])
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        }

        fetchData()
    }, [])


    // const exploreRecommendedArtists = [
    //     {
    //         'name': 'Andy Warhol',
    //         'image': 'https://image.invaluable.com/housePhotos/whiteknight/22/617422/H21019-L133600799.jpg',

    //     },
    //     {
    //         'name': 'Andy Warhol',
    //         'image': 'https://image.invaluable.com/housePhotos/888Auctions/26/626026/H4602-L144500860.jpg',

    //     }
    //     ,
    //     {
    //         'name': 'Andy Warhol',
    //         'image': 'https://image.invaluable.com/housePhotos/888Auctions/26/626026/H4602-L144500852.jpg',

    //     },
    //     {
    //         'name': 'Andy Warhol',
    //         'image': 'https://image.invaluable.com/housePhotos/Expertizezcom/71/625271/H19606-L143520478.jpg',

    //     }
    // ]



    return (
        <div className='row mx-0'>
            {/* <div className="col-2">
                <SideBarMyAccount />
            </div> */}
            {/* <div className="col-10 px-5"> */}
            <div className={style.div_title}>
                Welcome, {user_name}
            </div>



            <div className={style.div_section}>
                <div className={style.div_header_section}>
                    Lots Recommended For You
                </div>
                <div className="row">

                </div>

            </div>

            <div className={style.div_section}>
                <div className={style.div_header_section}>
                    Explore Recommended Artists
                </div>
                <div className="row">
                    {exploreRecommendedArtists.map((object, i) => (
                        <div className="col-sm-3" key={i}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                <style>
                                    {`
                        .rounded-circle-container {
                            width: 100%;
                            padding-top: 100%; 
                            position: relative;
                        }

                        .rounded-circle {
                            border-radius: 50%;
                            object-fit: cover;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                        }
                    `}
                                </style>
                                <div className="rounded-circle-container">
                                    <img src={object.image} alt={object.name} className="img-thumbnail rounded-circle" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div className={style.div_section}>
                <div className={style.div_header_section}>
                    Auctions You May Like
                </div>
                <Container>
                    {upcomingOnlineAuctions.map((object, i) => (
                        <div className="row">
                            <UpcomingAuctions obj={object} />
                        </div>
                    ))}
                </Container>
            </div>


            <div className={style.div_section}>
                <div className={style.div_header_section}>
                    Recently Viewed Items
                </div>
                <Container>
                    <div className="row">
                        {recentlyViewedItems.map((object, i) => (
                            <div className="col-sm-3" key={i}>
                                <ViewItem obj={object} />
                            </div>
                        ))}
                    </div>

                </Container>
            </div>
        </div>
        // </div >
    );
}