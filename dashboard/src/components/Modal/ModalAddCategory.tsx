import { User } from "@/types/user";
import { useState } from "react";
import { mutate } from "swr"
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { Form } from "react-bootstrap";
import { category_create } from "@/service/product";

interface IProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

function ModalAddCategory(props: IProps) {
    const { showModal, setShowModal } = props;
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<File | null>(null);

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

        const formData = new FormData();
        formData.append('title', title);
        if (image) {
            formData.append('image', image);
        } else {
            return;
        }

        await category_create(formData)
    };

    return (

        <Modal
            isOpen={showModal}
            onClose={handleCloseModal}
            size='lg'
            style={{ top: '50px', left: '30%', transform: 'translate(-50%, -50%)' }} // Đặt vị trí modal
        >
            <ModalContent>
                <>
                    <ModalHeader>
                        Add Category
                    </ModalHeader>
                    <ModalBody><label>
                        Title:
                        <input type="text" value={title} onChange={handleTitleChange} />
                    </label>
                        <div className="row">
                            <div className="col-12">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
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
    );
}
export default ModalAddCategory;