import React, { useEffect, useState, useRef } from 'react'
import styles from './style.module.css'
import { Avatar, Input, Button, MessageList } from "react-chat-elements"
import { date } from 'zod'

let clearRef = () => { }

// export const textMessageExampleData: any[] = [
// ]


const messageList: any[] = [
    {
        position: "left",
        type: "text",
        title: "Kursat",
        text: "Give me a message list example !",
        // date: new Date(),
        // set random date-> 2 days ago
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
        position: "right",
        type: "text",
        // title: "Emre",
        text: "That's all.",
        // date: new Date(),   
        // set random date-> 1 day ago
        date: new Date(new Date().setDate(new Date().getDate() - 1)),

    },

    {
        position: "left",
        type: "text",
        title: "Kursat",
        text: "Thank you !",
        // date: new Date(),
        // set random date-> 1 hour ago
        date: new Date(new Date().setHours(new Date().getHours() - 1)),
    },
    {
        position: "right",
        type: "text",
        // title: "Emre",
        text: "You're welcome.",
        // date: new Date(),
        // set random date-> 30 minutes ago
        date: new Date(new Date().setMinutes(new Date().getMinutes() - 30)),
    },
    {
        position: "left",
        type: "text",
        title: "Kursat",
        text: "Goodbye !",
        // date: new Date(),
        // set random date-> 10 minutes ago
        date: new Date(new Date().setMinutes(new Date().getMinutes() - 10)),
    },
    {
        position: "right",
        type: "text",
        // title: "Emre",
        text: "Goodbye !",
        date: new Date(),
    },
]

const MessageListComponent = ({ chatInfo, chatType, updateState }: { chatInfo: any, chatType: any, updateState: any }) => {
    const messageInput = useRef(null);
    const [inputValue, setInputValue] = useState("")


    const [messageListState, setMessageListState] = useState(messageList)

    const clearInput = () => {
        setInputValue(""); // Reset input value to empty string
        if (messageInput.current) {
            (messageInput.current as HTMLInputElement).value = ''; // Clear input field
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
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            if (inputValue !== "") {
                                // textMessageExampleData.push(inputValue)
                                messageListState.push({
                                    position: "right",
                                    type: "text",
                                    // title: "Emre",
                                    text: inputValue,
                                })
                                clearInput();
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
                                    // textMessageExampleData.push(inputValue)
                                    messageListState.push({
                                        position: "right",
                                        type: "text",
                                        // title: "Emre",
                                        text: inputValue,
                                    })
                                    clearInput();
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

export default MessageListComponent