import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import { useCurrentUser } from "../../context/CurrentUserContext"
import { FormField, Notification } from "../../design"

export const Login = ({ setToken }) => {
  const { fetchUserData } = useCurrentUser()
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

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

        <FormField label="Username" inputRef={username} />
        <FormField label="Password" type="password" inputRef={password} />

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit" >Submit</button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">Cancel</Link>
          </div>
        </div>
        {
          isUnsuccessful
            ? <Notification type="danger" message="Username or password not valid" onClose={() => setisUnsuccessful(false)} />
            : ''
        }
      </form>
    </section>
  )
}
