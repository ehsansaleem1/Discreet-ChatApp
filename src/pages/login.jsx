import Navbar from '../components/navbar'
import { useAuth0 } from "@auth0/auth0-react";
export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    window.location = window.location + '/home'
  }

  if (isLoading) {
    return <h1 className='welcome-msg'>Account is Loading</h1>
  }
  
  return(
    <main>
      <Navbar />
      <div className="login-page">
        <h1 className='welcome-msg'>Welcome to Discreet Chat App!</h1>
        <div className='btn-contain'>
          <button onClick={() => loginWithRedirect()} className='btn-log'>Login With Social Media</button>
        </div>
      </div>
    </main>
  )
}