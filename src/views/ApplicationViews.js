import { Route, Routes, Navigate } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MyPosts } from "../components/posts/MyPosts"
import { AllPosts } from "../components/posts/AllPosts"
import { CategoriesList } from "../components/categories/CategoriesList"
import { NewCategory } from "../components/categories/NewCategory"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/" element={<Navigate to="/my-posts" replace />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        {/* Add additional route here */}
        <Route path="my-posts" element={<MyPosts />} />
        <Route path="all-posts" element={<AllPosts />} />
        <Route path="categories" element={<CategoriesList />} />
        <Route path="categories/new" element={<NewCategory />} />
      </Route>
    </Routes>
  </>
}
