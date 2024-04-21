'use client'

import { useState, useEffect, useContext } from "react";
import AppHeader from "@/components/AppHeader";
import HomePage from "./(home)/page";
import AppFooter from "@/components/AppFooter";
import AppNav from "@/components/AppNav";
import { UserContext } from "@/services/context/UserContext";

export default function Home() {
  const { setUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Giả sử bạn có một hàm async để tải dữ liệu ở đây
    const fetchData = async () => {
      try {
        // Thực hiện các tác vụ tải dữ liệu ở đây
        
        // Sau khi tải xong, set isLoading thành false
        setLoading(false);
      } catch (error) {
        console.error("Error loading data: ", error);
        // Xử lý lỗi ở đây nếu cần
      }
    };

    // Gọi hàm fetchData để bắt đầu quá trình tải
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <AppNav />

      {/* Kiểm tra isLoading trước khi hiển thị nội dung */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <HomePage />
          <AppFooter />
        </>
      )}
    </>
  );
}
