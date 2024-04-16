'use client'
import PromotedAuctions from '@/components/shared/promotedAuctions';
import UpcomingAuctions from '@/components/shared/upcomingAuctions';
import ViewItem from '@/components/shared/viewItem';
import { Container } from 'react-bootstrap';
import styles from './page.module.css';
import Category from '@/models/category';
import { useEffect, useState } from 'react';
import { user_get_auction_promote, user_get_auction_upcoming } from '@/services/auction/user';
import { user_get_all_product, user_get_category_service, user_get_product_accept, user_get_recently_product } from '@/services/product/user';
import ChatSupport from '@/components/chat/chat_support';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Auction from '@/models/auction';
import Product from '@/models/product';

const HomePage = () => {

  // const recentlyViewedItems: ItemSummary[] = [
  //   {
  //     "image_path": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "title": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
  //     "max_bid": 1000,
  //     "user_sell": "testtt",
  //     id: 1000,

  //   },
  //   {
  //     "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "title": "John Nieto, Corn Dancers, ca. 1989",
  //     "max_bid": 1000,
  //     "user_sell": "testtt",
  //     id: 1100,

  //   },
  //   {
  //     "image_path": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "title": "Luis Jimenez, American Dream, 1972",
  //     "max_bid": 4000,
  //     "user_sell": "testtt",
  //     id: 1200,
  //   }
  // ];

  const [recentlyViewedItems, setRecentlyViewedItems] = useState<Product[]>([]);

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

  const [recommendItemForYou, setRecommendItemForYou] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await user_get_product_accept();
        if (Array.isArray(data)) {
          setRecommendItemForYou(data.slice(0, 4) );
          console.log(data.slice(0, 4));
        } else {
          setRecommendItemForYou([])
        }
      } catch (error) {
        console.error('Error fetching upcoming online auctions:', error);
      }
    }

    fetchData()
  }, [])




  const [curatedCollections, setCuratedCollections] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await user_get_category_service();
        // setCuratedCollections(data.slice(0, 6));
        // get random 6 items
        if (Array.isArray(data)) {
          let randomItems = data.sort(() => Math.random() - Math.random()).slice(0, 6);
          setCuratedCollections(randomItems);
        } else {
          setCuratedCollections([])
        }
        
      } catch (error) {
        console.error('Error fetching upcoming online auctions:', error);
      }
    };

    fetchData()
  }, [])


  const [promotedAuctions, setPromotedAuctions] = useState<Auction[]>([]);

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

  const [upcomingOnlineAuctions, setUpcomingOnlineAuctions] = useState<Auction[]>([]);

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
      {recentlyViewedItems.length > 0 && (
        <div className='py-3'>
          <Container>
            <div className={styles.header_section}>Recently Viewed Items</div>
            <div className="row">
              {recentlyViewedItems.map((object, i) => (
                <div className="col-sm-3" key={i}>
                  <ViewItem obj={object} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}

      <div className='py-3'>
        {/* Recommended Items For You */}
        <Container>
          <div className={styles.header_section}>Recommended Items For You</div>
          <div className="row">
            {recommendItemForYou.map((object, i) => (
              <div className="col-sm-3" key={i}>
                <ViewItem obj={object} />
              </div>
            ))}
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
                <div className='d-flex justify-content-center align-items-center' style={{height: "200px"}}>
                  <img src={object.image_path} alt={object.title} className="img-fluid" style={{width: "100%", height: "100%", objectFit:"cover"}} ></img>
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

