import { Button } from "../../design"
import { updatePost } from "../../services"
import { useNavigate } from "react-router-dom";



export const ApprovePostButton = ({post}) => {

    const navigate = useNavigate();


    const handleClick = (e) => {

        e.preventDefault();
        const postData = { ...post, approved: 1 }
        updatePost(post.id, postData).then(() => {
            navigate(0); // Refresh the page
        })

    }

    return (
        <Button
            onClick={handleClick}
        >
            Approve Post #{post.id}
        </Button>
    )
    

}