import { useState } from "react";
import { mutate } from "swr"
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import Category from "@/types/category";
import axios from "axios";
import { HOST } from "@/service/host";

interface IProps {
    showModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
    categories: Category[];
    categoryToDelete: Category| undefined;
    setCategories: (categories: Category[]) => void;
    
}

function DeleteModal(props: IProps) {
    const { showModalDelete, setShowModalDelete, categoryToDelete, categories, setCategories } = props;

  const handleCloseModal = () => setShowModalDelete(false);

  //call api xóa user, sau đó mutate lại data
  const handleConfirmDelete = async () => {
    try {
        if (categoryToDelete) {
            // Call API to delete category
            const response = await axios.post(`${HOST}/product/admin/delete_category`, {
                category_id: categoryToDelete.id // Pass categoryId to API endpoint
            });

            // Check if the category is successfully deleted
            if (response.status === 200) {
                const updatedCategories = categories.filter(category => category.id !== categoryToDelete.id);
                setCategories(updatedCategories);
                mutate("http://localhost:8000/blogs")
            }
        }
        handleCloseModal();
    } catch (error) {
        console.error('Error deleting category:', error);
    }
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
                    <ModalBody>Are you sure you want to delete this category?</ModalBody>
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