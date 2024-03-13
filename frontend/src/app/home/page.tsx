'use client'
import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './page.module.css'
import PromotedAuctions from '@/components/shared/promotedAuctions';
import ViewItem from '@/components/shared/viewItem';



const HomePage = () => {
  const handleClick = () => {
    alert('Click')
  };

  const recentlyViewedItems: any[] = [
    {
      "image": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
      "time": "Jan 1, 8:00 AM GMT+7",
      "name": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
      "cost": 1000,


    },
    {
      "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
      "time": "Jan 1, 8:00 AM GMT+7",
      "name": "John Nieto, Corn Dancers, ca. 1989",
      "cost": 1000,


    },
    {
      "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
      "time": "Jan 1, 8:00 AM GMT+7",
      "name": "Luis Jimenez, American Dream, 1972",
      "cost": 4000,

    }
  ];


  const curatedCollections: any[] = [
    {
      "image": "https://www.invaluable.com/inv/discover/wp-content/uploads/sites/87/2023/05/Collections-Category-Hygge.jpg",
      "title": "The Hygge Edit",
    },
    {
      "image": "https://www.invaluable.com/inv/discover/wp-content/uploads/sites/87/2023/05/Collections-Category-Flawsome.jpg",
      "title": "Totally Flawsome",
    },
    {
      "image": "https://www.invaluable.com/inv/discover/wp-content/uploads/sites/87/2023/06/Collections-Category-Garden_Party.jpg",
      "title": "Midsummer Garden Party",
    },
    {
      "image": "https://www.invaluable.com/inv/discover/wp-content/uploads/sites/87/2023/05/Collections-Category-Bazaar.jpg",
      "title": "Heritage Bazaar",
    },
    {
      "image": "https://www.invaluable.com/inv/discover/wp-content/uploads/sites/87/2023/09/Collections-Category-Time_Honored_Crafts.jpg",
      "title": "Time-Honored Crafts",
    },
    {
      "image": "https://www.invaluable.com/inv/discover/wp-content/uploads/sites/87/2023/09/Collections-Category-Grand_Tour.jpg",
      "title": "The Grand Tour",
    },

  ]

  const promotedAuctions: any[] =  [
    {
      
        "image": "https://image.invaluable.com/housePhotos/ShowplaceAntiques/29/764929/H20259-L362812913.jpg",
        "time": "Mar 17, 11:00 PM GMT+7",
        "name": "Prints, Multiples & Works on Paper",
        "user_sell": "Auctions at",
  
      
    },
    {
      
      "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365289746_mid.JPG",
      "time": "Mar 17, 11:00 PM GMT+7",
      "name": "South Florida Fine Jewelry & Fashion Auction",
      "user_sell": "Propstore Los",

    
  },
  {
      
    "image": "https://image.invaluable.com/housePhotos/houseofwhitley/59/766359/H20767-L364795035_mid.jpg",
    "time": "Mar 17, 11:00 PM GMT+7",
    "name": "Long Island Home Decor & Estate Collections",
    "user_sell": "Propstore Los",

  
},
{
      
  "image": "https://image.invaluable.com/housePhotos/ActivityAuctions/35/766735/H22175-L365595994_mid.jpg",
  "time": "Mar 20, 1:00 AM GMT+7",
  "name": "Propstore Los Angeles March Auction",
  "user_sell": "Propstore Los",


},
{
      
  "image": "https://image.invaluable.com/housePhotos/houseofwhitley/48/766248/H20767-L364655923_mid.jpg",
  "time": "Mar 14, 11:00 PM GMT+7",
  "name": "Auctions at",
  "user_sell": "Propstore Los",


},
{
      
  "image": "https://image.invaluable.com/housePhotos/propstore/69/765169/H23042-L363158593_mid.jpg",
  "time": "Mar 17, 11:00 PM GMT+7",
  "name": "Worldly Wonders",
  "user_sell": "Propstore Los",


}
  ]

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
            {recentlyViewedItems.map((object, i) =>(
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
            {curatedCollections.map((object, i) =>(
              <div className="col-sm-2" key={i}>
                <div>
                  <img src={object.image} alt={object.title} className="img-fluid" ></img>
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
                <PromotedAuctions obj={object}/>
              </div>
            ))}
          </div>
          <div className="py-2"></div>
          <div className="row">
            {promotedAuctions.slice(3, 6).map((object, i) => (
              <div className="col-4" key={i}>
                <PromotedAuctions obj={object}/>
              </div>
            ))}
          </div>
        
        </Container>
      </div>

      {/* Promoted Auctions */}
      <div className='py-3'>
        <Container>
          <div className={styles.header_section}>Upcoming Online Auctions</div>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;

