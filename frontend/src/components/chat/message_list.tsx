'use client'
import React, { useEffect, useState, useRef } from 'react'
import styles from './style.module.css'
import { Avatar, Input, Button, MessageList } from "react-chat-elements"
import { date } from 'zod'
import { get_message_service, send_message_service } from '@/services/component/message'

let clearRef = () => { }

const MessageListComponent = ({ chatInfo, chatType, updateState }: { chatInfo: any, chatType: any, updateState: any }) => {
    const messageInput = useRef(null);
    const [inputValue, setInputValue] = useState("")


    const [messageListState, setMessageListState] = useState<any[]>([])

    const clearInput = () => {
        setInputValue(""); // Reset input value to empty string
        if (messageInput.current) {
            (messageInput.current as HTMLInputElement).value = ''; // Clear input field
        }
    };

    const [messageList, setMessageList] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_message_service(chatInfo.id);
                if (Array.isArray(data)) {
                    setMessageListState(data);
                } else {
                    setMessageListState([])
                }
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        }

        fetchData()
    }, [chatInfo.id])

    const sendMessage = async () => {
        if (inputValue.trim() !== "") {
            const newMessage = {
                position: "right",
                type: "text",
                text: inputValue,

                date: new Date(),
            };
            setMessageListState(prevState => [...prevState, newMessage]);
            await send_message_service(chatInfo.id, inputValue)
            clearInput();
            updateState([]);
        }
    };


    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     console.log(event)
    //     if (event.keyCode === 13) {
    //         event.preventDefault();
    //         sendMessage();
    //     }
    // };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if ((event as React.KeyboardEvent<HTMLInputElement>).key == "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

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
                {/* <MessageListDiv type={chatType} chatInfo={chatInfo} /> */}
                <MessageList
                    className='message-list'
                    // lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={messageListState}
                />
            </div>
            <div className={styles.chatFooterDiv}>
                <Input
                    maxHeight={200}
                    className="inputStyle"
                    placeholder="Type here..."
                    multiline={false}
                    referance={messageInput}
                    clear={clearInput}
                    onKeyDown={(event) => handleKeyDown(event)}
                    // onKeyDown={(event) => {
                    //     if (event.keyCode === 13) {
                    //         if (inputValue !== "") {
                    //             // textMessageExampleData.push(inputValue)
                    //             messageListState.push({
                    //                 position: "right",
                    //                 type: "text",
                    //                 // title: "Emre",
                    //                 text: inputValue,
                    //             })
                    //             clearInput();
                    //             updateState([]);
                    //         }
                    //     }
                    // }}
                    onChange={(event: any) => setInputValue(event.target.value)}
                    rightButtons={
                        <Button
                            text=">"
                            className="sendButton"
                            onClick={sendMessage}
                        />
                    }
                    // rightButtons={

                    //     <Button
                    //         text=">"
                    //         className="sendButton"
                    //         onClick={() => {
                    //             if (inputValue !== "") {
                    //                 // textMessageExampleData.push(inputValue)
                    //                 messageListState.push({
                    //                     position: "right",
                    //                     type: "text",
                    //                     // title: "Emre",
                    //                     text: inputValue,
                    //                 })
                    //                 clearInput();
                    //                 updateState([]);
                    //             }
                    //         }}
                    //     />



                    // }
                />
            </div>
        </div>
    )
}

export default MessageListComponent