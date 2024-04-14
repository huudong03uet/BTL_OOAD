
import { ProductDetail } from "@/types/product_detail";
import { useState } from "react";
import { mutate } from "swr"
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { product_delete } from "@/service/product";



interface IProps {
    showModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
    ProductToDelete: ProductDetail | null;
    Products: ProductDetail[];
    setProducts: (Products: ProductDetail[]) => void;
}

function DeleteModal(props: IProps) {
    const { showModalDelete, setShowModalDelete, ProductToDelete, Products, setProducts } = props;

  const handleCloseModal = () => setShowModalDelete(false);

  //call api xóa Product, sau đó mutate lại data
  const handleConfirmDelete = async () => {
    if (ProductToDelete) {
       console.log(ProductToDelete);
        await product_delete(ProductToDelete.id)

    }
    handleCloseModal();
  };
    return (

        <Modal
            isOpen={showModalDelete}
            onClose={handleCloseModal}
            size='lg'
            style={{ top: '50px', left: '30%', transform: 'translate(-50%, -50%)' }} // Đặt vị trí modal
        >
            <ModalContent>
                <>
                    <ModalHeader>
                        Confirm Delete
                    </ModalHeader>
                    <ModalBody>Are you sure you want to delete this product?</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button color="danger" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}
export default DeleteModal;