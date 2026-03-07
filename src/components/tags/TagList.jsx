import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { getAllTags } from "../../services";
import { Button, Container, Loading, PageHeader, IconButton, Card} from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { EditTagButton } from "./EditTagButton";

export const TagList = () => {
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAndSetTags = () => {
        getAllTags().then(fetchedTags => {
            setTags(fetchedTags);
            setLoading(false);
        }       ).catch(error => {
            console.error("Failed to fetch tags:", error);
            setTags([]);
            setLoading(false);
        });
    };  

    useEffect(() => {
        getAndSetTags();
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
            <PageHeader title="Tags" />
               
                    {tags.map(tag => (
                        <Card key={tag.id}>
                                 <article className="media">
                                   {/* Left: icon buttons */}
                                   <div className="media-left">
                                     <div className="buttons are-small">
                                       <EditTagButton
                                          icon="gear"
                                          title="Edit tag"
                                          tagId={tag.id}
                                          onUpdate={getAndSetTags}
                                          />
                                       <IconButton
                                         icon="trash"
                                         title="Delete tag"
                                         onClick={() => {}}
                                       />
                                     </div>
                                   </div>
                       
                                   {/* Main: tag label */}
                                   <div className="media-content">
                                     <div className="content">
                                       <p className="mb-0">
                                         <span className="has-text-weight-semibold">{tag.label}</span>
                                       </p>
                                     </div>
                                   </div>
                                 </article>
                        </Card>
                    ))}
                <div className="mt-4 mb-4">
                    <Button color="primary" onClick={() => navigate("/tags/new")}>Create a Tag</Button>
                </div>
        </Container>
 
    )
}