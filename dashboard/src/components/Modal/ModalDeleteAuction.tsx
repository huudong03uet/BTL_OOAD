
import  Auction  from "@/types/auction";
import { useState } from "react";
import { mutate } from "swr"
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { auction_delete } from "@/service/auction";



interface IProps {
    showModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
    auctionToDelete: Auction | null;
    auctions: Auction[];
    setAuctions: (auctions: Auction[]) => void;
    onDeleteData: () => void;
}

function DeleteModal(props: IProps) {
    const { showModalDelete, setShowModalDelete, auctionToDelete, auctions, setAuctions, onDeleteData } = props;

  const handleCloseModal = () => setShowModalDelete(false);

  //call api xóa Auction, sau đó mutate lại data
  const handleConfirmDelete = async () => {
    if (auctionToDelete) {
       console.log(auctionToDelete);
        await auction_delete(auctionToDelete.id)
        onDeleteData();
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
                    <ModalBody>Are you sure you want to delete this Auction?</ModalBody>
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