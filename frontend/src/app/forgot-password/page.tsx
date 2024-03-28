'use client'
import React, { useState } from "react";
import forgot_password_service from "@/services/my_account/forgot_password";


export default function Item() {
    const [email, setEmail] = useState('');

    const handleRequestInfo = async () => {
        if (email.trim() === '') {
            alert('Please enter your email.');
            return;
        }

        await forgot_password_service(email);
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className='m-5'>
                    <div className='d-flex justify-content-center'>
                        <img src="/img/logo.svg" style={{cursor: "pointer"}}
                            alt="test" width={"200px"}></img>
                    </div>
                    <div className="my-4" style={{ fontWeight: "300", fontSize: "24px" }}>
                        Password Assistance
                    </div>
                    <div>
                        Please enter your email and we will send you
                    </div>
                    <div>
                     a password reset link.

                    </div>
                    <div style={{ fontWeight: "500", }} className='my-3'>
                        Enter Your Email
                    </div>
                    <div >
                    <input className='w-100' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div className='d-flex align-items-center my-4'>
                        <button type="button" className="btn btn-dark px-5" onClick={handleRequestInfo}>Request Info</button>
                        <a href="/" className="px-5" style={{ textDecoration: "none" }}>Cancel</a>
                    </div>

                </div>
            </div>

        </>

    );
}