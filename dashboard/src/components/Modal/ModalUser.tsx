import { useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { useSWRConfig } from "swr"
import { mutate } from "swr"
import { User } from '@/types/user';
import Seller from '@/types/seller';
interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
  userInformation: User;
}

function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate, userInformation } = props;

  const handleCloseModal = () => setShowModalCreate(false);
  const handleShowModal = () => setShowModalCreate(true);


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
    size='lg'
    style={{ top: '250px', left: '30%', transform: 'translate(-50%, -50%)' }} // Đặt vị trí modal
  >
    <ModalContent>
      <>
        <ModalHeader className="flex flex-col gap-1">User Info</ModalHeader>
        <ModalBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <div className="mb-0">
            <strong>Seller Information:</strong>
          </div>
          <div className="mb-0 ml-3">
            <p><strong>Seller Name:</strong> {userInformation.first_name + " " + userInformation.last_name}</p>
          </div>
          <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="ml-3"><strong>Email:</strong> {userInformation.email}</p>
            <p className="mr-20"><strong>Phone Number:</strong> {userInformation.phone}</p>
          </div>
          <div className="mb-1 ml-3">
            <p><strong>Description:</strong> {}</p>
          </div>
          <div className="mb-0">
            <strong>Card Information:</strong>
          </div>
          <div className="mb-0 ml-3">
            <p><strong>Card Number:</strong> {}</p>
          </div>
          <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className='ml-3'><strong>Expiry:</strong> {}</p>
            <p className='mr-40'><strong>CVN:</strong> {}</p>
          </div>
          <div className="mb-1 ml-3">
            <p><strong>Name on Card:</strong> {}</p>
          </div>

          <div className="mb-0">
            <strong>Address Information:</strong>
          </div>
          <div className="mb-0 ml-2">
            <p><strong>Country:</strong> {}</p>
          </div>
          <div className="mb-0 ml-3">
            <p><strong>Address:</strong> {}</p>
          </div>
          <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className='ml-3'><strong>City:</strong> {}</p>
            <p className='mr-40'><strong>State:</strong> {}</p>
          </div>
          <div className="mb-0 ml-3">
            <p><strong>Postal Code:</strong> {}</p>
          </div>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-end' }}>
          <Button color="primary" onPress={handleCloseModal}>
            Lock/Unlock
          </Button>
        </ModalFooter>
      </>
    </ModalContent>
  </Modal>

);
}

export default CreateModal;
