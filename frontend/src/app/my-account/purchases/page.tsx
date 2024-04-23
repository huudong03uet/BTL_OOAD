'use client'
import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Product from '@/models/product';
import { user_get_detail_product } from "@/services/product/user";
import { UserContext } from '@/services/context/UserContext';
import { useRouter } from 'next/navigation';
import style from '../style.module.css';
import { SellerContext } from '@/services/context/SellerContext';
import { seller_get_all_products } from '@/services/product/seller';
//  cứ lấy hết thông tin có của product -> không cần lọc, dư sẽ để vào phần detail hoặc bỏ

export default function Purchases() {
    const [data, setData] = useState<Product[]>([])
    const {seller, setSeller} = useContext(SellerContext);
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(seller?.id) {
                    const data = await seller_get_all_products(seller?.id);
                    setData(data);
                    console.log(data)    
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
        //  <Link href={`/seller/edit-product?id=${row.id}`}>

        //  get id of product from router
    }, [seller?.id])


    return (
        <div className='row mx-5'>

            <div className={style.div_title}>
                My Purchases
            </div>
            <div className={style.div_section}>
               <MyProductTable data={data}></MyProductTable>
            </div>


        </div >
    );
}





const MyProductTable= ({data} : {data : Product[]})=> {
    const router = useRouter();
    const {user, setUser} = useContext(UserContext);
    const [open, setOpen] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState({} as Product);
    const handleRowClick = async (id: number) => {
        try {
            const productId = Number(id);
            const productData = await user_get_detail_product(productId, user?.id);
            // console.log('Product detail:', productData);
            await setSelectedProduct(productData);
            // console.log(selectedProduct);
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
    };
    const handleCloseModal = () => {
        setSelectedProduct({} as Product);
    };
    // const handleAction = (index: number) => {
    //     if (activity === TableActivity.VIEW_MY_PRODUCT) {
    //         router.push(`/seller/edit-product?id=${data[index].id}`);
    //     } else if (activity === TableActivity.ADD_TO_AUCTION || activity === TableActivity.VIEW_IN_AUCTION) {
    //         const newAuctionStates = [...auctionStates];
    //         newAuctionStates[index] = !newAuctionStates[index];
    //         setAuctionStates(newAuctionStates);
    //     }
    // };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ width: '5%' }}>ID</TableCell>
                            <TableCell align="center" style={{ width: 'auto' }}>Name</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Seller</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Auction name</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Auction time</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Coin</TableCell>
                            {/* <TableCell align="center" style={{ width: '10%' }}>Edit</TableCell> */}
                            <TableCell align="center" style={{ width: '5%' }}>Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.map((row, index) => (
                            <React.Fragment key={row.id}>
                                <TableRow>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell align="center">{row?.seller.name}</TableCell>
                                    <TableCell align="center">{row?.auction?.name}</TableCell>
                                    <TableCell align="center">{row?.auction?.time_auction.toString() }</TableCell>
                                    <TableCell align="center">{row?.max_bid }</TableCell>
                                      
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => handleRowClick(row.id)}
                                        >
                                            {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                              
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={selectedProduct && Object.keys(selectedProduct).length > 0}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                // size="lg"
            >

                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        <h1 className='text-center'>Product Details</h1>
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        {selectedProduct && (
                            <>
                                <span style={{ fontWeight: "bold" }}>Name:</span> {selectedProduct?.title} <br />
                                <span style={{ fontWeight: "bold" }}>Description:</span> {selectedProduct?.description} <br />
                                <span style={{ fontWeight: "bold" }}>Min Estimate:</span> {selectedProduct?.min_estimate} <br />
                                <span style={{ fontWeight: "bold" }}>Max Estimate:</span> {selectedProduct?.max_estimate} <br />
                                <span style={{ fontWeight: "bold" }}>Action Id:</span> {selectedProduct?.auction?.id} <br />
                                <span style={{ fontWeight: "bold" }}>Status:</span> {selectedProduct?.status} <br />
                                <span style={{ fontWeight: "bold" }}>Created At:</span> {selectedProduct?.createdAt} <br />
                            </>
                        )}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};
