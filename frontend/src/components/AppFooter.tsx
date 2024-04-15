'use client'
import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap';
import { global } from 'styled-jsx/css';

export default function Footer() {
  return (
    <MDBFooter color='white' bgColor='dark'>
      <div>
        <section className="mb-4 text-center p-2" style={{ backgroundColor: '#720007' }}>
          <MDBBtn outline color="light" floating className='m-1 btn-equal-size' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          {/* <MDBBtn outline color="light" floating className='m-1 btn-equal-size' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1 btn-equal-size' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn> */}

          <MDBBtn outline color="light" floating className='m-1 btn-equal-size' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1 btn-equal-size' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1 btn-equal-size' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>

{/* 
        <section className=''>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md='5' start>
                <MDBInput contrast type='email' placeholder='Email address' className='mb-4' />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        <section className='mb-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        <section className=''>
          <MDBRow>
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </div>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a> */}
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <MDBContainer className='p-4'>
              <MDBRow>
                <MDBCol lg='5' md='12' className='mb-4 mb-md-0'>
                  <div class="row px-3 d-flex flex-row">
                    <h5 class='text-uppercase'>Links</h5>
                    <div class='list-unstyled mb-0 row'>
                      <div>
                        <a href='/blog'>Blog</a>
                      </div>
                      <div>
                        <a href='/about-us'>About</a>
                      </div>
                      <div>
                        <a href='/contact'>Contact</a>
                      </div>
                      <div>
                        <a href='/careers'>Careers</a>
                      </div>
                    </div>
                  </div>

                </MDBCol>
                <MDBCol lg='7' md='12' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase'>Additional Links</h5>
                  <ul className='list-unstyled mb-0'>
                    <li>
                      <a href='/subOverview'>Subscriptions</a>
                    </li>
                    <li>
                      <a href='/artists'>Artist Database</a>
                    </li>
                    <li>
                      <a href='/press'>Press</a>
                    </li>
                    <li>
                      <a href='/advancedSearch'>Price Archive</a>
                    </li>
                    <li>
                      <a href='https://www.invaluable.com/sell-with-invaluable.html' target='_blank' rel='noreferrer'>Sell on Invaluable</a>
                    </li>
                    <li>
                      <a href='/help'>Help</a>
                    </li>
                    <li>
                      <a href='/auctionnews'>Auction News</a>
                    </li>
                    <li>
                      <div className='_live-chat_hbe81_3'>
                        <button><i className='fa fa-comment'></i>Live Chat</button>
                      </div>
                    </li>
                  </ul>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCol>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <div className='_footer-logo_a506i_3'>
              <img className='_logo-img_a506i_11' src='https://image.invaluable.com/static/invaluable/footer/logo.svg' alt='Invaluable Logo' />
              <p>As the world's leading online auction marketplace, thousands of auction houses use Invaluable to deepen relationships with millions of clients around the world. Stay connected to the things you love with curated items and auctions sent to your inbox.</p>
              <form className='_footer-signup-form_a506i_27'>
                <input type='text' placeholder='Email' />
                <button className='_btn_a506i_65 btn btn-secondary' style={{marginLeft: 10}} type='submit'>Sign Up</button>
              </form>
              <p className='_unsubscribe-policy-text_a506i_90'>You can unsubscribe at any time. View our <a href='/privacy-policy'>Privacy Policy.</a></p>
            </div>
          </MDBCol>

        </MDBRow>



        <div className='_sub-footer_1vo11_3 text-center p-2'>
          <p>&copy; 2024 Invaluable, LLC. and participating auction houses. All Rights Reserved.</p>

        </div>
      </div>
    </MDBFooter>
  );
}