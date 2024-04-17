'use client'

import Product from '@/models/product';
import React, { useState } from 'react';

function ResSearchItem({ searchResults }: { searchResults: Product[] }) {
    const [status, setStatus] = useState<number>(0);

    return (
        <div>
            {searchResults.map((item: Product) => (
                <div key={item.id}>
                    {item.status === 'sold' ? (
                        <div className="sold-card">
                            {/* Render sold card */}
                            <img src={item.images[0].url} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.auction.time_auction.toString()}</p>
                            <p>Cost: {item.max_bid}</p>
                        </div>
                    ) : item.status === 'live now' ? (
                        <div className="live-now-card">
                            {/* Render live now card */}
                            <img src={item.images[0].url} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.auction.time_auction.toString()}</p>
                            <p>Cost: {item.max_bid}</p>
                        </div>
                    ) : (
                        <div className="other-status-card">
                            {/* Render other status card */}
                            <img src={item.images[0].url} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.auction.time_auction.toString()}</p>
                            <p>Cost: {item.max_bid}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ResSearchItem;
