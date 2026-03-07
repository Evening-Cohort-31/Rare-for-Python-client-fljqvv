import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { StaffOnly } from "../components/auth/StaffOnly.jsx";
import { AccessDenied } from "../components/auth/AccessDenied.jsx";
import { MyPosts } from "../components/posts/MyPosts";
import { AllPosts } from "../components/posts/AllPosts";
import { CategoriesList } from "../components/categories/CategoriesList";
import { NewCategory } from "../components/categories/NewCategory";
import { EditCategory } from "../components/categories/EditCategory"
import { EditPost } from "../components/posts/EditPost";
import { BulmaSampler } from "../design/bulma-reference/BulmaSampler";
// Added for Ticket #5 - Import PostDetails component for viewing individual posts
import { PostDetails } from "../components/posts/PostDetails";
import { CreateAPost } from "../components/posts/CreateAPost";
import { PostComments } from "../components/comments/PostComments.jsx";
import { ButtonDemo } from "../design/bulma-reference/ButtonDemo";
import { UserProfiles } from "../components/users/UserProfiles.jsx";
import { TagList } from "../components/tags/TagList.jsx";
import { NewTag } from "../components/tags/NewTag.jsx";
import { UserDetails } from "../components/users/UserDetails.jsx";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        <Route element={<Authorized />}>
          {/* Normal Authenticated Routes here */}
          <Route path="/" element={<Navigate to="/my-posts" />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="my-posts/edit/:postId" element={<EditPost />} />
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="posts/new" element={<CreateAPost />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/new" element={<NewCategory />} />
          <Route path="categories/edit/:categoryId" element={<EditCategory />} />
        <Route path="bulma-sampler" element={<BulmaSampler />} />
          <Route path="button-demo" element={<ButtonDemo />} />
          <Route path="posts/:postId" element={<PostDetails />} />
          <Route path="posts/:postId/comments" element={<PostComments />} />
          <Route path="tags" element={<TagList />} />
          <Route path="tags/new" element={<NewTag />} />
          <Route path="users/:userId" element={<UserDetails />} />
          {/* Add more authenticated routes here */}

          {/* Staff-only routes */}
          <Route element={<StaffOnly />}>
            <Route path="/users" element={<UserProfiles />} />
            {/* Add more staff-only pages here */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};
