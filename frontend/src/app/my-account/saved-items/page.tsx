


'use client'
import ProductAuction from '@/components/auction-detail/productAuction';
import style from '../style.module.css';
import SideBarUser from "@/components/my-account/sideBarUser";
import ViewItem from '@/components/shared/viewItem';
import { Key, useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Product from '@/models/product';
import { UserContext } from '@/services/context/UserContext';
import { user_get_save_product } from '@/services/product/user';

export default function PaymentOptions() {
  // const currentSavedItems: any[] = [
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "John Nieto, Corn Dancers, ca. 1989",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "Luis Jimenez, American Dream, 1972",
  //     "cost": 4000,
  //     "user_sell": "testtt"
  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "John Nieto, Corn Dancers, ca. 1989",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "Luis Jimenez, American Dream, 1972",
  //     "cost": 4000,
  //     "user_sell": "testtt"
  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "John Nieto, Corn Dancers, ca. 1989",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "Luis Jimenez, American Dream, 1972",
  //     "cost": 4000,
  //     "user_sell": "testtt"
  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "John Nieto, Corn Dancers, ca. 1989",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "Luis Jimenez, American Dream, 1972",
  //     "cost": 4000,
  //     "user_sell": "testtt"
  //   }
  // ];

  // const passSavedItems: any[] = [
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/aaac/07/766707/H2791-L365489205.jpg",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "CHINESE CRACKLE GLAZE WINE CUP WITH ORIGINAL RECEIPT ON STAND,",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L366072565.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "John Nieto, Corn Dancers, ca. 1989",
  //     "cost": 1000,
  //     "user_sell": "testtt"

  //   },
  //   {
  //     "image": "https://image.invaluable.com/housePhotos/santafeartauction/15/766615/H21322-L365897550.JPG",
  //     "time": "Jan 1, 8:00 AM GMT+7",
  //     "name": "Luis Jimenez, American Dream, 1972",
  //     "cost": 4000,
  //     "user_sell": "testtt"
  //   }
  // ];

  const [currentSavedItems, setCurrentSavedItems] = useState<Product[]>([])
  const [passSavedItems, setPassSavedItems] = useState<Product[]>([])

  const {user} = useContext(UserContext);

  useEffect(() => {
    const fecth = async () => {
      if (user?.id) {
        let data = await user_get_save_product(user?.id)
        setPassSavedItems(data.pass_products)
        setCurrentSavedItems(data.current_products)
      }
    }

    fecth()
  }, [user?.id])

  const [selectedOptionItems, setSelectedOptionItems] = useState<Product[]>([]);

  // const [selectedOption, setSelectedOption] = useState('Current');

  const handleRadioChange = (event: any) => {
    // setSelectedOption(event.target.value);
    console.log(`Selected option: ${event.target.value}`);
    if (event.target.value == 'Current') {
      setSelectedOptionItems(currentSavedItems)
    } else {
      setSelectedOptionItems(passSavedItems)
    }
  };

  return (
    <div className='row mx-0'>
      {/* <div className="col-2">
        <SideBarMyAccount />
      </div> */}
      {/* <div className="col-10 px-5"> */}
      <div className={style.div_title}>
        Saved Items
      </div>
      <div className={style.div_section}>
        <div className={style.div_header_section}>
          Current Items ({selectedOptionItems.length} items)
        </div>
        <div className='row '>
          <div className='col-8 d-flex align-items-center'>
            <Form className='d-flex align-items-center'>
              <div key={`inline-radio`} className="mb-3 align-items-center" style={{ display: "contents" }}>
                <Form.Check
                  inline
                  label="Current"
                  name="group1"
                  type='radio'
                  id={`inline-radio-1`}
                  value="Current"
                  // checked={selectedOption === 'Current'}
                  onChange={handleRadioChange}
                />
                <Form.Check
                  inline
                  label="Pass"
                  name="group1"
                  type='radio'
                  id={`inline-radio-2`}
                  value="Pass"
                  // checked={selectedOption === 'Pass'}
                  onChange={handleRadioChange}
                />
              </div>

            </Form>
          </div>
          <div className='col-4 row'>

            <div className='col-3 d-flex align-items-center'>
              Sort by

            </div>
            <div className='col-9 d-flex align-items-center'>
              <Form.Select aria-label="Default select example">
                <option value="0">Recently Saved</option>
                <option value="1">Oldest Saved</option>
                <option value="2">Price: High to Low</option>
                <option value="3">Price: Low to High</option>
                <option value="5">Starting Soonest</option>
                <option value="6">Starting Latest</option>
              </Form.Select>
            </div>

          </div>



        </div>
        <div>
          <div className="row">
            <div className="row my-3">
              {selectedOptionItems.map((object) => (
                <div className="col-sm-3" key={object.id}>
                  <ViewItem obj={object} />
                </div>
              ))}
            </div>
          </div>
        </div>




      </div>





      {/* </div> */}
    </div >
  );
}