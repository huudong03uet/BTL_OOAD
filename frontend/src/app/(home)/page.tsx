'use client'
import PromotedAuctions from '@/components/shared/promotedAuctions';
import UpcomingAuctions from '@/components/shared/upcomingAuctions';
import ViewItem from '@/components/shared/viewItem';
import { Container } from 'react-bootstrap';
import styles from './page.module.css';
import ItemSummary from '@/models/product_summary';
import Category from '@/models/category';
import AuctionSummary from '@/models/auction_summary';
import { useEffect, useState } from 'react';
import { user_get_auction_promote, user_get_auction_upcoming } from '@/services/auction/user';
import { user_get_category_service } from '@/services/product/user';
import ChatSupport from '@/components/chat/chat_support';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const HomePage = () => {

  const recentlyViewedItems: ItemSummary[] = [
    {
      "image_path": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
      "time": "Jan 1, 8:00 AM GMT+7",
      "title": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
      "max_bid": 1000,
      "user_sell": "testtt",
      id: 1000,

    },
    {
      "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
      "time": "Jan 1, 8:00 AM GMT+7",
      "title": "John Nieto, Corn Dancers, ca. 1989",
      "max_bid": 1000,
      "user_sell": "testtt",
      id: 1100,

    },
    {
      "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
      "time": "Jan 1, 8:00 AM GMT+7",
      "title": "Luis Jimenez, American Dream, 1972",
      "max_bid": 4000,
      "user_sell": "testtt",
      id: 1200,
    }
  ];

  const [curatedCollections, setCuratedCollections] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await user_get_category_service();
        console.log(data)
        setCuratedCollections(data);
      } catch (error) {
        console.error('Error fetching upcoming online auctions:', error);
      }
    };

    fetchData()
  }, [])


  const [promotedAuctions, setPromotedAuctions] = useState<AuctionSummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await user_get_auction_promote();
        if (Array.isArray(data)) {
          setPromotedAuctions(data);
        } else {
          setPromotedAuctions([])
        }
      } catch (error) {
        console.error('Error fetching upcoming online auctions:', error);
      }
    };

    fetchData()
  }, [])

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
    };

    fetchData()
  }, [])



  return (
    <div>
      {/* <h1>My Next.js App</h1>
      <Button label="Click me" onClick={handleClick} /> */}
      {/*  */}
      <div className='py-3'>
        <Container>
          <div className={styles.header_section}>Recently Viewed Items</div>
          {/* <div className="container"> */}
          <div className="row">
            {recentlyViewedItems.map((object, i) => (
              <div className="col-sm-3" key={i}>
                <ViewItem obj={object} />

              </div>
            ))}

            {/* </div> */}
          </div>
        </Container>
      </div>

      {/* section 1: recently viewed items */}
      <div className='py-3'>
        <Container>
          <div className={styles.header_section}>Curated Collections</div>
          <div className="row">
            {curatedCollections.map((object, i) => (
              <div className="col-sm-2" key={i}>
                <div>
                  <img src={object.image_path} alt={object.title} className="img-fluid" ></img>
                </div>



                <div className='fw-bold hover_underline' style={{ cursor: "pointer" }}>
                  {object.title}
                </div>


              </div>
            ))}
          </div>
        </Container>
      </div>


      {/* section 2: Curated Collections */}
      <div className='py-3'>
        <Container>
          <div className={styles.header_section}>Promoted Auctions</div>


          <div className="row">
            {promotedAuctions.slice(0, 3).map((object, i) => (
              <div className="col-4" key={i}>
                <PromotedAuctions obj={object} />
              </div>
            ))}
          </div>
          <div className="py-2"></div>
          <div className="row">
            {promotedAuctions.slice(3, 6).map((object, i) => (
              <div className="col-4" key={i}>
                <PromotedAuctions obj={object} />
              </div>
            ))}
          </div>

        </Container>
      </div>

      {/* Promoted Auctions */}
      <div className='py-3'>
        <Container>
          <div className={styles.header_section}>Upcoming Online Auctions</div>
          {upcomingOnlineAuctions && upcomingOnlineAuctions.map((object, i) => (
            <div className="row" key={i}>
              <UpcomingAuctions obj={object} />
            </div>
          ))}
        </Container>
      </div>


    </div>
  );
};

export default HomePage;

