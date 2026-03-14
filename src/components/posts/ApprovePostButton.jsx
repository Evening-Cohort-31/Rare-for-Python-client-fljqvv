import { useState } from "react";
import { updatePost } from "../../services";

export const ApprovePostButton = ({ post }) => {
    const [isApproved, setIsApproved] = useState(post.approved);

    const handleClick = (e) => {
        e.preventDefault();
        const postData = { ...post, approved: isApproved ? 0 : 1 };
        updatePost(post.id, postData).then(() => {
            setIsApproved(postData.approved);
        });
    };

    return (
       
        <label className="radio button" style={{ cursor: "pointer" }}>
            <input
                type="radio"
                checked={!!isApproved}
                onChange={handleClick}
                style={{ display: "none" }}
            />
            <span
                className={`icon ${isApproved ? "has-text-success" : "has-text-grey-light"}`}
                onClick={handleClick}
            >
                <i className={`fas ${isApproved ? "fa-check-circle" : "fa-circle"}`} />
            </span>
            <span>{isApproved ? "Approved" : "Unapproved"}</span>
        </label>
    
    );
};