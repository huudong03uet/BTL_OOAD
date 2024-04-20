'use client'

import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import React, { useState } from 'react';
import AppFilter from '@/components/search/AppFilter'
import internal from "stream";
import AppHeader from "@/components/AppHeader";
import AppNav from "@/components/AppNav";
import AppFooter from "@/components/AppFooter";

// interface SearchItem {
//     key: string,
//     itemsCount: number,
//     display: string;
//     categories: Array<string>;
//     artist: string;
//     auctionDate: "All dates" | "Next 7 days" | "Next 30 days" | "Next 60 days";
//     sellers: string;
//     sellerLocation: string;
//     priceRange: {
//         min: number;
//         max: number;
//     };

// }
import {useRouter, useSearchParams} from 'next/navigation';

export default function Search() {

    // const exampleItem: SearchItem = {
    //     key: "exampleKey",
    //     itemsCount: 100,
    //     display: "Example Display",
    //     categories: ["Category1", "Category2"],
    //     artist: "Example Artist",
    //     auctionDate: "Next 7 days",
    //     sellers: "Example Seller",
    //     sellerLocation: "Example Location",
    //     priceRange: {           
    //         min: 100,
    //         max: 200
    //     }
    // };
    const searchParams = useSearchParams();
    // console.log('searchParams123', searchParams.get('searchText'));
    return (
        <>
            <AppHeader />
            <AppNav />

            <AppFilter searchText={searchParams.get('searchText') || ''}></AppFilter>

            <AppFooter />

        </>
    );
}