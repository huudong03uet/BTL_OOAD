import MagnifyingGlassImage from "@/components/item/MagnifyingGlassImage";
import style from '@/styles/customer/item.module.css';
import { useEffect, useState } from 'react';

interface Props {
  images: string[]; // Danh sách các URL của hình ảnh
}

const VerticalSlide = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleClickThumbnail = (imageUrl: string) => {
    setCurrentImage(imageUrl); // Cập nhật ảnh hiện tại khi click vào thumbnail
  };

  useEffect(() => {
    setCurrentImage(images[0]); // Set ảnh hiển thị là ảnh đầu tiên trong danh sách hình ảnh
  }, [images]);

  return (
    <div className={style['slides-container']}>
      {/* Danh sách các thumbnail */}
      <div className='d-flex'>
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
    </div>
  );
};

export default VerticalSlide;
