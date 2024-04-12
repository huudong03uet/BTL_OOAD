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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ItemSummary from '@/models/product_summary';

export enum TableActivity {
    VIEW_MY_PRODUCT = 0,
    ADD_TO_AUCTION = 1,
    VIEW_IN_AUCTION = 2,
}

interface MyProductTableProps {
    activity: TableActivity;
    data: ItemSummary[];
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

    const handleRowClick = (index: number) => {
        setOpen((prevOpen) => (prevOpen === index ? null : index));
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
                    {data.map((row, index) => (
                        <React.Fragment key={row.id}>
                            <TableRow>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align="center">{row.estimate_min}</TableCell>
                                <TableCell align="center">{row.estimate_max}</TableCell>
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
                                        onClick={() => handleRowClick(index)}
                                    >
                                        {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
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
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyProductTable;
