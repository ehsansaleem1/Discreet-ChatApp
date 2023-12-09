import Navbar from '../components/navbar'
import Chats from '../components/chats'
import Chat from '../components/chat'
import { useAuth0 } from "@auth0/auth0-react";

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <h1 className='welcome-msg'>Verifying Account!</h1>
  }

  if (!isAuthenticated) {
    window.location = '/';
  }

  return (
    <div>
      {(isAuthenticated) ? <main>
        <Navbar />
        <div className="container">
          <Chats />
          <Chat />
        </div>
      </main> : <h1>Please login to view this page.</h1>}
    </div>

  )
}