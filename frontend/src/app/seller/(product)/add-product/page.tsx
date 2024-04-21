'use client'
import { Dropdown, DropdownButton, Form, InputGroup, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
import { seller_add_product } from "@/services/product/seller";
import { user_get_category_service } from '@/services/product/user';
import Category from "@/models/category";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SellerContext } from "@/services/context/SellerContext";

export default function AddProduct() {
    const {seller} = useContext(SellerContext);
    const [productTitle, setProductTitle] = useState<string>('');
    const [productDescription, setProductDescription] = useState<string>('');
    const [productArtist, setProductArtist] = useState<string>('');
    const [productCategory, setProductCategory] = useState<Category>();
    const [productImages, setProductImages] = useState<File[]>([]);
    const [dimension, setDimension] = useState<string>('');
    const [minEstimate, setMinEstimate] = useState<string>('');
    const [maxEstimate, setMaxEstimate] = useState<string>('');
    const [startBid, setStartBid] = useState<string>('');
    const [provenance, setProvenance] = useState<string>('');
    const [seller_id, setSellerID] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const sortCategoriesByTitle = (categories: Category[]) => {
        return [...categories].sort((a, b) => a.title.localeCompare(b.title));
    };


    function addProductCategory(category: Category) {
        const index = selectedCategories.findIndex((cat) => cat.id === category.id);
        if (index === -1) {
            setSelectedCategories([...selectedCategories, category]);
            const updatedCategories = categories.filter((cat) => cat.id !== category.id);
            setCategories(updatedCategories);
        }
    }

    function removeProductCategory(category: Category) {
        const index = categories.findIndex((cat) => cat.id === category.id);
        if (index === -1) {
            let newCategories = [...categories, category];
            setCategories(sortCategoriesByTitle(newCategories));
            const updatedSelectedCategories = selectedCategories.filter((cat) => cat.id !== category.id);
            setSelectedCategories(updatedSelectedCategories);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await user_get_category_service();
                const simplifiedCategories: Category[] = data.map((category: any) => ({
                    id: category.id,
                    title: category.title,
                    image_path: category.image_path
                }));

                setCategories(simplifiedCategories);

            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])


    useEffect(() => {
        async function fetchData() {
            if (seller !== null) {
                setSellerID(seller.id.toString());
            }
        }

        fetchData();
    }, [seller]);


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
        formData.append("title", productTitle);
        formData.append("description", productDescription);
        formData.append("artist", productArtist);
        formData.append("dimension", dimension);
        formData.append("min_estimate", minEstimate);
        formData.append("max_estimate", maxEstimate);
        formData.append("startBid", startBid);
        formData.append("provenance", provenance);
        formData.append("categories", JSON.stringify(selectedCategories));

        if (productImages.length > 0 && seller_id !== null) {
            formData.append("seller_id", seller_id);
            productImages.forEach((image) => {
                formData.append('images', image);
            });

            const data = await seller_add_product(formData);
            if (data) {
                alert("Upload data success!");
            }
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
                        <div className="col-12">
                            <Form.Label>Product name<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Product name"
                                className={style.custom_form_control}
                                value={productTitle}
                                onChange={(e) => setProductTitle(e.target.value)}
                                required
                            />
                        </div>

                    </div>
                    <div className='row'>
                        <div className="col-12">
                            <Form.Label>Category<span style={{ color: 'red' }}>*</span></Form.Label>
                            {/* <Form.Control
                                type="text"
                                placeholder="Category"
                                className={style.custom_form_control}
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            /> */}
                            <InputGroup className="mb-3">
                                <DropdownButton
                                    variant="outline-dark"
                                    title="Add product categories"
                                    id="in-group-dropdown-2"
                                    align="end"
                                >
                                    {categories.map((category) => (
                                        <Dropdown.Item
                                            key={category.id}
                                            onClick={() => addProductCategory(category)}
                                        >
                                            {category.title}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                {/* <div className="selected-categories">
                                    {selectedCategories.map((selectedCategory) => (
                                        <span key={selectedCategory.id} className="selected-category">
                                            {selectedCategory.title}
                                            <button type="button" onClick={() => removeProductCategory(selectedCategory)}>Xóa</button>
                                        </span>
                                    ))}
                                </div> */}
                                <div className="selected-categories">
                                    {selectedCategories.map((selectedCategory) => (
                                        <span
                                            key={selectedCategory.id}
                                            className="selected-category"
                                            style={{
                                                display: 'inline-block',
                                                padding: '5px 10px',
                                                margin: '5px',
                                                borderRadius: '15px',
                                                backgroundColor: '#f8f9fa',
                                                color: '#333',
                                            }}
                                        >
                                            {selectedCategory.title}
                                            <button
                                                type="button"
                                                onClick={() => removeProductCategory(selectedCategory)}
                                                style={{
                                                    marginLeft: '5px',
                                                    color: 'black',
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    borderRadius: '50%',
                                                    padding: '2px 5px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {/* Xóa */}
                                                <HighlightOffIcon />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </InputGroup>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-6">
                            <Form.Label>Artist<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Artist"
                                className={style.custom_form_control}
                                value={productArtist}
                                onChange={(e) => setProductArtist(e.target.value)}
                                required
                            />
                        </div>


                        <div className="col-6">
                            <Form.Label>Dimension<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Dimension"
                                className={style.custom_form_control}
                                value={dimension}
                                onChange={(e) => setDimension(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <Form.Label>Min estimate<span style={{ color: 'red' }}>*</span> ($)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Min estimate"
                                className={style.custom_form_control}
                                value={minEstimate}
                                onChange={(e) => setMinEstimate(e.target.value)}
                                required
                                min='1'
                            />
                        </div>
                        <div className="col-4">
                            <Form.Label>Max estimate<span style={{ color: 'red' }}>*</span> ($)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Max estimate"
                                className={style.custom_form_control}
                                value={maxEstimate}
                                onChange={(e) => setMaxEstimate(e.target.value)}
                                required
                                min='1'
                            />
                        </div>
                        <div className="col-4">
                            <Form.Label>Start Bid<span style={{ color: 'red' }}>*</span> ($)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Start bid"
                                className={style.custom_form_control}
                                value={startBid}
                                onChange={(e) => setStartBid(e.target.value)}
                                required
                                min='1'
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Provenance<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Provenance"
                                value={provenance}
                                onChange={(e) => setProvenance(e.target.value)}
                                className={style.custom_form_control}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Description<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                className={style.custom_form_control}
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Image of products<span style={{ color: 'red' }}>*</span> (1 -&gt; 5 images)</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Image"
                                className={style.custom_form_control}
                                name="firstName"
                                multiple
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        <div>
                            {/* <h3>Danh sách hình ảnh:</h3> */}
                            {productImages.length > 0 && (
                                <>
                                    <Form.Label>List of images:</Form.Label>
                                    <ul>
                                        {productImages.map((image, index) => (
                                            <li key={index}>
                                                {image.name}
                                                <button type="button"
                                                    style={{
                                                        marginLeft: '5px',
                                                        color: 'black',
                                                        border: 'none',
                                                        backgroundColor: 'transparent',
                                                        borderRadius: '50%',
                                                        padding: '2px 5px',
                                                        cursor: 'pointer',
                                                    }

                                                    }

                                                    onClick={() => handleRemoveImage(index)}>
                                                    <HighlightOffIcon />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </>

                            )}
                        </div>

                    </div>
                    <div>
                        {
                            <button type="submit" className="btn btn-dark mb-4 col-2" >Add Product</button>

                        }
                    </div>
                </div>
            </form>


        </div >
    );
}
