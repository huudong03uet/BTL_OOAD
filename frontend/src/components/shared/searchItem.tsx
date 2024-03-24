'use client'

import React, { useState } from 'react';

interface ResSearchItemInterface {
    image: string;
    item_name: string;
    artist: string;
    status: string;
    time: string;
    cost: number;
    user_id: string;
}

function ResSearchItem({ searchResults }: { searchResults: ResSearchItemInterface[] }) {
    const [status, setStatus] = useState<number>(0);

    return (
        <div>
            {searchResults.map((item: ResSearchItemInterface) => (
                <div key={item.user_id}>
                    {item.status === 'sold' ? (
                        <div className="sold-card">
                            {/* Render sold card */}
                            <img src={item.image} alt={item.item_name} />
                            <h2>{item.item_name}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.time}</p>
                            <p>Cost: {item.cost}</p>
                        </div>
                    ) : item.status === 'live now' ? (
                        <div className="live-now-card">
                            {/* Render live now card */}
                            <img src={item.image} alt={item.item_name} />
                            <h2>{item.item_name}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.time}</p>
                            <p>Cost: {item.cost}</p>
                        </div>
                    ) : (
                        <div className="other-status-card">
                            {/* Render other status card */}
                            <img src={item.image} alt={item.item_name} />
                            <h2>{item.item_name}</h2>
                            <p>Artist: {item.artist}</p>
                            <p>Status: {item.status}</p>
                            <p>Time: {item.time}</p>
                            <p>Cost: {item.cost}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ResSearchItem;
