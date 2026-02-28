//Component for a form to create a new tag and submit it to the API

import { useState } from "react";
import { createTag } from "../../services/TagService";
import { useNavigate } from "react-router-dom";
import { Container, Form, FormField, PageHeader } from "../../design";

export const NewTag = () => {
    const [label, setLabel] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (label.trim()) {
            createTag({ label }).then(() => {
                navigate("/tags");
            }).catch(error => {
                console.error("Failed to create tag:", error);
            });
        }    };

    return (
        <Container>
            <PageHeader title={`Create a New Tag`}/>
            <Form onSubmit={handleSubmit}>
                <FormField label="Tag Name">
                    <input
                        className="input"
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        required
                    />
                </FormField>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">Save Tag</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" type="button" onClick={() => navigate("/tags")}>Cancel</button>
                    </div>
                </div>
            </Form>
        </Container>
    );
}   