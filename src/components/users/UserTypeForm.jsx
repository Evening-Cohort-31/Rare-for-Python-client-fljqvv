import { useState } from "react"
import { Container, PageHeader, Button } from "../../design"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../../services/UserService.js"
import { useCurrentUser } from "../../context/CurrentUserContext.js"

export const UserTypeForm = () => {
    const { currentUser, setCurrentUser } = useCurrentUser()
    const [userType, setUserType] = useState(currentUser?.user_type || "reader")
    const [submitError, setSubmitError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserType(e.target.value)
    }

    const handleCancel = () => {
        navigate("/users")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitError("")

        if (!currentUser) {
            setSubmitError("No user logged in.")
            return
        }

        updateUser(currentUser.id, { user_type: userType })
            .then((updatedUser) => {
                setCurrentUser(updatedUser)
                navigate("/users")
            })
            .catch((error) => {
                console.error("Failed to update user type:", error)
                setSubmitError("Failed to update user type. Please try again.")
            })
    }

    return (
        <Container>
            <PageHeader>Change User Type</PageHeader>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Select User Type</label>
                    <div className="control">
                        <div className="select">
                            <select value={userType} onChange={handleChange}>
                                <option value="reader">Reader</option>
                                <option value="author">Author</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </div>
                {submitError && <p className="help is-danger">{submitError}</p>}
                <div className="field is-grouped">
                    <div className="control">
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>
            </form>
        </Container>
    )
}   