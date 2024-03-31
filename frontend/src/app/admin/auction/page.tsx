'use client'
import { FormEvent, useEffect, useState } from 'react';
import Auction from '@/models/auciton';
import UserDataService from '@/services/model/user';
import auction_create_service from '@/services/auction/create';

const CreateAuction = () => {
    const [auctionData, setAuctionData] = useState({} as Auction);

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setAuctionData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const user_id = UserDataService.getUserData()?.user_id;
        if (user_id) {
            setAuctionData(prevState => ({
                ...prevState,
                user_id: user_id 
            }));
        } else {
            console.log("Error: User ID not found");
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (auctionData.name == null) {
            console.log("loi");
            return;
        }
        
        e.preventDefault();
        try {
            console.log(auctionData);
            await auction_create_service(auctionData)
        } catch (error) {
            console.error('Error creating auction:', error);
        }
    };


    return (
        <div>
            <h1>Create Auction</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Auction Name:</label>
                    <input type="text" name="name" value={auctionData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Condition Coin:</label>
                    <input type="number" name="condition_coin" value={auctionData.condition_coin} onChange={handleChange} />
                </div>
                <div>
                    <label>Status:</label>
                    <div>
                        <label>
                            <input type="radio" name="status" value="public" checked={auctionData.status === 'public'} onChange={handleChange} />
                            Public
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="status" value="private" checked={auctionData.status === 'private'} onChange={handleChange} />
                            Private
                        </label>
                    </div>
                </div>
                <input 
                    type="datetime-local" 
                    name="time_auction" 
                    value={auctionData.time_auction ? new Date(auctionData.time_auction).toISOString().slice(0, 16) : ''} 
                    onChange={handleChange} 
                />
                {/* <div>
                    <label>Location ID:</label>
                    <input type="text" name="location_id" value={auctionData.location_id} onChange={handleChange} />
                </div> */}
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={auctionData.description} onChange={handleChange} />
                </div>
                <button type="submit">Create Auction</button>
            </form>
        </div>
    );
};

export default CreateAuction;
