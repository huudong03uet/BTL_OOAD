import { User } from "@/types/user";
import { useState } from "react";
import { mutate } from "swr"
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';



interface IProps {
    showModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
    userToDelete: User | null;
    users: User[];
    setUsers: (users: User[]) => void;
}

function DeleteModal(props: IProps) {
    const { showModalDelete, setShowModalDelete, userToDelete, users, setUsers } = props;

  const handleCloseModal = () => setShowModalDelete(false);

  //call api xóa user, sau đó mutate lại data
  const handleConfirmDelete = () => {
    if (userToDelete) {
        // call api xóa user
       console.log(userToDelete);
       mutate("http://localhost:8000/blogs")
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
                    <ModalBody>Are you sure you want to delete this user?</ModalBody>
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