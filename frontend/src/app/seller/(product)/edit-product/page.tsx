'use client'
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
import { Dropdown, DropdownButton, Form, InputGroup, } from "react-bootstrap";
import Product from "@/models/product";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { user_get_category_service, user_get_detail_product } from "@/services/product/user";
import { seller_update_product } from "@/services/product/seller";
import { UserContext } from "@/services/context/UserContext";
import { SellerContext } from "@/services/context/SellerContext";
import { useRouter } from "next/navigation";
import Category from '@/models/category';


export default function EditProduct() {
    const {user, setUser} = useContext(UserContext);
    const {seller, setSeller} = useContext(SellerContext);;
    // const [productCategory, setProductCategory] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [product, setProduct] = useState({} as Product)
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = new URL(window.location.href)
                const idParam = url.searchParams.get("id");
                if (idParam !== null) { 
                    const id = parseInt(idParam, 10);
                    const data = await user_get_detail_product(id, user?.id);
                    setProduct(data);
                    if (data.categories != null) {
                        setSelectedCategories(data.categories)
                    }
                } else {
                    console.error('ID not found in URL');
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await seller_update_product(product, categories, seller?.id);
            alert("Update success!!");
            router.push("/seller/my-products")
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };



    return (
        <div className="row mx-5">
            {/* <ToastContainer></ToastContainer> */}
            <div className={style.div_title}>Edit product</div>
            <form onSubmit={handleSubmit}>
                <div className={style.div_section}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Product name"
                                className={style.custom_form_control}
                                value={product.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-6">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control
                                type="text"
                                name="artist"
                                placeholder="Artist"
                                className={style.custom_form_control}
                                value={product.artist}
                                onChange={handleInputChange}
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
                        <div className="col-4">
                            <Form.Label>Min estimate (VNĐ)</Form.Label>
                            <Form.Control
                                type="text"
                                name="min_estimate"
                                placeholder="Min estimate"
                                className={style.custom_form_control}
                                value={product.min_estimate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-4">
                            <Form.Label>Max estimate (VNĐ)</Form.Label>
                            <Form.Control
                                type="text"
                                name="max_estimate"
                                placeholder="Max estimate"
                                className={style.custom_form_control}
                                value={product.max_estimate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Description"
                                className={style.custom_form_control}
                                value={product.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-dark mb-4 col-2" >Change Product</button>
                        <button type="submit" className="btn btn-light ms-3 mb-4 col-2" onClick={() => { router.push('/seller/my-products') }}>Cancel Change</button>
                    </div>
                </div>
            </form>
        </div >
    );
}