// Users
export { getUserById, getAllUsers } from "./UserService.js";

// Posts
export {
  getPostsByUserId,
  getPostsByUserIdExpandCategory,
  getAllPosts,
  createPost,
  getPostByIdExpandCategory,
  getPostByIdExpandCategoryExpandUser,
  getPostById, // Added for Ticket #5 - Post detail view
  updatePost,
  deletePost,
} from "./PostService.js";

// Categories
export {
  getAllCategories,
  createCategory,
  deleteCategory, // Added for Ticket #16 - Delete a Category
} from "./CategoryService.js";

// Comments
export { getCommentsByPostId, createComment } from "./CommentService.js";
