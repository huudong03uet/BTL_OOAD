"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import add_item from '@/services/item/item';
import UserDataService from '@/services/model/user';
import axios from 'axios';

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [productProvenance, setProductProvenance] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productImages, setProductImages] = useState<File[]>([]);
  const [user_id, setUserID] = useState<string | null>(UserDataService.getUserData()?.user_id?.toString() || null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", productName);
    formData.append("provenance", productProvenance);
    formData.append("description", productDescription);

    if (productImages.length > 0 && user_id) {
      formData.append("user_id", user_id);
      productImages.forEach((image) => {
        formData.append('images', image);
      });
      console.log(productImages);
      const CLOUD_NAME = "domjzehgf"
      const PRESET_NAME = "btl_oop"
      const urls = [];
      const folder_name = "products"
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const data = new FormData();
      data.append("upload_preset", PRESET_NAME);
      data.append("folder", folder_name);

      for(const file of productImages) {
        data.append("file", file)
        axios.post(api, data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(response => console.log(response))
      }

      // await add_item(formData);
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
      setProductImages([...productImages, ...newImages]); // Thêm các tập tin mới vào mảng
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
          <label htmlFor="productName">Tên Sản Phẩm:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productProvenance">productProvenance:</label>
          <input
            type="text"
            id="productProvenance"
            value={productProvenance}
            onChange={(e) => setProductProvenance(e.target.value)}
          />
        </div>
        <div></div>
        <div>
          <label htmlFor="productDescription">productDescription:</label>
          <input
            type="text"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productImages">Hình Ảnh:</label>
          <input
            type="file"
            id="productImages"
            multiple
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

