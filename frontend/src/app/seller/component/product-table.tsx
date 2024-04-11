'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
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
import Link from "next/link";
import ItemSummary from '@/models/product_summary';


//  cứ lấy hết thông tin có của product -> không cần lọc, dư sẽ để vào phần detail hoặc bỏ
export enum TableActivity {
    VIEW_MY_PRODUCT = 0,
    ADD_TO_AUCTION = 1,
    VIEW_IN_AUCTION = 2,
}





export default function MyProductTable(
    props: {
        activity: TableActivity
        data: ItemSummary[]
    }
) {

    const { data } = props;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>

                            {/* cell 1, 2, 3, ... */}
                            <TableCell align="center" style={{ width: '5%', paddingLeft: '0px', paddingRight: '0px' }}>ID</TableCell>
                            <TableCell align="center" style={{ width: 'auto', paddingLeft: '0px', paddingRight: '0px' }}>Name</TableCell>
                            <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Min estimate</TableCell>
                            <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Max estimate</TableCell>
                            <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Max Bid</TableCell>
                            <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Status</TableCell>
                            {
                                (props.activity === TableActivity.VIEW_MY_PRODUCT) ? (
                                    <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Edit</TableCell>
                                ) : (props.activity === TableActivity.ADD_TO_AUCTION) ? (
                                    <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Add</TableCell>
                                ) : (props.activity === TableActivity.VIEW_IN_AUCTION) ? (
                                    <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Remove</TableCell>
                                ) : (
                                    <></>
                                )
                            }
                            <TableCell align="center" style={{ width: '5%', paddingLeft: '0px', paddingRight: '0px' }}>Detail</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <Row key={row.id} row={row} index={index} activity={props.activity} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}

function Row(props: { row: ItemSummary, index: number, activity: TableActivity }) {
    const { row } = props;
    const { index } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                {/* cell 1, 2, 3, ... */}

                <TableCell align="center" component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="center">{row.estimate_min}</TableCell>
                <TableCell align="center">{row.estimate_max}</TableCell>
                <TableCell align="center">{row.max_bid}</TableCell>
                <TableCell align="center">{row.status}</TableCell>

                <TableCell align="center">
                    {/* <Link href="/seller/edit-product"> */}
                    {
                        (props.activity === TableActivity.VIEW_MY_PRODUCT) ? (
                            <Link href={`/seller/edit-product?id=${row.id}`}>
                                <button className="btn btn-primary w-100">Edit</button>
                            </Link>
                            // <button onClick={() => handleEditProduct(row.id)} className="btn btn-primary w-100">Edit</button>
                            // <button className="btn btn-primary w-100">Edit</button>
                        ) : (props.activity === TableActivity.ADD_TO_AUCTION) ? (
                            <button className="btn btn-primary w-100">Add</button>
                        ) : (props.activity === TableActivity.VIEW_IN_AUCTION) ? (
                            <button className="btn btn-primary w-100">Remove</button>
                        ) : (
                            <></>
                        )

                    }
                    {/* </Link> */}
                </TableCell>

                <TableCell align="center">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
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
            </TableRow>
        </React.Fragment>
    );
}


