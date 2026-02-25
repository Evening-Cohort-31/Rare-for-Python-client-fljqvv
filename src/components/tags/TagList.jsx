import { useNavigate } from "react-router-dom"
import { Button, Container, PageHeader} from "../../design";

export const TagList = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <PageHeader title="Tag List" />
            {/* A List of all Tags will display here. Ticket #10 */}
            <Button onClick={() => navigate("/tags/new")}>Create a Tag</Button>
        </Container>
 
    )
}