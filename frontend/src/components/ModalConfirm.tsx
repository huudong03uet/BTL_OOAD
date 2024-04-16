import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap'; // or your preferred modal library

interface ModalConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
  show: boolean; // Prop to control modal visibility
}

const ModalConfirm: FC<ModalConfirmProps> = ({ onConfirm, onCancel, show }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header>
        {/* <Modal.Title>Xác nhận đăng xuất</Modal.Title> */}
        <Modal.Title>Confirm sign out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Bạn có chắc chắn muốn đăng xuất? */}
        Are you sure you want to sign out?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {/* Hủy */}
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {/* Xác nhận */}
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
