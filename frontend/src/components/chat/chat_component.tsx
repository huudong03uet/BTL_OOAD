import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTextArea } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import ChatSupport from './chat_support';
import { ChatIcon } from '@livekit/components-react';
import { Button, Fab } from '@mui/material';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
export default function ChatComponent() {
    const [openChat, setOpenChat] = useState(false);

    const handleClickOpen = () => {
        setOpenChat(true);
    };

    const handleClose = () => {
        setOpenChat(false);
    };
    // Đây là phần logic của chat support, bạn có thể thay đổi theo ý muốn
    return (
        // <div >
        //     <div style={{ position: 'fixed', zIndex: '9999', bottom: '100px', right: '40px', height: "500px", width: '700px' }}>
        //         {openChat && <ChatSupport />}

        //     </div>

        //     <Fab color="primary" aria-label="add" onClick={handleClickOpen}
        //         style={{ position: 'fixed', zIndex: '9999', bottom: '40px', right: '40px' }}>
        //         <ChatIcon />
        //     </Fab>
        // </div>
        <div >
            {/* <div  style={{ position: 'fixed', zIndex: '9999', bottom: '60px', right: '30px', height: "500px", width: '700px' }}>
                    <div hidden={!openChat}>
                        <div>
                            <Button onClick={handleClose}>Close</Button>

                        </div>
                        <ChatSupport />
                    </div>
            </div> */}
            <div style={{
                position: 'fixed',
                zIndex: '9999',
                bottom: '30px',
                right: '30px',
                height: "500px",
                width: '700px',
                boxSizing: 'border-box',
                borderRadius: '4px 4px 0 0',
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                boxShadow: '0 0 18px 0 rgba(0,0,0,.422)',
                transform: 'translateX(0)',
                transition: 'width .25s cubic-bezier(.4,.8,.74,1)'
            }}  hidden={!openChat}>
                <div style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'white'
                }}>
                    <div className='d-flex justify-content-between align-items-center px-3' style={{ borderBottom: '1px solid #e0e0e0', height: "8%" }}>
                        <div>
                            Chat
                        </div>
                        <Button  onClick={handleClose}><CancelPresentationIcon color='error' /></Button>
                        {/* <Button onClick={handleClose} style={{ float: 'right' }}><CancelPresentationIcon /></Button> */}
                    </div>
                    <ChatSupport />
                </div>
            </div>


            <Fab color="primary" aria-label="add" onClick={handleClickOpen} hidden={openChat}
                style={{ position: 'fixed', zIndex: '9999', bottom: '30px', right: '30px' }}>
                <ChatIcon />
            </Fab>
        </div>
    );
}

// export default ChatSupport;