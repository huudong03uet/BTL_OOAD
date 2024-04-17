'use client'
import React, { useState } from 'react';
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
import Link from 'next/link';
import Auction from '@/models/auction';

export enum TableActivity {
    HISTORY = 'history',
    MY_AUCTION = 'my_auction',
}

interface MyAuctionTableProps {
    activity: TableActivity;
    data: Auction[];
}

const MyAuctionTable: React.FC<MyAuctionTableProps> = ({
    activity,
    data,
}) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ width: '5%', paddingLeft: '0px', paddingRight: '0px' }}>ID</TableCell>
                        <TableCell align="center" style={{ width: '10%', paddingLeft: '0px', paddingRight: '0px' }}>Auction name</TableCell>
                        <TableCell align="center" style={{ width: '15%', paddingLeft: '0px', paddingRight: '0px' }}>Time start</TableCell>
                        <TableCell align="center" style={{ width: '15%', paddingLeft: '0px', paddingRight: '0px' }}>Status</TableCell>
                        {(activity === TableActivity.MY_AUCTION) ? (
                            <TableCell align="center" style={{ width: '15%', paddingLeft: '0px', paddingRight: '0px' }}>Edit</TableCell>
                        ) : (activity === TableActivity.HISTORY) ? (
                            <></>
                        ) : null}

                        <TableCell align="center" style={{ width: 'auto', paddingLeft: '0px', paddingRight: '0px' }}>Detail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <React.Fragment key={row.id}>
                            <TableRow>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.time_register}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                {(activity === TableActivity.MY_AUCTION) ? (
                                    <TableCell align="center">
                                        <Link href={`/seller/edit-auction?id=${row.id}`}>
                                         <button className="btn btn-primary w-100">Edit</button>
                                        </Link>
                                    </TableCell>
                                    
                                ) : (activity === TableActivity.HISTORY) ? (
                                    <></>
                                ) : null}
                                <TableCell align="center">{row.description}</TableCell>
                                
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyAuctionTable;
