'use client'
import React from 'react';

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
      className={`tablink ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {title}
    </a>
  );
};

export default Tab;
