'use client'
import { Form, Tab, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import UserDataService from "@/services/model/user";
import { seller_add_product } from "@/services/product/seller";

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


//  cứ lấy hết thông tin có của product -> không cần lọc, dư sẽ để vào phần detail hoặc bỏ
export enum TableActivity {
    VIEW_MY_PRODUCT = 0,
    ADD_TO_AUCTION = 1,
    VIEW_IN_AUCTION = 2,
}





export default function MyProductTable(
    props: {
        activity: TableActivity
    }
) {



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
                            <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Start bid</TableCell>
                            <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Time auction</TableCell>
                            <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Status</TableCell>
                            {/* <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Edit</TableCell> */}
                            {
                               (props.activity === TableActivity.VIEW_MY_PRODUCT) ? (
                                <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Edit</TableCell>
                            ) : (props.activity === TableActivity.ADD_TO_AUCTION) ? (
                                <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Add</TableCell>
                            ) : (
                                <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Remove</TableCell>
                            )
                            }
                            <TableCell align="center" style={{ width: '5%', paddingLeft: '0px', paddingRight: '0px' }}>Detail</TableCell>

                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {rows.map((row, index) => (
                            <Row key={row.name} row={row} index={index} activity={props.activity} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>



        </div >
    );
}


function createData(
    name: string,
    min_estimate: number,
    max_estimate: number,
    start_bid: number,
    max_bid: number,
    status: number,
) {
    return {
        name: name,
        min_estimate: min_estimate,
        max_estimate: max_estimate,
        start_bid: start_bid,
        max_bid: max_bid,
        status: status,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props: { row: ReturnType<typeof createData>, index: number, activity: TableActivity }) {
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
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.min_estimate}</TableCell>
                <TableCell align="center">{row.max_estimate}</TableCell>
                <TableCell align="center">{row.start_bid}</TableCell>
                <TableCell align="center">{row.max_bid}</TableCell>
                <TableCell align="center">{row.status}</TableCell>

                <TableCell align="center">
                    <Link href="/seller/edit-product">
                        {/* <button className="btn btn-primary w-100">Edit</button>
                         */}
                         {
                               (props.activity === TableActivity.VIEW_MY_PRODUCT) ? (
                                <button className="btn btn-primary w-100">Edit</button>
                            ) : (props.activity === TableActivity.ADD_TO_AUCTION) ? (
                                <button className="btn btn-primary w-100">Add</button>
                            ) : (
                                <button className="btn btn-primary w-100">Remove</button>
                            )

                         }
                    </Link>
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
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.status * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];
