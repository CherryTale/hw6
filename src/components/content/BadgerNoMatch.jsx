import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

function BadgerNoMatch() {
    return <Container>
        <h2>That's a 404.</h2>
        <hr/>
        <p>Uh oh, looks like you're lost!</p>
        <p>
            <Link to="/">Back to safety.</Link>
        </p>
    </Container>
}

export default BadgerNoMatch;
