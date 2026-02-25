import { Button } from "../../design"

export const ButtonDemo = () => (
  <>
    <div className="buttons">
      <Button color="primary">Primary</Button>
      <Button color="link">Link</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
    </div>

    <div className="buttons">
      <Button color="primary" variant="outlined">Outlined</Button>
      <Button color="primary" variant="light">Light</Button>
      <Button color="primary" variant="inverted">Inverted</Button>
      <Button color="primary" rounded>Rounded</Button>
      <Button color="primary" loading>Loading</Button>
    </div>

    <div className="buttons">
      <Button color="primary" size="small">Small</Button>
      <Button color="primary">Normal</Button>
      <Button color="primary" size="medium">Medium</Button>
      <Button color="primary" size="large">Large</Button>
    </div>

    <div className="buttons">
      <Button as="a" href="/posts" color="info">
        Go to Posts
      </Button>
      <Button color="danger" disabled>
        Disabled
      </Button>
    </div>
  </>
)