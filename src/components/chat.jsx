import './chat.css'
import { collection, getDocs, onSnapshot, query, where, doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from '../firebase';
import {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {useParams} from 'react-router-dom'

export default function Chat(props) {

  const[rooms, setRooms] = useState([])
  const[chat, setChat] = useState("")
  let roomspe;
  let defaultUserImg = "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
  let idArr = [];
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  let DbUserId = ""

  async function getRoomData() {
    let roomsFetched = []
    const q = query(collection(db, "rooms"))
    const unsub =  onSnapshot(q, (querySnapshot) => {
      
      const docSnapshots = querySnapshot.docs
      const newData = []
       docSnapshots.forEach((doc) => {
        newData.push({...doc.data(), id:doc.id })
      })
      console.log(newData)

      setRooms(newData)
      console.log(rooms)
    })
  }
  
  useEffect(() => {
    getRoomData()
  }, [])

  function changeVal(e) {
    setChat(e.target.value)
  }

  async function sendMessage() {
    let id = props.id ? props.id : roomspe.id
    if (chat.length != 0) {
      try {
        const documentRef = doc(db, "rooms", id);
        await updateDoc(documentRef, {
            messages: arrayUnion({
              by: user.name,
              text: chat,
              avatar: user.picture,
            })
        });
        setChat("")
      } catch (err) {
        console.log(err)
      }
    }
  }

  rooms.map((room) => {
    let {id}= useParams()
    let generatedId = ""
    if (id !=null || undefined) {
      generatedId = id.replace("id=", "")
    }
    if (room.id == generatedId) {
      roomspe = room
      
    }
  })

  async function leaveRoom() {
    let id = props.id ? props.id : roomspe.id
    try {
      const documentRef = doc(db, "rooms", id);
      await updateDoc(documentRef, {
          users: arrayRemove({
            id: DbUserId,
            avatar: user.picture,
            name: user.name
          })
      });
      window.location = '/home'
    } catch (err) {
      console.log(err)
    }
  }
  if (roomspe != null || undefined) {
    roomspe.users.map((dbuser) => {
      if (dbuser.avatar == user.picture) {
        DbUserId = dbuser.id
      }
    })
  }

  let upclass = ''
  let {id} = useParams() 
  if (id== null || undefined) {
    upclass='home-page'
  }

  return(
    <div  className={`section-chat ${upclass}`}>
      <div className='chat-contain'>
        <img src={roomspe ? roomspe.roomImg : ""} />
        <div>
          <h3>{roomspe ? roomspe.name : ""}</h3>
          <h3>{roomspe ? roomspe.id : ""}</h3>
          {roomspe ? <button onClick={leaveRoom}>Leave Room</button> : ""}
        </div>
      </div>
      <div className='chats-section'>
        {roomspe ? roomspe.messages.map((message) => {
          let link = "";
          if (message.by == user.name) {
            link = 'rec-user'
          } else {
            link="msg"
          }
          return(
            <div key={message.avatar} className={link}>
              <img src={message.avatar ? message.avatar : defaultUserImg} />
              <div>
                <h4>{message ? message.by : Someone}</h4>
                <h4>{message ? message.text : Someone}</h4>
              </div>

            </div>
          )
        }) : <h1 className='text-center'>Open a room to Chat!</h1>}
      </div>
      {roomspe ? 
        <div className='chat-form'>
            <input onChange={changeVal} value={chat} placeholder='Type a message' />
            <button onClick={sendMessage}>Send</button>
          </div>
        : ""
      }
    </div>
  )
}
