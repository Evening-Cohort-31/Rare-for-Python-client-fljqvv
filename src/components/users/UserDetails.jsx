import { Button, Card, Container } from "../../design"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUserById } from "../../services"

export const UserDetails = () => {

    const {userId} = useParams()
    const [author, setAuthor] = useState({})

    useEffect(()=>{
        getUserById(parseInt(userId)).then((fetchedAuthor) => {
        setAuthor(fetchedAuthor)})
    },[userId])

    const formatDate = (dateString) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <Container>
            <Card>
                <div className="columns">
                    <div className="column is-3">
                        <img src={author.profile_image_url} alt={`${author.first_name} ${author.last_name}`} className="mb-4 rounded-full w-32 h-32 object-cover" />
                        <p className="has-text-grey is-size-10 mb-2">{author.first_name} {author.last_name}</p>
                    </div>
                    <div className="column is-3">
                        <h2 className="title">{author.username}</h2>
                        <p><strong>Member Since:</strong> {formatDate(author.created_on)}</p>
                        <p><strong>Email:</strong> {author.email}</p>
                        <p><strong>Profile Type:</strong> {author.is_staff ? "Admin" : "Author"}</p>
                        <Link to={`/users/${author.id}/posts`} className="has-text-link">View Posts (Coming Soon Ticket #35)</Link>
                    </div>
                    <div className="column is-3 has-text-right">
                        <Button variant="primary" className="mb-4" title="Subscribe to this author(coming soon Ticket #31)">Subscribe</Button>
                    </div>
                </div>
            </Card>
        </Container>
    )
         
  }