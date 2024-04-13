import { useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { useSWRConfig } from "swr"
import { mutate } from "swr"
import { FormRegisterProduct } from '@/types/form_register_product';

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
  productInformation: FormRegisterProduct;
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

  const handleButton = (action: 'Reject' | 'Accept') => {
    if (action === 'Accept') {
        console.log("Additional Text:", textAreaValue);
        // Đây là nơi bạn có thể xử lý khi người dùng chọn "Accept"
    } else if (action === 'Reject') {
        // Đây là nơi bạn có thể xử lý khi người dùng chọn "Reject"
    }
    handleCloseModal();
  };

  const handleCloseModal = () => setShowModalCreate(false);
  const handleShowModal = () => setShowModalCreate(true);

  let { product_id, seller, title, images, estimate_min, estimate_max, description, dimensions, artist, category, condition_report, provenance, time_create, status } = productInformation;

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
      size='lg'
      style={{ top: '250px', left: '30%', transform: 'translate(-50%, -50%)' }} // Đặt vị trí modal
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Verification Product</ModalHeader>
          <ModalBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="mb-0 ml-3">
              <p><strong>Product Title:</strong> {title}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="ml-3"><strong>Seller:</strong> {seller && seller.name}</p>
              <p className="mr-20"><strong>Artist:</strong> {artist}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Description:</strong> {description}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Dimensions:</strong> {dimensions}</p>
            </div>
            <div className="mb-0 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='ml-3'><strong>Estimate: </strong> {estimate_min} - {estimate_max}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Category:</strong></p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {category && category.map((obj, index) => (
                  <div key={index}>
                    <p>{obj.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Condition:</strong> {condition_report}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Provenance:</strong> {provenance}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Image:</strong></p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {images && images.map((image, index) => (
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
