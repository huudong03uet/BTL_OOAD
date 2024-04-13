import { useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { FormRegisterSeller } from '@/types/form_register_seller';
import { useSWRConfig } from "swr"
import { mutate } from "swr"

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
  sellerInformation: FormRegisterSeller;
}

function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate, sellerInformation } = props;

  const handleCloseModal = () => setShowModalCreate(false);
  const handleShowModal = () => setShowModalCreate(true);

  let { user_id, name, email, phoneNumber, description, card_number, expiry, cvn, nameOnCard, country, address, city, state, postalCode, time_create, status } = sellerInformation;

  const handleSubmit = () => {
    status = "complete";

    //call api sửa đổi trạng thái của user thành seller, be trả về với status là complete
    fetch("http://localhost:8000/blogs",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ status })
      })
      .then(function (res) {
        handleCloseModal();
        mutate("http://localhost:8000/blogs")
      })
      .catch(function (res) { console.log(res) })

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
            <div className="mb-0">
              <strong>Seller Information:</strong>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Seller Name:</strong> {name}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="ml-3"><strong>Email:</strong> {email}</p>
              <p className="mr-20"><strong>Phone Number:</strong> {phoneNumber}</p>
            </div>
            <div className="mb-1 ml-3">
              <p><strong>Description:</strong> {description}</p>
            </div>
            <div className="mb-0">
              <strong>Card Information:</strong>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Card Number:</strong> {card_number}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='ml-3'><strong>Expiry:</strong> {expiry}</p>
              <p className='mr-40'><strong>CVN:</strong> {cvn}</p>
            </div>
            <div className="mb-1 ml-3">
              <p><strong>Name on Card:</strong> {nameOnCard}</p>
            </div>

            <div className="mb-0">
              <strong>Address Information:</strong>
            </div>
            <div className="mb-0 ml-2">
              <p><strong>Country:</strong> {country}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Address:</strong> {address}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='ml-3'><strong>City:</strong> {city}</p>
              <p className='mr-40'><strong>State:</strong> {state}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Postal Code:</strong> {postalCode}</p>
            </div>
          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-between' }}>
            <Button color="danger" onPress={handleCloseModal}>
              Reject
            </Button>
            <Button color="primary" onPress={handleCloseModal}>
              Accept
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>

  );
}

export default CreateModal;
