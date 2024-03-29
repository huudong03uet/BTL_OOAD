"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import add_product from '@/services/product/product';
import UserDataService from '@/services/model/user';

const AddProduct: React.FC = () => {
  const [producttitle, setProducttitle] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productArtist, setProductArtist] = useState<string>('');
  const [productImages, setProductImages] = useState<File[]>([]);
  const [user_id, setUserID] = useState<string | null>(UserDataService.getUserData()?.user_id?.toString() || null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", producttitle);
    formData.append("description", productDescription);
    formData.append("artist", productArtist);

    if (productImages.length > 0 && user_id !== null) {
      formData.append("user_id", user_id);
      productImages.forEach((image) => {
        formData.append('images', image);
      });

      await add_product(formData);
    } else {
      console.error('Hình ảnh không được để trống');
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files: FileList = e.target.files;
      const newImages: File[] = [];
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
      }
      setProductImages([...productImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
  };

  return (
    <div>
      <h1>Thêm Sản Phẩm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="producttitle">Tên Sản Phẩm:</label>
          <input
            type="text"
            id="producttitle"
            value={producttitle}
            onChange={(e) => setProducttitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productDescription">Loại Sản Phẩm:</label>
          <input
            type="text"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productDescription">productArtist:</label>
          <input
            type="text"
            id="productArtist"
            value={productArtist}
            onChange={(e) => setProductArtist(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productImages">Hình Ảnh:</label>
          <input
            type="file"
            id="productImages"
            multiple // Cho phép chọn nhiều tập tin
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h3>Danh sách hình ảnh:</h3>
          {productImages.length > 0 && (
            <ul>
              {productImages.map((image, index) => (
                <li key={index}>
                  {image.name} 
                  <button type="button" onClick={() => handleRemoveImage(index)}>Xóa</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
};

export default AddProduct;