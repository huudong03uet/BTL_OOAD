'use client'

import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTextArea } from 'mdb-react-ui-kit';
import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';

import { ChatList } from "react-chat-elements"
import MessageListComponent from './message_list';
import { message } from 'antd';
import { date } from 'zod';
import { get_user_message_service } from '@/services/component/message';
import { UserContext } from '@/services/context/UserContext';



export default function ChatSupport(
  props: {
    userNewContact: number;
  }
) {

  console.log("props.userNewContact", props.userNewContact)

  const [chatInfo, setChatInfo] = useState({
    "id": 1,
    "name": "Kursat",
    "avatar": "https://avatars.githubusercontent.com/u/80540635?v=4",
    "subtitle": "Why don't we go to the mall this weekend ?"
  })



  const [, updateState] = React.useState();

  const {user, setUser} = useContext(UserContext)
  const [dataSourceUser, setDataSourceUser] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await get_user_message_service(user?.id);
            if (Array.isArray(data)) {
              setDataSourceUser(data);
            } else {
              setDataSourceUser([])
            }
        } catch (error) {
            console.error('Error fetching upcoming online auctions:', error);
        }
    }

    fetchData()
  }, [])

  // const dataSourceUser: any[] =  [

  //   {
  //     id: 1,
  //     avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
  //     alt: 'kursat_avatar',
  //     title: 'Kursat',
  //     subtitle: "Why don't we go to the mall this weekend ?",
  //     // date: new Date(), -> 2 days ago
  //     date: new Date(new Date().setDate(new Date().getDate() - 2)),
  //     unread: unreadKursat,
  //   },
  //   {
  //     id: 2,
  //     avatar: 'https://avatars.githubusercontent.com/u/41473129?v=4',
  //     alt: 'emre_avatar',
  //     title: 'Emre',
  //     subtitle: "Send me our photos.",
  //     date: new Date(),
  //     unread: unreadEmre,
  //   },
  //   {
  //     id: 3,
  //     avatar: 'https://avatars.githubusercontent.com/u/90318672?v=4',
  //     alt: 'abdurrahim_avatar',
  //     title: 'Abdurrahim',
  //     subtitle: "Hey ! Send me the animation video please.",
  //     date: new Date(),
  //     unread: unreadAbdurrahim,
  //   },
  //   {
  //     id: 4,
  //     avatar: 'https://avatars.githubusercontent.com/u/53093667?s=100&v=4',
  //     alt: 'esra_avatar',
  //     title: 'Esra',
  //     subtitle: "I need a random voice.",
  //     date: new Date(),
  //     unread: unreadEsra,
  //   },
  //   {
  //     id: 5,
  //     avatar: 'https://avatars.githubusercontent.com/u/50342489?s=100&v=4',
  //     alt: 'bensu_avatar',
  //     title: 'Bensu',
  //     subtitle: "Send your location.",
  //     date: new Date(),
  //     unread: unreadBensu,
  //   },
  //   {
  //     id: 6,
  //     avatar: 'https://avatars.githubusercontent.com/u/80754124?s=100&v=4',
  //     alt: 'burhan_avatar',
  //     title: 'Burhan',
  //     subtitle: "Recommend me some songs.",
  //     date: new Date(),
  //     unread: unreadBurhan,
  //   },
  //   {
  //     id: 7,
  //     avatar: 'https://avatars.githubusercontent.com/u/15075759?s=100&v=4',
  //     alt: 'abdurrahman_avatar',
  //     title: 'Abdurrahman',
  //     subtitle: "Where is the presentation file ?",
  //     date: new Date(),
  //     unread: unreadAbdurrahman,
  //   },
  //   {
  //     id: 8,
  //     avatar: 'https://avatars.githubusercontent.com/u/57258793?s=100&v=4',
  //     alt: 'ahmet_avatar',
  //     title: 'Ahmet',
  //     subtitle: "Let's join the daily meeting.",
  //     date: new Date(),
  //     unread: unreadAhmet,
  //   }

  // ]


  function setReadUser(userId: any) {
    for (let i = 0; i < dataSourceUser.length; i++) {
      if (dataSourceUser[i].id === userId) {
        dataSourceUser[i].unread = 0
      }
    }

  };


  return (
    <div className={styles.demoContainer}>
      <div className={styles.leftDivContainer}>

        <div className={styles.chatDivContainer}>
          <ChatList
            id="chat-list-id"
            lazyLoadingImage="lazy-loading-image-url"
            onClick={(info: any) => {
              setReadUser(info.id)

              setChatInfo({
                "id": info.id || 1,
                "name": info.title || "Kursat",
                "avatar": info.avatar,
                "subtitle": info.subtitle || "Why don't we go to the mall this weekend ?",
              })
            }}
            className='chat-list'
            dataSource={dataSourceUser} />

        </div>
      </div>
      <div className={styles.rightDivContainer}>
        <MessageListComponent chatInfo={chatInfo} chatType="text" updateState={updateState} />
      </div>
    </div>
  )
}

// export default ChatSupport;