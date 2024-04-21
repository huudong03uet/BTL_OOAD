import { useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import  Seller from '@/types/seller';
import { useSWRConfig } from "swr"
import { mutate } from "swr"
import axios from 'axios';
import { HOST } from '@/service/host';


interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
  sellerInformation: Seller;
  onAcceptReject: (status: string , packageItem: Seller) => void;

}

function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate, sellerInformation } = props;

  const handleCloseModal = () => setShowModalCreate(false);
  const handleShowModal = () => setShowModalCreate(true);

  // let { seller_id, name, email, phoneNumber, description, card_number, expiry, cvn, nameOnCard, country, address, city, state, time_create, status } = sellerInformation;


  const handleSubmit = async (newStatus: string) => {
    try {
      // Gọi API để thực hiện sửa đổi trạng thái của seller
      const url = `${HOST}/account/seller/handle_verification_seller`
      const response = await axios.post(url, {
        seller_id: sellerInformation.id,
        status: newStatus, // Thay đổi status thành complete
      });

      if (!response.data) {
        throw new Error('Failed to update seller status');
      }
      props.onAcceptReject(newStatus, sellerInformation);

      // Nếu thành công, cập nhật lại dữ liệu bằng cách sử dụng mutate từ SWR
      handleCloseModal(); 
    } catch (error) {
      console.error('Error updating seller status:', error);
    }
  };


  return (
    <Modal
      isOpen={showModalCreate}
      onClose={handleCloseModal}
      size='3xl'
      style={{ top: '250px', left: '30%', transform: 'translate(-50%, -50%)' }} // Đặt vị trí modal
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Verification Seller</ModalHeader>
          <ModalBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="mb-0 ml-3">
              <p><strong>Seller Name:</strong> {sellerInformation.name}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="ml-3"><strong>Email:</strong> {sellerInformation.email}</p>
              <p className="mr-20"><strong>Phone Number:</strong> {sellerInformation.phone}</p>
            </div>
            <div className="mb-1 ml-3">
              <p><strong>Description:</strong> {sellerInformation.description}</p>
            </div>
            {/* <div className="mb-0 ml-3">
              <p><strong>Card Number:</strong> {sellerInformation.card_number}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='ml-3'><strong>Expiry:</strong> {expiry}</p>
              <p className='mr-40'><strong>CVN:</strong> {cvn}</p>
            </div>
            <div className="mb-1 ml-3">
              <p><strong>Name on Card:</strong> {nameOnCard}</p>
            </div> */}

            {/* <div className="mb-0">
              <strong>Address Information:</strong>
            </div>
            <div className="mb-0 ml-2">
              <p><strong>Country:</strong> {sellerInformation.location_id}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Address:</strong> {address}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='ml-3'><strong>City:</strong> {city}</p>
              <p className='mr-40'><strong>State:</strong> {state}</p>
            </div> */}
          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-between' }}>
            <Button color="danger" onPress={() => handleSubmit('denied')}>
              Reject
            </Button>
            <Button color="primary" onPress={() => handleSubmit('accepted')}>
              Accept
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>

  );
}

export default CreateModal;
