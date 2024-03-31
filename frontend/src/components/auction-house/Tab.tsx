'use client'
import React from 'react';
import styles from '@/styles/auction_house/tab.module.css'

interface TabProps {
  id: string;
  title: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ id, title, active, onClick }) => {
  return (
    <a
      href="#"
      id={id}
      className={`${styles.tablink} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {title}
    </a>
  );
};

export default Tab;
