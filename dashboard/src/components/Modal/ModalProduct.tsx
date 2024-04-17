'use client'
import { useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { useSWRConfig } from "swr"
import { mutate } from "swr"
// import { FormRegisterProduct as Product } from '@/types/form_register_product';
import Product from '@/types/product';
import { product_inspect } from '@/service/product';
import { StatusProductVerification } from '../Verification/TableProduct';
//     const handleAcceptReject = (statusProductVerification: StatusProductVerification, packageItem: FormRegisterProduct) => {
//   if (statusProductVerification === StatusProductVerification.accepted) {
//     console.log("Accept");
// }
// else if (statusProductVerification === StatusProductVerification.rejected) {
//     console.log("Reject");
// }
// };
interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
  productInformation: Product;
  onAcceptReject: (statusProductVerification: StatusProductVerification, packageItem: Product) => void;
}

function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate, productInformation } = props;
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

//   const handleButton = () => {
//     console.log("Additional Text:", textAreaValue);
//     // handleCloseModal();
// };

  const handleButton = async (action: 'Reject' | 'Accept') => {
    await product_inspect(textAreaValue, productInformation.id, action)

    props.onAcceptReject(action === 'Accept' ? StatusProductVerification.accepted : StatusProductVerification.rejected, productInformation);



    handleCloseModal();
  };

  const handleCloseModal = () => setShowModalCreate(false);
  const handleShowModal = () => setShowModalCreate(true);
  // let { product_id, seller, title, images, estimate_min, estimate_max, description, dimensions, artist, category, condition_report, provenance, time_create, status } = productInformation;

  // const handleSubmit = () => {
  //   status = "complete";

  //   //call api sửa đổi trạng thái của product thành seller, be trả về với status là complete
  //   fetch("http://localhost:8000/blogs",
  //     {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       method: "POST",
  //       body: JSON.stringify({ status })
  //     })
  //     .then(function (res) {
  //       handleCloseModal();
  //       mutate("http://localhost:8000/blogs")
  //     })
  //     .catch(function (res) { console.log(res) })

  // };



  return (
    <Modal
      isOpen={showModalCreate}
      onClose={handleCloseModal}
      size='4xl'
      style={{ top: '250px', left: '35%', transform: 'translate(-50%, -50%)' }} // Đặt vị trí modal
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Verification Product</ModalHeader>
          <ModalBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="mb-0 ml-3">
              <p><strong>Product Title:</strong> {productInformation.title}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="ml-3"><strong>Seller:</strong> {productInformation.seller && productInformation.seller.name}</p>
              <p className="mr-20"><strong>Artist:</strong> {productInformation.artist}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Description:</strong> {productInformation.description}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Dimensions:</strong> {productInformation.dimensions}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='ml-3'><strong>Estimate: </strong> {productInformation.min_estimate} - {productInformation.max_estimate}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Category:</strong></p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {productInformation.categories && productInformation.categories.map((obj, index) => (
                  <div key={index}>
                    <p>{obj.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Condition:</strong> {productInformation.condition_report}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Provenance:</strong> {productInformation.provenance}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Image:</strong></p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {productInformation.images && productInformation.images.map((image, index) => (
                  <div key={index}>
                    <img src={image.url} alt="" style={{ width: '30px', height: 'auto' }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3 ml-3">
              <textarea
                value={textAreaValue}
                onChange={handleTextAreaChange}
                placeholder="Enter additional text here..."
                className="form-control"
                style={{ width: '100%', minHeight: '100px' }}
              />
            </div>
          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-between' }}>
            <Button color="danger" onPress={() => handleButton('Reject')}>
              Reject
            </Button>
            <Button color="primary"  onPress={() => handleButton('Accept')}>
              Accept
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>

  );
}

export default CreateModal;
