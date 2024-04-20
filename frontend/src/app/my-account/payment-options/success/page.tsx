"use client"
import User from '@/models/user';
import { UserContext } from '@/services/context/UserContext';
import { HOST } from '@/services/host';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

export default function SuccessPage() {
    const { user, setUser } = useContext(UserContext);
    const [updateCoin, setUpdateCoin] = useState(0);
    const [sessionId, setSesstionId] = useState('')
    const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get('session_id'); // Lấy 'session_id' từ query parameter
    
        const handlePayment = async () => {
          console.log(123, user)
            if (sessionId) {
                const url = `${HOST}/account/user/handleCardPayment`;
                try {
                    const response = await axios.post(url, { user_id: user?.id, sessionId }); // Gửi yêu cầu đến máy chủ để xử lý thanh toán
                    if (response.status === 200) {
                      console.log(response.data)
                      if(!response.data.previous) {
                        const newUser = response.data.user; // Không cần tạo đối tượng mới nếu dữ liệu trả về đã là user object hoàn chỉnh
                        setUpdateCoin(response.data.amount);
                       
                        setUser(newUser); // Cập nhật thông tin user mới
                      }
                    }
                } catch (error) {
                    console.error('Error handling payment:', error);
                }
            }
        };

        handlePayment();
    }, [user, setUser]); // useEffect sẽ chạy lại khi user thay đổi
        
    return (
      <div className="success-page">
      <h1>Donation Successful!</h1>
      {isLoading ? ( // Hiển thị một thông báo hoặc spinner trong quá trình tải dữ liệu
          <p>Loading...</p>
      ) : (
          <React.Fragment>
              <h1>Số tiền hiện tại: {updateCoin}</h1>
              <button>Quay lại</button>
          </React.Fragment>
      )}
  </div>
);
};
