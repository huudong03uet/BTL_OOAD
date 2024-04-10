'use client'
import { Form, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import UserDataService from "@/services/model/user";
import { seller_add_product } from "@/services/product/seller";


export default function AddProduct() {
    const [producttitle, setProducttitle] = useState<string>('');
    const [productDescription, setProductDescription] = useState<string>('');
    const [productArtist, setProductArtist] = useState<string>('');
    const [productCategory, setProductCategory] = useState<string>('');
    const [productImages, setProductImages] = useState<File[]>([]);
    const [dimension, setDimension] = useState<string>('');
    const [minEstimate, setMinEstimate] = useState<string>('');
    const [maxEstimate, setMaxEstimate] = useState<string>('');
    const [startBid, setStartBid] = useState<string>('');
    const [provenance, setProvenance] = useState<string>('');
    const [user_id, setUserID] = useState<string | null>(UserDataService.getUserData()?.user_id?.toString() || null);


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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("title", producttitle);
        formData.append("description", productDescription);
        formData.append("category_name", productCategory);
        formData.append("artist", productArtist);
        formData.append("dimension", dimension);
        formData.append("min_estimate", minEstimate);
        formData.append("max_estimate", maxEstimate);
        formData.append("startBid", startBid);
        formData.append("provenance", provenance);

        if (productImages.length > 0 && user_id !== null) {
            formData.append("user_id", user_id);
            productImages.forEach((image) => {
                formData.append('images', image);
            });

            await seller_add_product(formData);
        } else {
            console.error('Hình ảnh không được để trống');
        }
    };



    return (
        <div className='row mx-5'>

            <div className={style.div_title}>
                Add product
            </div>
            <form onSubmit={handleSubmit}>
                <div className={style.div_section}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Product name"
                                className={style.custom_form_control}
                                value={producttitle}
                                onChange={(e) => setProducttitle(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Artist"
                                className={style.custom_form_control}
                                value={productArtist}
                                onChange={(e) => setProductArtist(e.target.value)}
                            />
                        </div>
                    </div>


                   
                    <div className="row">

                        <div className="col-6">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Category"
                                className={style.custom_form_control}
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            />
                        </div>

                        <div className="col-6">
                            <Form.Label>Dimension</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Dimension"
                                className={style.custom_form_control}
                                value={dimension}
                                onChange={(e) => setDimension(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <Form.Label>Min estimate (VNĐ)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Min estimate"
                                className={style.custom_form_control}
                                value={minEstimate}
                                onChange={(e) => setMinEstimate(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <Form.Label>Max estimate (VNĐ)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Max estimate"
                                className={style.custom_form_control}
                                value={maxEstimate}
                                onChange={(e) => setMaxEstimate(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <Form.Label>Start Bid (VNĐ)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Start bid"
                                className={style.custom_form_control}
                                value={startBid}
                                onChange={(e) => setStartBid(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Provenance</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Provenance"
                                placeholder="provenance"
                                value={provenance}
                                onChange={(e) => setProvenance(e.target.value)}
                                className={style.custom_form_control}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                className={style.custom_form_control}
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Image of products (1 -&gt; 5 images)</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Image"
                                className={style.custom_form_control}
                                name="firstName"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>


                    </div>
                    <div>
                        {
                            <button type="submit" className="btn btn-dark mb-4 col-2" >Add Product</button>

                        }
                    </div>
                </div>
            </form>

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
        </div >
    );
}