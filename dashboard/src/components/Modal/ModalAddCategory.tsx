import { useState } from "react";
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { category_create } from "@/service/product";
import { Form } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    onUpdateCategories: () => void;
}

const ModalAddCategory:React.FC<IProps> = ({showModal, setShowModal, onUpdateCategories}) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null); // State để kiểm tra lỗi nhập liệu

    const handleCloseModal = () => setShowModal(false);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Kiểm tra xem người dùng đã nhập đủ thông tin hay chưa
        if (!title || !image) {
            setError("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);

        try {
            const data = await category_create(formData);
            toast.success("Category created successfully!!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setShowModal(false);
            onUpdateCategories();


        } catch (error) {
            console.error("Error creating category:", error);
            toast.error("An error occurred. Please try again later.", {
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
    };

    return (
        <div>
            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                size='lg'
                style={{ top: '50px', left: '30%', transform: 'translate(-50%, -50%)' }}
            >
                <ModalContent>
                    <>
                        <ModalHeader>
                            Add Category
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control type="text" value={title} onChange={handleTitleChange} />
                                </Form.Group>
                                <Form.Group controlId="formImage">
                                    <Form.Label>Image:</Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange} />
                                </Form.Group>
                                {error && <p className="text-danger">{error}</p>}
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button color="danger" onClick={handleSubmit}>
                                Add Category
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ModalAddCategory;
