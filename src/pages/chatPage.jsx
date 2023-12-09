import Navbar from '../components/navbar'
import Chats from '../components/chats'
import Chat from '../components/chat'
import { useAuth0 } from "@auth0/auth0-react";
import { useParams} from "react-router-dom"

export default function ChatPage() {
  const {isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <h1 className='welcome-msg'>Verifying Account!</h1>
  }

  if (!isAuthenticated) {
    window.location = '/';
  }

  let {id} = useParams()
  let newId = ""
  if (id) {
    newId = id.replace("id=", "")
  }
  console.log(newId)

  return(
    <div>
      {(isAuthenticated) ? <main>
        <Navbar />
        <div className="container">
          <Chats />
          {(newId) ?<Chat id={newId} /> :  <div></div>}
        </div>
      </main> : <h1>Please login to view this page.</h1>}
    </div>

  )
}