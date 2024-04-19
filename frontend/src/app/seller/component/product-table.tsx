'use client'
import React, { useState } from 'react';
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

export enum TableActivity {
    VIEW_MY_PRODUCT = 0,
    ADD_TO_AUCTION = 1,
    VIEW_IN_AUCTION = 2,
}

interface MyProductTableProps {
    activity: TableActivity;
    data: Product[];
    auctionStates?: boolean[];
    setAuctionStates?: (newStates: boolean[]) => void;
}

const MyProductTable: React.FC<MyProductTableProps> = ({
    activity,
    data,
    auctionStates = [],
    setAuctionStates = () => { },
}) => {
    const [open, setOpen] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState({} as Product);
    const handleRowClick = async (id: number) => {
        try {
            const productId = Number(id);
            const productData = await user_get_detail_product(productId);
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
    const handleAction = (index: number) => {
        if (activity === TableActivity.VIEW_MY_PRODUCT) {
            window.location.href = `/seller/edit-product?id=${data[index].id}`;
        } else if (activity === TableActivity.ADD_TO_AUCTION || activity === TableActivity.VIEW_IN_AUCTION) {
            const newAuctionStates = [...auctionStates];
            newAuctionStates[index] = !newAuctionStates[index];
            setAuctionStates(newAuctionStates);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ width: '5%' }}>ID</TableCell>
                            <TableCell align="center" style={{ width: 'auto' }}>Name</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Min estimate</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Max estimate</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Max Bid</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}>Status</TableCell>
                            {(activity === TableActivity.VIEW_MY_PRODUCT || activity === TableActivity.ADD_TO_AUCTION || activity === TableActivity.VIEW_IN_AUCTION) && (
                                <TableCell align="center" style={{ width: '10%' }}>{activity === TableActivity.VIEW_MY_PRODUCT ? 'Edit' : 'Action'}</TableCell>
                            )}
                            <TableCell align="center" style={{ width: '5%' }}>Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.map((row, index) => (
                            <React.Fragment key={row.id}>
                                <TableRow>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell align="center">{row.min_estimate}</TableCell>
                                    <TableCell align="center">{row.max_estimate}</TableCell>
                                    <TableCell align="center">{row.max_bid}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    {(activity === TableActivity.VIEW_MY_PRODUCT || activity === TableActivity.ADD_TO_AUCTION || activity === TableActivity.VIEW_IN_AUCTION) && (
                                        <TableCell align="center">
                                            <button className="btn btn-primary w-100" onClick={() => handleAction(index)}>
                                                {activity === TableActivity.VIEW_MY_PRODUCT ? 'Edit' : auctionStates[index] ? 'Remove' : 'Add'}
                                            </button>
                                        </TableCell>
                                    )}
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
                                {/* <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open === index} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                History
                                            </Typography>
                                            <Table size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Date</TableCell>
                                                        <TableCell>Artist</TableCell>
                                                        <TableCell align="right">Amount</TableCell>
                                                        <TableCell align="right">Total price ($)</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow key={row.id}>
                                                        <TableCell component="th" scope="row">{row.time}</TableCell>
                                                        <TableCell>{row.artist}</TableCell>
                                                        <TableCell align="right">{row.price}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow> */}
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

export default MyProductTable;
