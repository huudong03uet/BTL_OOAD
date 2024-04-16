import { useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { useSWRConfig } from "swr"
import { mutate } from "swr"
import { FormRegisterAuction } from '@/types/auction';

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
  auctionInformation: FormRegisterAuction;
}

function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate, auctionInformation } = props;

  const handleCloseModal = () => setShowModalCreate(false);
  const handleShowModal = () => setShowModalCreate(true);

  let { image_path, time, seller_name, auction_room_name, address, number_watching, number_review, images, status } = auctionInformation;

  const handleSubmit = () => {
    status = "complete";

    //call api sửa đổi trạng thái của product thành seller, be trả về với status là complete
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
          <ModalHeader className="flex flex-col gap-1">Verification Product</ModalHeader>
          <ModalBody style={{ maxHeight: '300px', overflowY: 'auto' }}>

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
