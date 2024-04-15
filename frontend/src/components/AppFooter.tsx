'use client'
import React, { useState } from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function Footer() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const handleSignUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setShowForm(false);
    setShowThankYou(true);
  };
  return (
    <>
      <MDBFooter className='text-center p-2' style={{ backgroundColor: "#720007" }}>
      
        <a href="">
            <MDBIcon fab icon='facebook-f' color="light" className="fs-2 p-3 pe-5" />
          </a>
          <a href="">
            <MDBIcon fab icon='google' color="light" className="fs-2 p-3 pe-5" />
          </a>
          <a href=""><MDBIcon fab icon='instagram' color="light" className="fs-2 p-3 pe-5" /></a>
          <a href=""><MDBIcon fab icon='github' color="light" className="fs-2 p-3 pe-5" /></a>
      </MDBFooter>
      <MDBFooter className='' color='white' bgColor='dark'>

      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol className='mb-4 mb-md-0'>
              <div>
                <div className='d-flex mb-3'>
                  <div className='pe-4'>Blog</div>
                  <div className='pe-4'>|</div>
                  <div className='pe-4'>About</div>
                  <div className='pe-4'>|</div>
                  <div className='pe-4'>Contact</div>
                  <div className='pe-4'>|</div>
                  <div className='pe-4'>Careers</div>
                </div>
                <div className="row">
                  <div className="col-6 col-xs-6 col-sm-6 col-lg-4 mb-3">
                    Subscriptions
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-lg-4 mb-3">
                    Artist Database
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-lg-4 mb-3">
                    Press
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-lg-4 mb-3">
                    Price Archive
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-lg-4 mb-3">
                    Sell on Invaluable
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-lg-4 mb-3 ">
                    Help
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-lg-4 mb-3">
                    Auction News
                  </div>
                  <div className="col-xs-12 col-sm-12">
                    <div className="_live-chat_hbe81_3"><i className="fa fa-comment me-2"></i>Live Chat
                    </div>
                  </div>
                </div>
              </div>
          </MDBCol>

          <MDBCol className='mb-4 mb-md-0'>
            <div>
              <div className="">
                <img className="mb-2" src="/logo.png" height="40px" alt="Invaluable Logo">
                </img>
                <p>As the world's leading online auction marketplace, thousands of auction
                  houses use Invaluable to deepen relationships with millions of clients
                  around the world. Stay connected to the things you love with curated items
                  and auctions sent to your inbox. </p>
              </div>

              {showForm && (
                <div className="d-flex mb-2">
                  <div style={{ width: "100%" }}>
                    <input className="p-3" type="text" placeholder="Email" value="" style={{ width: "70%", height: "40px" }}></input>
                    <button className="" onClick={handleSignUp} style={{ backgroundColor: "#720007", color: "#fff", width: "30%", height: "40px", cursor: "pointer", border: "none" }}>Sign Up</button>
                  </div>
                </div>)}
              {showThankYou && <p className=""><span className='fw-bold'>Thank you for subscribing!</span><br></br>
                You will receive bidding tips, auction updates, curated items and more in your inbox.</p>}
              <p className="">You can unsubscribe at any time. View our
                <a href="" style={{ color: "#FFF" }} className='ms-2'>Privacy Policy.</a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <p>&copy; 2024 Invaluable, LLC. and participating auction houses. All Rights Reserved.</p>
        </div>
      </MDBFooter ></>
  );
}