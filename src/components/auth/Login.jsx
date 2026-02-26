import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import { QuickLogin } from "./QuickLogin"
import { useCurrentUser } from "../../context/CurrentUserContext"

export const Login = ({ setToken }) => {

// useRef is a React hook that creates a persistent reference to a DOM element.
// Unlike useState, changing a ref does NOT trigger a re-render.
//
// Here we use refs to directly access the username and password input fields.
// This allows us to read their values when the form is submitted:
//
// username.current.value
// password.current.value
//
// This is more efficient than using state for simple form inputs like login forms.
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)
  const { fetchUserData } = useCurrentUser()

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user).then(res => {
      if ("valid" in res && res.valid) {
        setToken(res.token)
        fetchUserData()
        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleLogin}>
        <h1 className="title">Rare Publishing</h1>
        <p className="subtitle">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit" >Submit</button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">Cancel</Link>
          </div>
        </div>
        {
          isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
        }
        {/* QuickLogin is a dev helper component that allows you to quickly log in as a standard user or staff user without having to type credentials. Will be removed in production. */}
        <QuickLogin setToken={setToken} />
      </form>
    </section>
  )
}
