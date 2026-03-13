import { useEffect, useState, useCallback } from "react";
import { Button, Tag } from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { EditPostTagsDialog } from "./EditPostTagsDialog";
import { getTagsByPostId } from "../../services";

export const PostTagAside = ({ post, onTagsUpdated }) => {
  const { currentUser } = useCurrentUser();
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [tags, setTags] = useState([]);

  const postId = post?.id;

  const fetchTags = useCallback(() => {
    if (!postId) return;

    getTagsByPostId(postId)
      .then((fetchedTags) => {
        setTags(fetchedTags ?? []);
      })
      .catch((error) => {
        console.error("Failed to fetch tags for post:", error);
        setTags([]);
      });
  }, [postId]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const isOwner = currentUser?.id === post?.user_id;
  const isAdmin = currentUser?.is_staff === true;

  // Authors can edit tags on their own posts (remove only).
  // Admins can edit tags on any post.
  const canEditTags = isOwner || isAdmin;

  // Authors may only remove tags.
  const canRemoveTags = isOwner || isAdmin;

  // Admins may add existing tags to any post.
  const canAddTags = isAdmin;

  // Admins may create a new tag and add it to any post.
  const canCreateTags = isAdmin;

  return (
    <>
      <aside className="box">
        <p className="has-text-weight-semibold mb-3">Tags</p>

        {tags.length ? (
          <div
            className="is-flex is-flex-direction-column"
            style={{ gap: "0.5rem" }}
          >
            {tags.map((tag) => (
              <Tag key={tag.id} color="warning" light rounded>
                {tag.label}
              </Tag>
            ))}
          </div>
        ) : (
          <p className="is-size-7 has-text-grey mb-3">No tags assigned.</p>
        )}

        {canEditTags ? (
          <div className="mt-4">
            <Button color="primary" onClick={() => setIsEditingTags(true)}>
              Edit Tags
            </Button>
          </div>
        ) : null}
      </aside>

      {isEditingTags ? (
        <EditPostTagsDialog
          post={post}
          canAddTags={canAddTags}
          canCreateTags={canCreateTags}
          canRemoveTags={canRemoveTags}
          onClose={() => setIsEditingTags(false)}
          onUpdated={() => {
            setIsEditingTags(false);
            fetchTags();
            onTagsUpdated?.();
          }}
        />
      ) : null}
    </>
  );
};