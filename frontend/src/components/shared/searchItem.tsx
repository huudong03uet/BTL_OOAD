'use client'

import Product from '@/models/product';
import React, { useState } from 'react';
import SoldItem from './soldItem';
import ViewItem from './viewItem';

function ResSearchItem({ searchResults }: { searchResults: Product[] }) {
    const [status, setStatus] = useState<number>(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {searchResults.map((item: Product) => (
                <div key={item.id}>
                    {item.status === 'sold' ? (
                        <div style={{ width: '250px', height: 'auto' }}>
                            <SoldItem obj={item} />
                        </div>
                    ) : (
                        <div style={{ width: '250px', height: 'auto' }}>
                            <ViewItem obj={item} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ResSearchItem;
