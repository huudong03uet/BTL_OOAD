import { User } from "@/types/user";
import { useState } from "react";
import { mutate } from "swr"
import { Modal, ModalContent, ModalFooter, ModalHeader, Button, ModalBody } from '@nextui-org/react';
import { Form } from "react-bootstrap";

interface IProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

function ModalAddCategory(props: IProps) {
    const { showModal, setShowModal } = props;
    const [title, setTitle] = useState('');

    const handleCloseModal = () => setShowModal(false);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log(title);


        //call api tạo category
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
                                <Form.Label>Image of products</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Image"
                                    name="firstName"
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