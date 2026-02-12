import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Rare } from "./Rare"
import "./index.css"
import { CurrentUserProvider } from "./context/CurrentUserContext"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <CurrentUserProvider>
            <Rare />
        </CurrentUserProvider>
    </BrowserRouter>
)
