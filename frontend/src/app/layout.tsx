'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ChatComponent from "@/components/chat/chat_component";
import 'react-chat-elements/dist/main.css';
import UserDataService from "@/services/model/user";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


const inter = Inter({ subsets: ["latin"] });
// function openNewPage() {
//   const windowFeatures = 'width=600,height=400,left=100,top=100';
//   window.open('/new-page', '_blank', windowFeatures);
// }
const userData = new UserDataService();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);



  return (
    <html lang="en" suppressHydrationWarning>

      <body className={inter.className} style={{ overflowX: "clip" }}>
        {/* {children} */}
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
            <CircularProgress size={80} />
          </div>
        ) : children}
        <ToastContainer />
        <ChatComponent />
      </body>

    </html>
  );
}
