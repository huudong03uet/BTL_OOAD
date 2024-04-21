'use client'
import { useContext, useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { useSWRConfig } from "swr"
import { mutate } from "swr"
// import { FormRegisterProduct as Product } from '@/types/form_register_product';
import Product from '@/types/product';
import { product_inspect } from '@/service/product';
import { StatusProductVerification } from '../Verification/TableProduct';
import { AdminContext } from '@/context/AdminContext';
import { toast } from 'react-toastify';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const { admin, setAdmin } = useContext(AdminContext);
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

    if (textAreaValue === "") {
      toast.error('Please enter additional comment!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      await product_inspect(textAreaValue, productInformation.id, action, admin?.id)

      props.onAcceptReject(action === 'Accept' ? StatusProductVerification.accepted : StatusProductVerification.rejected, productInformation);

      if (action === 'Accept') {
        toast.success('Accept successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error('Reject successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      handleCloseModal();
    }
  };

  const handleCloseModal = () => setShowModalCreate(false);
  const handleShowModal = () => setShowModalCreate(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

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
      size='5xl'
      style={{ top: '220px', left: '35%', transform: 'translate(-50%, -50%)' }} // Đặt vị trí modal
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Verification Product</ModalHeader>
          <ModalBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="mb-0 ml-3">
              <p><strong>Product Title:</strong> {productInformation.title}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Seller:</strong>{productInformation.seller && productInformation.seller.name}</p>
            </div>
            <div className="mb-0 ml-3">
              <p><strong>Artist:</strong>{productInformation.artist}</p>
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
              {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {productInformation.images && productInformation.images.map((image, index) => (
                  <div key={index}>
                    <img src={image.url} alt="" style={{ width: '100px', height: 'auto' }} />
                  </div>
                ))}
              </div> */}
              <div>
                {productInformation.images && (
                  <Slider {...settings}>
                    {productInformation.images.map((image, index) => (
                      <div key={index}>
                        <img src={image.url} alt="" style={{ width: '200px', height: 'auto' }} />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
            <div className="mb-3 ml-3">
              <textarea
                value={textAreaValue}
                onChange={handleTextAreaChange}
                placeholder="Enter additional comment here..."
                className="form-control"
                style={{
                  marginTop: '0.7rem',
                  width: '100%',
                  minHeight: '100px',
                  border: '1px solid #ced4da',
                  borderRadius: '0.25rem',
                  padding: '0.375rem 0.75rem',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  color: '#495057',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter style={{ justifyContent: 'space-between' }}>
            <Button color="danger" onPress={() => handleButton('Reject')}>
              Reject
            </Button>
            <Button color="primary" onPress={() => handleButton('Accept')}>
              Accept
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
export default CreateModal;