import './chats.css'
import { collection, getDocs, query } from "firebase/firestore";
import {db} from '../firebase';
import {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useParams} from 'react-router-dom';


export default function Chats() {
  const[rooms, setRooms] = useState([])
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  async function getRooms() {
    await getDocs(collection(db, "rooms"))
    .then((querySnapshot)=>{               
        const newData =  querySnapshot.docs
      .map((doc) => ({...doc.data(), id:doc.id }));
        setRooms(newData)
    })
  }

  useEffect(()=>{
      getRooms();
  }, [])

  let userRooms = []

  rooms.map((room) => {
    room.users.map((userdb) => {
      if(userdb.name === user.name) {
        userRooms.push(room)
      }
    })
  })

  console.log(userRooms)

  function sendredirect(id) {
    let link = `/home/id=${id}`
    window.location = link
  }

  let {id} = useParams()
  let chatclass = ''

  if (id) {
    chatclass = 'chat-page'
  }
  
  return(
    <div  className={`section-chats ${chatclass}`}>
      <h1 className='t-center'>Chatrooms</h1>
      
        {userRooms.map((room) => {
          return(
            <div onClick={() => {sendredirect(room.id)}} key={room.id} className='rooms-contain'>
                <img src={room.roomImg} />
                <div>
                  <h1>{room.name}</h1>
                </div>
            </div>
          )
        })}
      
    </div>
  )
}