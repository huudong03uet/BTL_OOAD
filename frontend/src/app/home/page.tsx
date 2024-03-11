'use client'
import React from 'react';
import Button from '../../components/shared/button';

const HomePage = () => {
  const handleClick = () => {
    alert('Click')
  };

  return (
    <div>
      <h1>My Next.js App</h1>
      <Button label="Click me" onClick={handleClick} />
    </div>
  );
};

export default HomePage;

