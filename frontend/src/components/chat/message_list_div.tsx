import React, { useEffect, useState } from 'react'
import { fileMessageExampleData, locationMessageExampleData, meetingMessageExampleData, photoMessageExampleData, spotifyMessageExampleData, textMessageExampleData, videoMessageExampleData, voiceMessageExampleData } from './message_list'
import styles from './style.module.css'
import { Avatar, MessageBox, Input, Button, MeetingMessage, MeetingLink } from "react-chat-elements"

const MessageListDiv = ({ type, chatInfo }: { type: string, chatInfo: any }) => {


    return (
        <div className={styles.MessageListDiv}>
            <MessageBox


                position={"left"}
                type={"text"}
                title={chatInfo.name}
                text={chatInfo.subtitle}
            />
            {
                textMessageExampleData.map((x, i) => {
                    return <MessageBox
                        key={i}
                        position={"right"}
                        type={"text"}
                        text={x}
                    />
                })
            }

        </div>
    )
}

export default MessageListDiv