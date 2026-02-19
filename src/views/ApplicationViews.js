import { Route, Routes, Navigate } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MyPosts } from "../components/posts/MyPosts"
import { AllPosts } from "../components/posts/AllPosts"
import { CategoriesList } from "../components/categories/CategoriesList"
import { NewCategory } from "../components/categories/NewCategory"
import { EditPost } from "../components/posts/EditPost"
import { BulmaSampler } from "../bulma/BulmaSampler"
// Added for Ticket #5 - Import PostDetails component for viewing individual posts
import { PostDetails } from "../components/posts/PostDetails"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/" element={<Navigate to="/my-posts" replace />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        {/* Add additional route here */}
        <Route path="my-posts" element={<MyPosts />} />
        <Route path="my-posts/edit/:postId" element={<EditPost />} />
        <Route path="all-posts" element={<AllPosts />} />
        <Route path="categories" element={<CategoriesList />} />
        <Route path="categories/new" element={<NewCategory />} />
        <Route path="bulma-sampler" element={<BulmaSampler />} />
        {/* Ticket #5 - Route for viewing a single post's details */}
        <Route path="posts/:postId" element={<PostDetails />} />
      </Route>
    </Routes>
  </>
}
