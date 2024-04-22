import { useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { useSWRConfig } from "swr"
import { mutate } from "swr"
import { User } from '@/types/user';
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
          <div className="mb-0">
            <strong>Card Information:</strong>
          </div>
          <div className="mb-0 ml-3">
            <p><strong>Card Number:</strong> {userInformation.card?.id}</p>
          </div>
          <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className='ml-3'><strong>Expiry:</strong> {userInformation.card?.expiry}</p>
            <p className='mr-40'><strong>CVN:</strong> {userInformation.card?.cvn}</p>
          </div>
          <div className="mb-1 ml-3">
            <p><strong>Name on Card:</strong> {userInformation.card?.name}</p>
          </div>

          <div className="mb-0">
            <strong>Address Information:</strong>
          </div>
          <div className="mb-0 ml-2">
            <p><strong>Country:</strong> {userInformation.location?.country}</p>
          </div>
          <div className="mb-0 ml-3">
            <p><strong>Address:</strong> {userInformation.location?.address}</p>
          </div>
          <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className='ml-3'><strong>City:</strong> {userInformation.location?.city}</p>
            <p className='mr-40'><strong>State:</strong> {userInformation.location?.state}</p>
          </div>
          <div className="mb-0 ml-3">
            <p><strong>Postal Code:</strong> {userInformation.location?.postal_code}</p>
          </div>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-end' }}>
          <Button color="primary" onPress={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </>
    </ModalContent>
  </Modal>

);
}

export default CreateModal;
