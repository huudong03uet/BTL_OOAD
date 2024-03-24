import React, { useState } from 'react';
import style from '@/styles/customer/item.module.css';
import MagnifyingGlassImage from "@/components/item/MagnifyingGlassImage";

interface Props {
  images: string[]; // Danh sách các URL của hình ảnh
}

const VerticalSlide = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(images[0]); // Ảnh hiện tại được hiển thị trong main-slide-img

  const handleClickThumbnail = (imageUrl: string) => {
    setCurrentImage(imageUrl); // Cập nhật ảnh hiện tại khi click vào thumbnail
  };

  return (
    <div className={style['slides-container']}>
      {/* Danh sách các thumbnail */}
      <div className={style['slides-thumbnail']}>
        {images.map((imageUrl, index) => (
          <div key={index} onClick={() => handleClickThumbnail(imageUrl)}>
            <img src={imageUrl} alt={`Thumbnail ${index}`} />
          </div>
        ))}
      </div>
      
      {/* Ảnh lớn hiển thị trong main-slide-img */}
      <div className={style['main-slide-img']}>
        <MagnifyingGlassImage imageUrl={currentImage} />
      </div>
    </div>
  );
};

export default VerticalSlide;
