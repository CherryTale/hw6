import React, { memo } from "react"
import { Container } from 'react-bootstrap';

function BadgerChatHome () {
    return <Container>
        <h1>Welcome to BadgerChat!</h1>
        <hr/>
        <p>Please be mindful about what you post, this is a chat server shared by every student in CS571.</p>
        <p>As a result, you may see others' posts appear while you are working, this is perfectly normal!</p>
        <p>All content that you post can be linked back to you through your Badger ID.</p>
        <p>Click on a link to get started.</p>
    </Container>
}

export default memo(BadgerChatHome);
