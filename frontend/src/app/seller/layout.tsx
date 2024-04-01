'use client'

import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter';
import AppNav from '@/components/AppNav';
import AppBreadCrumb from '@/components/AppBreadCrumb';
import SideBarShop from "@/components/my-account/sideBarShop";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

            <body className={inter.className}>

                <AppHeader />
                <AppNav />
                <AppBreadCrumb />
                <div className='row  mx-0'>
                    <div className="col-2">
                        <SideBarShop />
                    </div>
                    <div className="col-10">
                        {children}

                    </div>
                </div>
                <AppFooter />
            </body>

        </html>
    );
}
