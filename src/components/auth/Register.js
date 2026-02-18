import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import { FormField, FormTextarea, ConfirmDialog } from "../../design"

export const Register = ({setToken}) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value
      }

      registerUser(newUser)
        .then(res => {
          if ("valid" in res && res.valid) {
            setToken(res.token)
            navigate("/")
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleRegister}>
      <h1 className="title">Rare Publishing</h1>
        <p className="subtitle">Create an account</p>

        <FormField label="First Name" inputRef={firstName} />
        <FormField label="Last Name" inputRef={lastName} />
        <FormField label="Username" inputRef={username} />
        <FormField label="Email" type="email" inputRef={email} />

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
          </div>
        </div>

        <FormTextarea label="Bio" placeholder="Tell us about yourself..." inputRef={bio} />

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">Cancel</Link>
          </div>
        </div>

      </form>

      <ConfirmDialog
        dialogRef={passwordDialog}
        title="Password Mismatch"
        message="The passwords you entered do not match. Please try again."
      />
    </section>
  )
}
