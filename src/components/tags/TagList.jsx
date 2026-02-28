import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { getAllTags } from "../../services/TagService";
import { Button, Container, Loading, PageHeader} from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext";

export const TagList = () => {
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllTags().then(fetchedTags => {
            setTags(fetchedTags);
            setLoading(false);
        }).catch(error => {
            console.error("Failed to fetch tags:", error);
            setTags([]);
            setLoading(false);
        });
    }, []);

    if (!currentUser || !currentUser.is_staff) {
    navigate("/access-denied", { replace: true })
    return null
  }

    if (loading) {
        return <Loading />;
    }

    if (!tags.length) {
        return <p>There are no tags available. Click the button below to start adding new tags.</p>;
    }

    return (
        <Container>
            <PageHeader title="Tag List" />
                <div className="box mb-4">
                  <table className="table is-fullwidth is-striped is-hoverable">
                    <tbody>
                    {tags.map(tag => (
                        <tr key={tag.id}>
                            <td className="subtitle is-5">{tag.label}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div className="is-centered">
                    <Button className="button is-link mb-5" onClick={() => navigate("/tags/new")}>Create a Tag</Button>
                </div>
        </Container>
 
    )
}