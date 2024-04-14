'use client'
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import MyProductTable, { TableActivity } from '../../component/product-table';
import ItemSummary from '@/models/product_summary';
import { seller_get_all_products } from '@/services/product/seller';
import { useRouter, useSearchParams } from 'next/navigation';


//  cứ lấy hết thông tin có của product -> không cần lọc, dư sẽ để vào phần detail hoặc bỏ

export default function MyProduct() {
    const [data, setData] = useState<ItemSummary[]>([])
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_get_all_products();
                setData(data);
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
        //  <Link href={`/seller/edit-product?id=${row.id}`}>

        //  get id of product from router
    }, [])


    return (
        <div className='row mx-5'>

            <div className={style.div_title}>
                My Product
            </div>
            <div className={style.div_section}>
               <MyProductTable activity={TableActivity.VIEW_MY_PRODUCT} data={data}></MyProductTable>
            </div>


        </div >
    );
}


// function createData(
//     name: string,
//     min_estimate: number,
//     max_estimate: number,
//     start_bid: number,
//     max_bid: number,
//     status: number,
// ) {
//     return {
//         name: name,
//         min_estimate: min_estimate,
//         max_estimate: max_estimate,
//         start_bid: start_bid,
//         max_bid: max_bid,
//         status: status,
//         history: [
//             {
//                 date: '2020-01-05',
//                 customerId: '11091700',
//                 amount: 3,
//             },
//             {
//                 date: '2020-01-02',
//                 customerId: 'Anonymous',
//                 amount: 1,
//             },
//         ],
//     };
// }

// function Row(props: { row: ReturnType<typeof createData> , index: number}) {
//     const { row } = props;
//     const { index } = props;
//     const [open, setOpen] = React.useState(false);

//     return (
//         <React.Fragment>
//             <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
               
//                 {/* cell 1, 2, 3, ... */}

//                 <TableCell align="center" component="th" scope="row">
//                     {index + 1}
//                 </TableCell>
//                 <TableCell scope="row">
//                     {row.name}
//                 </TableCell>
//                 <TableCell align="center">{row.min_estimate}</TableCell>
//                 <TableCell align="center">{row.max_estimate}</TableCell>
//                 <TableCell align="center">{row.start_bid}</TableCell>
//                 <TableCell align="center">{row.max_bid}</TableCell>
//                 <TableCell align="center">{row.status}</TableCell>

//                 <TableCell align="center">
//                     <Link href="/seller/edit-product">
//                         <button className="btn btn-primary w-100">Edit</button>
//                     </Link>
//                 </TableCell>

//                 <TableCell align="center">
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//             </TableRow>

//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 History
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Customer</TableCell>
//                                         <TableCell align="right">Amount</TableCell>
//                                         <TableCell align="right">Total price ($)</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.history.map((historyRow) => (
//                                         <TableRow key={historyRow.date}>
//                                             <TableCell component="th" scope="row">
//                                                 {historyRow.date}
//                                             </TableCell>
//                                             <TableCell>{historyRow.customerId}</TableCell>
//                                             <TableCell align="right">{historyRow.amount}</TableCell>
//                                             <TableCell align="right">
//                                                 {Math.round(historyRow.amount * row.status * 100) / 100}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//     createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
