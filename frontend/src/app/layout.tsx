'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter';
import AppNav from '@/components/AppNav';
import AppBreadCrumb from '@/components/AppBreadCrumb';
import Container from 'react-bootstrap/Container';

const inter = Inter({ subsets: ["latin"] });
// function openNewPage() {
//   const windowFeatures = 'width=600,height=400,left=100,top=100';
//   window.open('/new-page', '_blank', windowFeatures);
// }
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  
      <body className={inter.className}>

        {children}

      </body>

    </html>
  );
}
