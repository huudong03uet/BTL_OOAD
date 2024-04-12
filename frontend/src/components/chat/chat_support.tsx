import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTextArea } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

import { ChatList } from "react-chat-elements"
import MessageList from './message_list';



export default function ChatSupport() {

  const [unreadKursat, setUnreadKursat] = useState(0)
  const [unreadEmre, setUnreadEmre] = useState(1)
  const [unreadEsra, setUnreadEsra] = useState(1)
  const [unreadBensu, setUnreadBensu] = useState(1)
  const [unreadBurhan, setUnreadBurhan] = useState(1)
  const [unreadAbdurrahman, setUnreadAbdurrahman] = useState(1)
  const [unreadAbdurrahim, setUnreadAbdurrahim] = useState(1)
  const [unreadAhmet, setUnreadAhmet] = useState(1)


  const [chatInfo, setChatInfo] = useState({
    "name": "Kursat",
    "avatar": "https://avatars.githubusercontent.com/u/80540635?v=4",
    "subtitle": "Why don't we go to the mall this weekend ?"
  })

  // const [chatType, setChatType] = useState(() => {
  //   if (chatInfo.name === "Kursat") return "text"
  //   else if (chatInfo.name === "Emre") return "photo"
  //   else if (chatInfo.name === "Esra") return "voice"
  //   else if (chatInfo.name === "Bensu") return "location"
  //   else if (chatInfo.name === "Burhan") return "spotify"
  //   else if (chatInfo.name === "Abdurrahman") return "file"
  //   else if (chatInfo.name === "Abdurrahim") return "video"
  //   else if (chatInfo.name === "Ahmet") return "meeting"
  // })

  const [, updateState] = React.useState();
  const dataSourceUser: any[] = [

    {
      id: 1,
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: 'kursat_avatar',
      title: 'Kursat',
      subtitle: "Why don't we go to the mall this weekend ?",
      date: new Date(),
      unread: unreadKursat,
    },
    {
      id: 2,
      avatar: 'https://avatars.githubusercontent.com/u/41473129?v=4',
      alt: 'emre_avatar',
      title: 'Emre',
      subtitle: "Send me our photos.",
      date: new Date(),
      unread: unreadEmre,
    },
    {
      id: 3,
      avatar: 'https://avatars.githubusercontent.com/u/90318672?v=4',
      alt: 'abdurrahim_avatar',
      title: 'Abdurrahim',
      subtitle: "Hey ! Send me the animation video please.",
      date: new Date(),
      unread: unreadAbdurrahim,
    },
    {
      id: 4,
      avatar: 'https://avatars.githubusercontent.com/u/53093667?s=100&v=4',
      alt: 'esra_avatar',
      title: 'Esra',
      subtitle: "I need a random voice.",
      date: new Date(),
      unread: unreadEsra,
    },
    {
      id: 5,
      avatar: 'https://avatars.githubusercontent.com/u/50342489?s=100&v=4',
      alt: 'bensu_avatar',
      title: 'Bensu',
      subtitle: "Send your location.",
      date: new Date(),
      unread: unreadBensu,
    },
    {
      id: 6,
      avatar: 'https://avatars.githubusercontent.com/u/80754124?s=100&v=4',
      alt: 'burhan_avatar',
      title: 'Burhan',
      subtitle: "Recommend me some songs.",
      date: new Date(),
      unread: unreadBurhan,
    },
    {
      id: 7,
      avatar: 'https://avatars.githubusercontent.com/u/15075759?s=100&v=4',
      alt: 'abdurrahman_avatar',
      title: 'Abdurrahman',
      subtitle: "Where is the presentation file ?",
      date: new Date(),
      unread: unreadAbdurrahman,
    },
    {
      id: 8,
      avatar: 'https://avatars.githubusercontent.com/u/57258793?s=100&v=4',
      alt: 'ahmet_avatar',
      title: 'Ahmet',
      subtitle: "Let's join the daily meeting.",
      date: new Date(),
      unread: unreadAhmet,
    }

  ]


  function setReadUser(userId: any ) {
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
            onClick={(info) => {
              setReadUser(info.id)

              setChatInfo({
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
        <MessageList chatInfo={chatInfo} chatType="text" updateState={updateState} />
      </div>
    </div>
  )
}

// export default ChatSupport;