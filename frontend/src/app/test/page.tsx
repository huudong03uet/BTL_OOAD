'use client'
import PromotedAuctions from '@/components/shared/promotedAuctions';
import UpcomingAuctions from '@/components/shared/upcomingAuctions';
import ViewItem from '@/components/shared/viewItem';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { HiSwitchHorizontal } from 'react-icons/hi';
import Dropdown from 'react-dropdown';
import axios from 'axios';

const TestPage = () => {

    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");

    const [output, setOutput] = useState(0);

    useEffect(() => {
        axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res: any) => {
                setInfo(res.data[from]);
            })
    }, [from]);


    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        setOptions(Array.from(new Set(Object.keys(info))));
        convert();
    }, [info])

    function convert() {
        var rate = info[to as keyof typeof info];
        setOutput(input * Number(rate));
    }

    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }
  return (
    <div>
                              <div className="container">
                            <div className="left">
                                <h3>Amount</h3>
                                <input type="text"
                                    placeholder="Enter the amount"
                                    onChange={(e) => setInput(Number(e.target.value))} />
                            </div>
                            <div className="middle">
                                <h3>From</h3>
                                <Dropdown options={options}
                                    onChange={(e) => { setFrom(e.value) }}
                                    value={from} placeholder="From" />
                            </div>
                            <div className="switch">
                                <HiSwitchHorizontal size="30px"
                                    onClick={() => { flip() }} />
                            </div>
                            <div className="right">
                                <h3>To</h3>
                                <Dropdown options={options}
                                    onChange={(e) => { setTo(e.value) }}
                                    value={to} placeholder="To" />
                            </div>
                        </div>
                        <div className="result">
                            <button onClick={() => { convert() }}>Convert</button>
                            <h2>Converted Amount:</h2>
                            <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>

                        </div>
    </div>
  );
};

export default TestPage;

