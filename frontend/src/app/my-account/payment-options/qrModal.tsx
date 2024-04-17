import { Modal } from 'react-bootstrap';
import style from '../style.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import debounce from 'lodash/debounce'; // Assuming you have lodash installed

interface Props {
    showModalQRScan: boolean;
    handleCloseModalQRScan: () => void;
}

const QRModal: React.FC<Props> = ({ showModalQRScan, handleCloseModalQRScan }) => {
  const [currency, setCurrency] = useState(0);
  const [secretCode, setSecretCode] = useState('');

  

  const apiUrl = `https://api.sieuthicode.net`; 

  useEffect(() => {
    const intervalId = setInterval(async () => {
        console.log(1)
        try {
            const response = await axios.get(`https://api.sieuthicode.net/historyapibidv/0516cdf8e61ea3383345bc72954e2f0f`);
            const data = await response.data;
            console.log(data);
            setCurrency(data.currency);
          } catch (error) {
            console.log('Error fetching currency, but silently handled.', error);
          }
      }, 5000);
  
    return () => clearInterval(intervalId);
  }, []); 
  

  return (
    <Modal show={showModalQRScan} onHide={handleCloseModalQRScan} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Scan QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add QR code integration here (optional) */}
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <button type="button" className="btn btn-dark" disabled>
          Waiting for scan
        </button>
        <p className="mx-3" onClick={handleCloseModalQRScan}>Cancel</p>
      </Modal.Footer>
    </Modal>
  );
};

export default QRModal;
