import { Button, Card, Container, Loading } from "../../design";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserById } from "../../services";
import { ProfileImage } from "./ProfileImage.jsx";

export const UserDetails = () => {
  const { userId } = useParams();
  const [author, setAuthor] = useState(null);
  // Loading state to handle ProfileImage's internal loading state and avoid showing "No user data" message while fetching
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUserById(parseInt(userId))
      .then((fetchedAuthor) => setAuthor(fetchedAuthor))
      .finally(() => setLoading(false));
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Card>
        <div className="columns">
          <div className="column is-3 has-text-centered">
    <h2 className="title is-4 mb-2">
        {author.first_name} {author.last_name}
    </h2>

    {/* profile image selector */}
    <ProfileImage user={author} />

    <p className="has-text-grey is-size-7 mt-2">
        @{author.username}
    </p>
</div>
          <div className="column is-3">
            <h2 className="title">{author.username}</h2>
            <p>
              <strong>Member Since:</strong> {formatDate(author.created_on)}
            </p>
            <p>
              <strong>Email:</strong> {author.email}
            </p>
            <p>
              <strong>Profile Type:</strong>{" "}
              {author.is_staff ? "Admin" : "Author"}
            </p>
            <Link to={`/users/${author.id}/posts`} className="has-text-link">
              View Posts (Coming Soon Ticket #35)
            </Link>
          </div>
          <div className="column is-3 has-text-right">
            <Button
              variant="primary"
              className="mb-4"
              title="Subscribe to this author(coming soon Ticket #31)"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
};
