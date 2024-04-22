import { HOST } from '@/service/host';
import { Seller } from '@/types/seller';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
  sellerInformation: Seller;


}

function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate, sellerInformation } = props;

  const handleCloseModal = () => setShowModalCreate(false);
  const handleShowModal = () => setShowModalCreate(true);

  // let { seller_id, name, email, phoneNumber, description, card_number, expiry, cvn, nameOnCard, country, address, city, state, time_create, status } = sellerInformation;


  const handleSubmit = async (newStatus: string) => {
      handleCloseModal();
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
          <ModalHeader className="flex flex-col gap-1">Seller</ModalHeader>
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
            <div className="mb-0 ml-3">
              <p><strong>Card Number:</strong> {sellerInformation.card?.id}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='ml-3'><strong>Expiry:</strong> {sellerInformation.card?.expiry}</p>
              <p className='mr-40'><strong>CVN:</strong> {sellerInformation.card?.cvn}</p>
            </div>
            <div className="mb-1 ml-3">
              <p><strong>Name on Card:</strong> {sellerInformation.card?.name}</p>
            </div>

            <div className="mb-0">
              <strong>Address Information:</strong>
            </div>
            <div className="mb-0 ml-2">
              <p><strong>Country:</strong> {sellerInformation.location?.country}</p>
            </div>  
            <div className="mb-0 ml-3">
              <p><strong>Address:</strong> {sellerInformation.location?.address}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='ml-3'><strong>City:</strong> {sellerInformation.location?.city}</p>
              <p className='mr-40'><strong>State:</strong> {sellerInformation.location?.state}</p>
            </div>
          </ModalBody>
          <ModalFooter style={{ }}>
            <Button color="primary" onPress={() => handleSubmit('accepted')}>
              Close
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>

  );
}

export default CreateModal;
