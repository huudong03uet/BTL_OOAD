import React, { useEffect, useState, useRef } from 'react'
import styles from './style.module.css'
import { Avatar, MessageBox, Input, Button } from "react-chat-elements"
import MessageListDiv from './message_list_div';
// import MessageListDiv from './MessageListDiv'

let clearRef = () => { };

export const textMessageExampleData: any[] = [
]

export const photoMessageExampleData: any[] = [
]

export const voiceMessageExampleData: any[] = [
]

export const locationMessageExampleData: any[] = [
]

export const spotifyMessageExampleData: any[] = [
]

export const fileMessageExampleData: any[] = [
]

export const videoMessageExampleData: any[] = [
]

export const meetingMessageExampleData: any[] = [
]


const MessageList = ({ chatInfo, chatType, updateState }: { chatInfo: any, chatType: any, updateState: any }) => {
    const messageInput = useRef(null);
    const [inputValue, setInputValue] = useState("")
    return (
        <div className={styles.messageListContainer}>
            <div className={styles.chatInfoDiv}>
                <Avatar
                    src={chatInfo.avatar}
                    alt="avatar"
                    size="large"
                    type="circle"
                />
                <div className={styles.chatInfoArea}>
                    <label className={styles.nameLabel}>
                        {chatInfo.name}
                    </label>
                    <label className={styles.statusLabel}>
                        Online
                    </label>
                </div>
            </div>
            <div className={styles.chatMessageListDiv}>
                <MessageListDiv type={chatType} chatInfo={chatInfo} />
            </div>
            <div className={styles.chatFooterDiv}>
                <Input
                    maxHeight={200}
                    className="inputStyle"
                    placeholder="Type here..."
                    multiline={false}
                    referance={messageInput}
                    clear={(clear: any) => clearRef = clear}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            if (inputValue !== "") {
                                textMessageExampleData.push(inputValue)
                                clearRef();
                                updateState([]);
                            }
                        }
                    }}
                    onChange={(event: any) => setInputValue(event.target.value)}
                    rightButtons={
                    
                    <Button 
                    text=">" 
                    className="sendButton" 
                    onClick={() => {
                        if (inputValue !== "") {
                            textMessageExampleData.push(inputValue)
                            clearRef();
                            updateState([]);
                        }
                    }} 
                   />
                
                
                
                }
                />
            </div>
        </div>
    )
}

export default MessageList