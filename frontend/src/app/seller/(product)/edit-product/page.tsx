'use client'
import { Form, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
import Product from "@/models/product";
import { user_get_detail_product } from "@/services/product/user";
import { seller_update_product } from "@/services/product/seller";
import { UserContext } from "@/services/context/UserContext";
import { SellerContext } from "@/services/context/SellerContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditProduct() {
    const {user, setUser} = useContext(UserContext);
    const {seller, setSeller} = useContext(SellerContext);;
    const [productCategory, setProductCategory] = useState<string>('');
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
                        setProductCategory(data.categories[0].title);
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await seller_update_product(product, productCategory, seller?.id);
            toast.success('Update success!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            router.push("/seller/my-products")
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };



    return (
        <div className="row mx-5">
            <ToastContainer></ToastContainer>
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

                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category_name"
                                placeholder="Category"
                                className={style.custom_form_control}
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            />
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