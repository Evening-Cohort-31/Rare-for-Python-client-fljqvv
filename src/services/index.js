// API service exports
export { API_BASE_URL } from "./apiSettings.js";

// Users
export {
  getUserById,
  getAllUsers,
  updateUser,
  getActiveUsers,
  getInactiveUsers,
} from "./UserService.js";

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
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory, // Added for Ticket #16 - Delete a Category
} from "./CategoryService.js";

// Comments
export {
  getCommentsByPostId,
  createComment,
  deleteComment,
} from "./CommentService.js";

// Reactions
export { getAllReactions } from "./ReactionService.js";

// PostReactions
export {
  getAllPostReactions,
  getPostReactionsByPostId,
  updateOrCreatePostReaction,
} from "./PostReactionService.js";

// Tags
export {
  getAllTags,
  createTag,
  deleteTag,
  getTagById,
  editTag,
} from "./TagService.js";

// Images/Avatars
export { getAvatars, uploadFile, uploadProfileImage, getPreviouslyUploadedImages } from "./ImageService.js";

// Demotion Queue
export {
  getAllDemotionQueueEntries,
  getPendingDemotionQueueByTargetId,
  getPendingDemotionQueueByInitiatorId,
  createDemotionQueueEntry,
  updateDemotionQueueEntry,
  deleteDemotionQueueEntry,
} from "./DemotionQueue.js";

// PostTags 
export {
  getTagsByPostId,
  addTagToPost,
  removeTagFromPost,
} from "./PostTagsService.js";