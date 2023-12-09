import './navbar.css'
import { useAuth0 } from "@auth0/auth0-react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {useState, useEffect} from 'react'
import { collection, addDoc, doc, query, where, onSnapshot, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import {db} from '../firebase';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDesc(e) {
    setDesc(e.target.value);
  }

  function handleChangeId(e) {
    setId(e.target.value);
  }

  async function createRoom() {
    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        name: name || null,
        desc: desc || null,
        admin: user.name,
        uid: "id" + Math.random().toString(16).slice(2) || null,
        roomImg: user.picture || null,
        createdBy: user.name || null,
        users: [{
          name: user.name || null,
          id: "id" + Math.random().toString(16).slice(2) || null,
          avatar: user.picture
        }] || null,
        messages: [{
          by: "Discreet Chat App",
          text: "Welcome to discreet Chat App. You have created the room successfully. Please follow community guidelines while chatting.",
          userAvatar: user.picture || null
        }]
      });
      setName('')
      setDesc('')
      console.log("Document written with ID: ", docRef.id);
      window.location.reload()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function joinRoom() {
    const docRef = doc(db, "rooms", id)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      docSnap.data().users.map((thisuser) => {
        if (thisuser.name === user.name) {
          return "User already in chatroom!"
        }
      })

      try {
        const documentRef = doc(db, "rooms", id);
        await updateDoc(documentRef, {
            users: arrayUnion({
              name: user.name,
              avatar: user.picture,
              id: "id" + Math.random().toString(16).slice(2) || null,
            })
        });
        window.location = `/home/id=${id}`
      } 
      catch (err) {
        console.log(err)
      }
    }
    
  }

  if (isLoading) {
    return <h1 className='welcome-msg'>Loading...</h1>
  }
  return(
    <div className='d-flex'>
      <h1>Discreet</h1>
      <div>
      <button onClick={onOpenModal} className='btn-new'>Create New Room</button>
        <Modal open={open} onClose={onCloseModal} center>
          {(!user) ?<div> <h1 className='head-modal'>Discreet - Chat App</h1>
          <button onClick={() => loginWithRedirect()} className='btn-log'>Login With Social Media</button></div> : <div><h2 className='head-modal'>Enter Room Details!</h2>
          <input value={name} onChange={handleChangeName} className='inp' type='text' placeholder='Enter Room Name' />
          <input onChange={handleChangeDesc} value={desc} className='inp' type='text' placeholder='Enter Room Description' />
          <div className='create-btn-contain'>
            <button onClick={createRoom} className='btn-create'>Create</button>
          </div> </div>}
          
        </Modal>
        {isAuthenticated ?<button onClick={onOpenModal1} className='btn-new m-l'>Join Room</button> : <span></span>}
      {isAuthenticated ?<button onClick={() => logout()} className='btn-new m-l'>Logout</button> : <span></span>}

        <Modal open={open1} onClose={onCloseModal1} center>
          {(!user) ?<div> <h1 className='head-modal'>Discreet - Chat App</h1>
          <button onClick={() => loginWithRedirect()} className='btn-log'>Login With Social Media</button></div> : <div><h2 className='head-modal'>Enter Room Details!</h2>
          <input value={name} onChange={handleChangeName} className='inp' type='text' placeholder='Enter Room Name' />
    {(open1 == true) ?<input value={id} onChange={handleChangeId} className='inp' type='text' placeholder='Enter Room ID' /> : <input onChange={handleChangeDesc} value={desc} className='inp' type='text' placeholder='Enter Room Description' />}
          <div className='create-btn-contain'>
            <button onClick={joinRoom} className='btn-create'>Join Room</button>
          </div> </div>}
        </Modal>
        </div>
    </div>
  )
}