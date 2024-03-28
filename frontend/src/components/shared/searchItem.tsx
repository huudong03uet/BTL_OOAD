'use client'

import ItemSummary from '@/models/item_summary';
import React, { useState } from 'react';

// interface ResSearchItemInterface {
//     image: string;
//     item_name: string;
//     artist: string;
//     status: string;
//     time: string;
//     cost: number;
//     user_id: string;
// }

function ResSearchItem({ searchResults }: { searchResults: ItemSummary[] }) {
    const [status, setStatus] = useState<number>(0);

    return (
        <div>
            {searchResults.map((item: ItemSummary) => (
                <div key={item.id}>
                    {item.status === 'sold' ? (
                        <div className="sold-card">
                            {/* Render sold card */}
                            <img src={item.image_path} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.time}</p>
                            <p>Cost: {item.max_bid}</p>
                        </div>
                    ) : item.status === 'live now' ? (
                        <div className="live-now-card">
                            {/* Render live now card */}
                            <img src={item.image_path} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.time}</p>
                            <p>Cost: {item.max_bid}</p>
                        </div>
                    ) : (
                        <div className="other-status-card">
                            {/* Render other status card */}
                            <img src={item.image_path} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.time}</p>
                            <p>Cost: {item.max_bid}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ResSearchItem;
