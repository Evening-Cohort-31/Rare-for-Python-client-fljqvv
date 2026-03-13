import { useEffect, useMemo, useRef, useState } from "react";
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

  // Open dialog + fetch needed data
  useEffect(() => {
    if (!post?.id) return;

    const loadDialogData = async () => {
      setLoading(true);

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
        setNotification("Failed to load tags.");
      } finally {
        setLoading(false);
      }
    };

    loadDialogData();
  }, [post?.id]);

  // Show the dialog after mount
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  // IDs already attached to this post
  const attachedTagIds = useMemo(() => {
    return new Set(postTags.map((tag) => tag.id));
  }, [postTags]);

  // Only show tags that are not already attached
  const availableTagsToAdd = useMemo(() => {
    return allTags.filter((tag) => !attachedTagIds.has(tag.id));
  }, [allTags, attachedTagIds]);

  const handleRemoveTag = async (tagId) => {
    if (!canRemoveTags) return;

    setIsSaving(true);
    setNotification("");

    try {
      await removeTagFromPost(post.id, tagId);

      setPostTags((current) => current.filter((tag) => tag.id !== tagId));
      setNotification("Tag removed.");
    } catch (error) {
      console.error("Failed to remove tag from post:", error);
      setNotification("Failed to remove tag.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddExistingTag = async () => {
    if (!canAddTags || !selectedTagId) return;

    setIsSaving(true);
    setNotification("");

    try {
      const tagId = parseInt(selectedTagId);

      await addTagToPost(post.id, tagId);

      const addedTag = allTags.find((tag) => tag.id === tagId);
      if (addedTag) {
        setPostTags((current) => [...current, addedTag]);
      }

      setSelectedTagId("");
      setNotification("Tag added.");
    } catch (error) {
      console.error("Failed to add tag to post:", error);
      setNotification("Failed to add tag.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateAndAddTag = async () => {
    if (!canCreateTags || !newTagLabel.trim()) return;

    setIsSaving(true);
    setNotification("");

    try {
      // Create the new tag first
      const createdTag = await createTag({ label: newTagLabel.trim() });

      // Depending on your service, createdTag may already be the tag object
      // with id + label. If not, you may need to re-fetch all tags here.
      const usableTag = createdTag;

      await addTagToPost(post.id, usableTag.id);

      setAllTags((current) => [...current, usableTag]);
      setPostTags((current) => [...current, usableTag]);
      setNewTagLabel("");
      setNotification("New tag created and added.");
    } catch (error) {
      console.error("Failed to create and add tag:", error);
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
              {/* Existing tags */}
              <div className="mb-4">
                <p className="has-text-weight-semibold mb-2">Current Tags</p>

                {postTags.length ? (
                  <div className="is-flex is-flex-direction-column" style={{ gap: "0.75rem" }}>
                    {postTags.map((tag) => (
                      <div
                        key={tag.id}
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
                            onClick={() => handleRemoveTag(tag.id)}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="is-size-7 has-text-grey">This post has no tags.</p>
                )}
              </div>

              {/* Add existing tag */}
              {canAddTags ? (
                <div className="mb-4">
                  <p className="has-text-weight-semibold mb-2">Add Existing Tag</p>

                  {availableTagsToAdd.length ? (
                    <>
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
                    </>
                  ) : (
                    <p className="is-size-7 has-text-grey">
                      No additional existing tags are available to add.
                    </p>
                  )}
                </div>
              ) : null}

              {/* Create and add new tag */}
              {canCreateTags ? (
                <div className="mb-3">
                  <p className="has-text-weight-semibold mb-2">Create New Tag</p>

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
                <p className="help mt-2">{notification}</p>
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