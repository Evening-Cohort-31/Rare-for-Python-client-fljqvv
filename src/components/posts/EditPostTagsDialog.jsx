import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConfirmDialog, Tag, Button, Loading } from "../../design";
import {
  getAllTags,
  getTagsByPostId,
  addTagToPost,
  removeTagFromPost,
  createTag,
} from "../../services";

export const EditPostTagsDialog = ({
  post,
  canAddTags = false,
  canCreateTags = false,
  canRemoveTags = false,
  onClose,
  onUpdated,
}) => {
  const dialogRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [postTags, setPostTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState("");
  const [newTagLabel, setNewTagLabel] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationIsError, setNotificationIsError] = useState(false);

  // Load both the tags currently attached to this post and all available tags in the system.
  // This allows us to show current tags with remove buttons and also provide a dropdown of available tags to add.
  // We use useCallback to memoize this function so that it doesn't get re-created on every render, which would cause the useEffect that depends on it to run more often than necessary.
  const loadDialogData = useCallback(async () => {
    if (!post?.id) return;

    setLoading(true);
    setNotification("");
    setNotificationIsError(false);

    try {
      const [fetchedPostTags, fetchedAllTags] = await Promise.all([
        getTagsByPostId(post.id),
        getAllTags(),
      ]);

      setPostTags(fetchedPostTags ?? []);
      setAllTags(fetchedAllTags ?? []);
    } catch (error) {
      console.error("Failed to load tag editor data:", error);
      setPostTags([]);
      setAllTags([]);
      setNotificationIsError(true);
      setNotification("Failed to load tags.");
    } finally {
      setLoading(false);
    }
  }, [post?.id]);

  // Load data when dialog mounts / post changes
  useEffect(() => {
    loadDialogData();
  }, [loadDialogData]);

  // Show dialog after mount
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  // IDs already attached to this post
  const attachedTagIds = useMemo(() => {
    return new Set(postTags.map((tag) => tag.id));
  }, [postTags]);

  // Only show tags not already attached
  const availableTagsToAdd = useMemo(() => {
    return allTags.filter((tag) => !attachedTagIds.has(tag.id));
  }, [allTags, attachedTagIds]);

  // Handlers for adding/removing tags, creating new tags, and closing the dialog.
  const handleRemoveTag = async (postTagId) => {
    if (!canRemoveTags) return;

    setIsSaving(true);
    setNotification("");
    setNotificationIsError(false);

    try {
      await removeTagFromPost(postTagId);

      const refreshedPostTags = await getTagsByPostId(post.id);
      setPostTags(refreshedPostTags ?? []);

      setNotification("Tag removed.");
    } catch (error) {
      console.error("Failed to remove tag from post:", error);
      setNotificationIsError(true);
      setNotification("Failed to remove tag.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for adding an existing tag to the post. This is only allowed if the user has permission to add tags and has selected a tag from the dropdown.
  const handleAddExistingTag = async () => {
    if (!canAddTags || !selectedTagId) return;

    setIsSaving(true);
    setNotification("");
    setNotificationIsError(false);

    try {
      const tagId = parseInt(selectedTagId);

      await addTagToPost(post.id, tagId);

      const refreshedPostTags = await getTagsByPostId(post.id);
      setPostTags(refreshedPostTags ?? []);

      setSelectedTagId("");
      setNotification("Tag added.");
    } catch (error) {
      console.error("Failed to add tag to post:", error);
      setNotificationIsError(true);
      setNotification("Failed to add tag.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for creating a new tag and adding it to the post. 
  // Only admins can create new tags.
  const handleCreateAndAddTag = async () => {
    if (!canCreateTags || !newTagLabel.trim()) return;

    const trimmedLabel = newTagLabel.trim();
    const normalizedNewTag = trimmedLabel.toLowerCase();

    const tagAlreadyExists = allTags.some(
      (tag) => tag.label.trim().toLowerCase() === normalizedNewTag
    );

    if (tagAlreadyExists) {
      setNotificationIsError(true);
      setNotification("That tag already exists.");
      return;
    }

    setIsSaving(true);
    setNotification("");
    setNotificationIsError(false);

    try {
      const createdTag = await createTag({ label: trimmedLabel });

      await addTagToPost(post.id, createdTag.id);

      setAllTags((current) => [...current, createdTag]);

      const refreshedPostTags = await getTagsByPostId(post.id);
      setPostTags(refreshedPostTags ?? []);

      setNewTagLabel("");
      setNotification("New tag created and added.");
    } catch (error) {
      console.error("Failed to create and add tag:", error);
      setNotificationIsError(true);
      setNotification("Failed to create and add tag.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDone = () => {
    dialogRef.current?.close();
    onUpdated?.();
  };

  const handleCancel = () => {
    dialogRef.current?.close();
    onClose?.();
  };

  return (
    <ConfirmDialog
      dialogRef={dialogRef}
      title={`Edit Tags for "${post?.title ?? "Post"}"`}
      message={
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="mb-4">
                <p className="has-text-weight-semibold mb-2">Current Tags</p>

                {/* Show the tags currently attached to this post, with a "Remove" button if the user has permission to remove tags. */}
                {postTags.length ? (
                  <div
                    className="is-flex is-flex-direction-column"
                    style={{ gap: "0.75rem" }}
                  >
                    {postTags.map((tag) => (
                      <div
                        key={tag.postTagId}
                        className="is-flex is-justify-content-space-between is-align-items-center"
                        style={{ gap: "0.75rem" }}
                      >
                        <Tag color="warning" light rounded>
                          {tag.label}
                        </Tag>

                        {canRemoveTags ? (
                          <Button
                            color="danger"
                            light
                            disabled={isSaving}
                            onClick={() => handleRemoveTag(tag.postTagId)}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="is-size-7 has-text-grey">
                    This post has no tags.
                  </p>
                )}
              </div>

                {/* If the user has permission to add tags, show the UI for adding an existing tag. This includes a dropdown of available tags that are not already attached to the post and an "Add" button. */}
              {canAddTags ? (
                <div className="mb-4">
                  <p className="has-text-weight-semibold mb-2">
                    Add Existing Tag
                  </p>

                  {availableTagsToAdd.length ? (
                    <div className="field has-addons">
                      <div className="control is-expanded">
                        <div className="select is-fullwidth">
                          <select
                            value={selectedTagId}
                            onChange={(e) => setSelectedTagId(e.target.value)}
                            disabled={isSaving}
                          >
                            <option value="">Select a tag</option>
                            {availableTagsToAdd.map((tag) => (
                              <option key={tag.id} value={tag.id}>
                                {tag.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="control">
                        <Button
                          color="primary"
                          disabled={isSaving || !selectedTagId}
                          onClick={handleAddExistingTag}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="is-size-7 has-text-grey">
                      No additional existing tags are available to add.
                    </p>
                  )}
                </div>
              ) : null}

              {/* Only admins can create new tags on the fly. */}
              {canCreateTags ? (
                <div className="mb-3">
                  <p className="has-text-weight-semibold mb-2">
                    Create New Tag
                  </p>

                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        placeholder="Enter new tag label"
                        value={newTagLabel}
                        onChange={(e) => setNewTagLabel(e.target.value)}
                        disabled={isSaving}
                      />
                    </div>

                    <div className="control">
                      <Button
                        color="primary"
                        disabled={isSaving || !newTagLabel.trim()}
                        onClick={handleCreateAndAddTag}
                      >
                        Create + Add
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}

              {notification ? (
                <p className={`help mt-2 ${notificationIsError ? "has-text-danger" : "has-text-success"}`}>
                  {notification}
                </p>
              ) : null}
            </>
          )}
        </div>
      }
      confirmText="Done"
      confirmColor="is-primary"
      onConfirm={handleDone}
      onCancel={handleCancel}
    />
  );
};