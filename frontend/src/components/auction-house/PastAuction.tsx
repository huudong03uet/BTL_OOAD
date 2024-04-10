'use client'

import React from 'react'
import { Container } from 'react-bootstrap';
import styles from '@/styles/auction_house/passAuction.module.css'

interface PastAuctionProps {
    dateString: string;
    title: string;
    location: string;
}

const PastAuction: React.FC<PastAuctionProps> = ({ dateString, title, location }) => {


    // Format thời gian
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const time = `${day}/${month}/${year}`;

    return (
        <>
            <div className={styles.main}>
          
                    <div className={styles.time}>
                        {time}
                    </div>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.location}>
                        {location}
                    </div>
          
            </div>
        </>
    );
}
export default PastAuction;