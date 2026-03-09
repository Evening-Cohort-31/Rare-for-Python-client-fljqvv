import {
  Form,
  FormField,
  FormTextarea,
  FormSelect,
  Button,
  Card,
} from "../../design"

export const PostForm = ({
  post,
  categories,
  onInputChange,
  onCategoryChange,
  onSubmit,
  onCancel,
  submitError = "",
  submitLabel = "Save Post",
  cancelLabel = "Cancel",
  showImageUrl = false,
  showTags = false,
  tags = [],
  onTagChange,
}) => {
  return (
    <Card className="edit-post-card">
      <Form onSubmit={onSubmit}>
        <FormField label="Title">
          <input
            className="input is-medium"
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={onInputChange}
            required
            placeholder="Enter a clear post title"
          />
        </FormField>

        {showImageUrl ? (
          <FormField label="Image URL">
            <input
              className="input"
              type="url"
              id="image_url"
              name="image_url"
              value={post.image_url || ""}
              onChange={onInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </FormField>
        ) : null}

        <FormTextarea
          label="Content"
          name="content"
          value={post.content}
          onChange={onInputChange}
          required
          rows={10}
          className="is-medium"
          placeholder="Write or revise your post content here..."
        />

        <FormSelect
          label="Category"
          name="category_id"
          value={post.category_id}
          onChange={onCategoryChange || onInputChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </FormSelect>

        {showTags ? (
          <div className="field">
            <label className="label">Tags</label>
            <div className="control">
              {tags.map((tag) => (
                <label className="checkbox mr-4" key={tag.id}>
                  <input
                    type="checkbox"
                    value={tag.id}
                    checked={post.tag_ids?.includes(tag.id)}
                    onChange={onTagChange}
                  />{" "}
                  {tag.label}
                </label>
              ))}
            </div>
          </div>
        ) : null}

        {submitError ? <p className="has-text-danger mb-4">{submitError}</p> : null}

        <div className="is-flex is-justify-content-flex-end is-gap-3">
          <Button type="button" className="is-light" onClick={onCancel}>
            {cancelLabel}
          </Button>

          <Button type="submit" className="is-link">
            {submitLabel}
          </Button>
        </div>
      </Form>
    </Card>
  )
}