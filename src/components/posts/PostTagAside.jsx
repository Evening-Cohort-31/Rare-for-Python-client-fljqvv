import { useEffect, useState, useCallback } from "react";
import { Button, Tag } from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { EditPostTagsDialog } from "./EditPostTagsDialog";
import { getTagsByPostId } from "../../services";

export const PostTagAside = ({ post, onTagsUpdated }) => {
  const { currentUser } = useCurrentUser();
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [tags, setTags] = useState([]);

  // Grab the postId from the post prop for easier use in API calls
  const postId = post?.id;

  // Use useCallback to memoize the fetchTags function, so it only changes if postId changes instead of on every render.
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

  // Determine permissions based on current user and post ownership
  const isOwner = currentUser?.id === post?.user_id;
  const isAdmin = currentUser?.is_staff === true;

  // Authors can edit tags on their own posts (remove only).
  // Admins can edit tags on any post.
  const canEditTags = isOwner || isAdmin;

  // Authors may add existing tags to their own posts.
  // Admins may add existing tags to any post.
  const canAddTags = isOwner || isAdmin;

  // Admins may create a new tag and add it to any post on the fly. 
  // Authors cannot create new tags.
  const canCreateTags = isAdmin;

  return (
    <>
      <aside className="box">
        <p className="has-text-weight-semibold mb-3 has-text-centered">Tags Associated with this Post</p>

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

        {/* Only show the "Manage Tags" button if the user has permission to edit tags 
        which is just authors of the post or admins */}
        {canEditTags ? (
          <div className="mt-4">
            <Button color="primary" onClick={() => setIsEditingTags(true)}>
              Manage Tags for this Post
            </Button>
          </div>
        ) : null}
      </aside>

      {/* Render the EditPostTagsDialog modal while isEditingTags is true.
      We pass down the post, permissions, and callbacks to handle closing and updating tags. */}
      {isEditingTags ? (
        <EditPostTagsDialog
          post={post}
          canAddTags={canAddTags}
          canCreateTags={canCreateTags}
          canRemoveTags={canEditTags}
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