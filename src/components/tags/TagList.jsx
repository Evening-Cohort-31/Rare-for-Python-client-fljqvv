import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//Ticket #18 Added deleteTag import
import { getAllTags, deleteTag } from "../../services/TagService";
import {
  Button,
  Container,
  Loading,
  PageHeader,
  IconButton,
  Card,
  ConfirmDialog,
} from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { EditTagButton } from "./EditTagButton";

export const TagList = () => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const dialogRef = useRef(null);

  const getAndSetTags = () => {
    getAllTags()
      .then((fetchedTags) => {
        setTags(fetchedTags);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch tags:", error);
        setTags([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAndSetTags();
  }, []);

  if (!currentUser || !currentUser.is_staff) {
    navigate("/access-denied", { replace: true });
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (!tags.length) {
    return (
      <p>
        There are no tags available. Click the button below to start adding new
        tags.
      </p>
    );
  }

  const handleConfirmDelete = () => {
    deleteTag(selectedTagId).then((response) => {
      const updatedTags = tags.filter((tag) => tag.id !== selectedTagId);
      setTags(updatedTags);
    });
    dialogRef.current?.close();
    setSelectedTagId(null);
  };

  return (
    <Container>
      <PageHeader title="Tags" />

      <ConfirmDialog
        dialogRef={dialogRef}
        title={"Confirm Tag Delete"}
        message={"Are you sure you want to delete this?"}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          dialogRef.current?.close();
          setSelectedTagId(null);
        }}
      />
      {tags.map((tag) => (
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
                  title="Delete tag (coming soon)"
                  onClick={() => {
                    setSelectedTagId(tag.id);
                    dialogRef.current?.showModal();
                  }}
                />
              </div>
            </div>

            {/* Main: tag label */}
            <div className="media-content">
              <div className="content">
                <p className="mb-0">
                  <span className="has-text-weight-semibold">{tag.label}</span>
                  <hr className="my-2" />
                </p>
              </div>
            </div>
          </article>
        </Card>
      ))}
      <div className="mt-4 mb-4">
        <Button color="primary" onClick={() => navigate("/tags/new")}>
          Create a Tag
        </Button>
      </div>
    </Container>
  );
};
