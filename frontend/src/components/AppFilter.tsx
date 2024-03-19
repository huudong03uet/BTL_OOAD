'use client'
import useSWR from 'swr';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { global } from 'styled-jsx/css';
import styles from '@/styles/customer/filter.module.css';

export default function Filters() {


  interface Category {
    id: string;
    name: string;
  }

  interface Artist {
    id: string;
    name: string;
  }

  interface Seller {
    id: string;
    name: string;
  }

  interface SellerLocation {
    id: string;
    name: string;
  }

  interface PriceFilter {
    currency: string;
    minPrice: number;
    maxPrice: number;
  }

  interface Currency {
    id: string;
    name: string;
  }

  const [displayValue, setDisplayValue] = useState<string>('');
  const [selectedAuctionDate, setSelectedAuctionDate] = useState<string>('');

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  // const { dataCategories: categories, error1 } = useSWR<Category[]>('/api/categories');

  const [selectedArtists, setSelectedArtists] = useState<Set<string>>(new Set());
  // const { data: artists, error: error2 } = useSWR<Artist[]>('/api/artists');

  const [selectedSellers, setSelectedSellers] = useState<Set<string>>(new Set());
  // const { data: sellers, error: error3 } = useSWR<Seller[]>('/api/sellers');

  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  // const { data: locations, error: error4 } = useSWR<SellerLocation[]>('/api/sellerLocations');

  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  // const { data: currencies, error5 } = useSWR<Currency[]>('/api/currencies');


  //fake data
  const categories: Category[] = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
  ];
  const artists: Artist[] = [
    { id: '1', name: 'artists 1' },
    { id: '2', name: 'artists 2' },
  ];
  const sellers: Seller[] = [
    { id: '1', name: 'sellers 1' },
    { id: '2', name: 'sellers 2' },
    { id: '3', name: 'sellers 3' },
  ];
  const locations: SellerLocation[] = [
    { id: '1', name: 'sellers location 1' },
    { id: '2', name: 'sellers location 2' },
    { id: '3', name: 'sellers location 3' },
  ];
  const currencies: Currency[] = [
    { id: '1', name: 'USD' },
    { id: '2', name: 'VND' },
    { id: '3', name: 'linhiuday' },
  ];
  const error = false;


  // Category
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedSelectedCategories = new Set(selectedCategories);
    if (checked) {
      updatedSelectedCategories.add(value);
    } else {
      updatedSelectedCategories.delete(value);
    }
    setSelectedCategories(updatedSelectedCategories);
  };

  if (error) return <div>Error loading </div>;

  //Display
  const handleDisPlayChange = (event: { target: { value: any; checked: any; }; }) => {
    const { value, checked } = event.target;
    if (checked) {
      console.log("Perform action with display=" + value);
    } else {
      console.log("Undo action with display=" + value);
    }
  }

  //AuctionDate
  const handleAuctionDateChange = (event: { target: { value: any; checked: any; }; }) => {
    setSelectedAuctionDate(event.target.value);
    console.log("Selected auction date:", event.target.value);
  }

  //Artist
  const handleArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const artistId = event.target.value;
    const updatedSelectedArtists = new Set(selectedArtists);
    if (updatedSelectedArtists.has(artistId)) {
      updatedSelectedArtists.delete(artistId);
    } else {
      updatedSelectedArtists.add(artistId);
    }
    setSelectedArtists(updatedSelectedArtists);
    console.log("Selected artists:", updatedSelectedArtists);
  };

  //Seller
  const handleSellerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sellerId = event.target.value;
    const updatedSelectedSellers = new Set(selectedSellers);
    if (updatedSelectedSellers.has(sellerId)) {
      updatedSelectedSellers.delete(sellerId);
    } else {
      updatedSelectedSellers.add(sellerId);
    }
    setSelectedSellers(updatedSelectedSellers);
    console.log("Selected sellers:", updatedSelectedSellers);
  };

  //Seller location
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const locationId = event.target.value;
    const updatedSelectedLocations = new Set(selectedLocations);
    if (updatedSelectedLocations.has(locationId)) {
      updatedSelectedLocations.delete(locationId);
    } else {
      updatedSelectedLocations.add(locationId);
    }
    setSelectedLocations(updatedSelectedLocations);
    console.log("Selected locations:", updatedSelectedLocations);
  };

  //Price
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value ? parseFloat(event.target.value) : '');
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value ? parseFloat(event.target.value) : '');
  };

  const handleApplyPriceRange = () => {
    console.log('Applied price range:', minPrice, maxPrice);
  };

  return (
    <main>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            {/* <!-- Section: Sidebar --> */}
            <section>
              {/* <!-- Section: Filters --> */}
              <section id="filters" data-auto-filter="true">
                <h5>Filters</h5>

                {/* <!-- Section: Display --> */}
                <section className="mb-4" data-filter="display">
                  <h6 className="font-weight-bold mb-3">Display</h6>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="upcoming"
                      onChange={handleDisPlayChange}
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      htmlFor="condition-checkbox"
                    >
                      Upcoming Items
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="pass"
                      onChange={handleDisPlayChange}
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      htmlFor="condition-checkbox2"
                    >
                      Past Items
                    </label>
                  </div>
                </section>

                {/* Section: Categories */}
                <section className="mb-4" data-filter="categories">
                  <h6 className="font-weight-bold mb-3">Categories</h6>

                  {categories.length === 0 ? (
                    <p>None</p>
                  ) : (
                    categories.map((category) => (
                      <div className="form-check mb-3" key={category.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={category.id}
                          id={`category-checkbox-${category.id}`}
                          onChange={handleCategoryChange}
                          checked={selectedCategories.has(category.id)}
                        />
                        <label
                          className="form-check-label text-uppercase small text-muted"
                          htmlFor={`category-checkbox-${category.id}`}
                        >
                          {category.name}
                        </label>
                      </div>
                    ))
                  )}
                </section>


                {/* <!-- Section: Artist --> */}
                <section className="mb-4" data-filter="artist">
                  <h6 className="font-weight-bold mb-3">Artist</h6>
                  {artists.length === 0 ? (
                    <p>None</p>
                  ) : (
                    artists.map(artist => (
                      <div key={artist.id} className="form-check mb-3">
                        <input
                          type="checkbox"
                          value={artist.id}
                          id={`artist-checkbox-${artist.id}`}
                          checked={selectedArtists.has(artist.id)}
                          onChange={handleArtistChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`artist-checkbox-${artist.id}`}
                          className="form-check-label text-uppercase small text-muted"
                        >
                          {artist.name}
                        </label>
                      </div>
                    ))
                  )}
                </section>


                {/* Section: Auction Date */}
                <section className="mb-4" data-filter="auctionDate">
                  <h6 className="font-weight-bold mb-3">Auction Date</h6>

                  {/* Radio button All dates */}
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="allDay"
                      id="auctionDate-allDay"
                      checked={selectedAuctionDate === 'allDay'}
                      onChange={handleAuctionDateChange}
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      htmlFor="auctionDate-allDay"
                    >
                      All dates
                    </label>
                  </div>

                  {/* Radio button Next 7 days */}
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="7day"
                      id="auctionDate-7day"
                      checked={selectedAuctionDate === '7day'}
                      onChange={handleAuctionDateChange}
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      htmlFor="auctionDate-7day"
                    >
                      Next 7 days
                    </label>
                  </div>

                  {/* Radio button Next 30 days */}
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="30day"
                      id="auctionDate-30day"
                      checked={selectedAuctionDate === '30day'}
                      onChange={handleAuctionDateChange}
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      htmlFor="auctionDate-30day"
                    >
                      Next 30 days
                    </label>
                  </div>

                  {/* Radio button Next 60 days */}
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="60day"
                      id="auctionDate-60day"
                      checked={selectedAuctionDate === '60day'}
                      onChange={handleAuctionDateChange}
                    />
                    <label
                      className="form-check-label text-uppercase small text-muted"
                      htmlFor="auctionDate-60day"
                    >
                      Next 60 days
                    </label>
                  </div>
                </section>


                {/* <!-- Section: Sellers --> */}
                <section className="mb-4" data-filter="seller">
                  <h6 className="font-weight-bold mb-3">Sellers</h6>
                  {sellers.length === 0 ? (
                    <p>None</p>
                  ) : (
                    sellers.map(seller => (
                      <div key={seller.id} className="form-check mb-3">
                        <input
                          type="checkbox"
                          value={seller.id}
                          id={`seller-checkbox-${seller.id}`}
                          checked={selectedSellers.has(seller.id)}
                          onChange={handleSellerChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`seller-checkbox-${seller.id}`}
                          className="form-check-label text-uppercase small text-muted"
                        >
                          {seller.name}
                        </label>
                      </div>
                    ))
                  )}
                </section>

                {/* <!-- Section: Seller Location --> */}
                <section className="mb-4" data-filter="sellerLocation">
                  <h6 className="font-weight-bold mb-3">Seller Location</h6>
                  {locations.length === 0 ? (
                    <p>None</p>
                  ) : (
                    locations.map(location => (
                      <div key={location.id} className="form-check mb-3">
                        <input
                          type="checkbox"
                          value={location.id}
                          id={`location-checkbox-${location.id}`}
                          checked={selectedLocations.has(location.id)}
                          onChange={handleLocationChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`location-checkbox-${location.id}`}
                          className="form-check-label text-uppercase small text-muted"
                        >
                          {location.name}
                        </label>
                      </div>
                    ))
                  )}
                </section>

                {/* <!-- Section: Price --> */}
                <section className="mb-4" data-filter="price">
                  <h6 className="font-weight-bold mb-3">Price</h6>

                  {/* Select currency */}
                  <div className={`${styles.selectContainer} mb-3`}>
                    <label htmlFor="currency-select" className="form-label">Currency</label>
                    <select
                      id="currency-select"
                      className="form-select"
                      value={selectedCurrency}
                      onChange={handleCurrencyChange}
                    >
                      <option value="">Select currency</option>
                      {currencies.map(currency => (
                        <option key={currency.id} value={currency.id}>{currency.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Input group for min and max price */}
                  <div className={`${styles.inputGroup} mb-3`}>
                    <label htmlFor="min-price-input" className={`${styles.formLabel} form-label`}>Min Price</label>
                    <input
                      type="number"
                      id="min-price-input"
                      className={`${styles.formControl} form-control`}
                      value={minPrice}
                      onChange={handleMinPriceChange}
                    />
                    <span>to</span>
                    <label htmlFor="max-price-input" className={`${styles.formLabel} form-label`}>Max Price</label>
                    <input
                      type="number"
                      id="max-price-input"
                      className={`${styles.formControl} form-control`}
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                  </div>

                  {/* Apply Price Range button */}
                  <div className={`${styles.formGroup} form-group`}>
                    <button className={`${styles.btn} btn ${styles.buttonPrimary} btn-primary`} onClick={handleApplyPriceRange}>
                      Apply Price Range
                    </button>
                  </div>
                </section>

              </section>
              {/* <!-- Section: Filters --> */}
            </section>
            {/* <!-- Section: Sidebar --> */}
          </div>

          {/* CONTEND */}
          <div className="col-md-8">
            <div className="row justify-content-center">
              <div className="col-md-6 my-auto py-3">
                <label
                  className="form-label select-label"
                  style={{
                    padding: '15px',
                    fontSize: '1rem', // Customize label font size as needed
                    color: '#6c757d', // Customize label text color as needed
                  }}
                >
                  Sort by
                </label>
                <select
                  className="select"
                  id="sort-select"
                  style={{
                    padding: '0.375rem 1.75rem 0.375rem 0.75rem', // Customize padding as needed
                    fontSize: '1rem', // Customize font size as needed
                    lineHeight: '1.5', // Customize line height as needed
                    color: '#495057', // Customize text color as needed
                    backgroundColor: '#fff', // Customize background color as needed
                    border: '1px solid #ced4da', // Customize border color as needed
                    borderRadius: '0.25rem', // Customize border radius as needed
                  }}
                >
                  <option value="1">Best rating</option>
                  <option value="2">Lowest price first</option>
                  <option value="3">Highest price first</option>
                </select>

              </div>
            </div>
            <div className="row mb-4" id="content"></div>
            <div className="row">
              <div className="col-md-12 mt-3 text-center">
                <div
                  className="spinner-border text-primary mx-auto my-5"
                  id="spinner"
                  role="status"
                  style={{ display: "none" }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}