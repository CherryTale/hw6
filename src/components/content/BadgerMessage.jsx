import React, { useContext } from "react"
import { Card, Button } from "react-bootstrap";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

const cardStyles = {
    margin: "0.8rem 0",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
}

function BadgerMessage(props) {

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    
    const handlePostDelete = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?id=${props.id}`,{
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        }).then(res => {
            if(res.status === 200){
                console.log("Successfully deleted the post!");
                props.loadMessages();
            }
        })
    }

    const dt = new Date(props.created);

    return <Card style={cardStyles}>
        <Card.Header as="h4">{props.title}</Card.Header>
        <Card.Body>
            <p>
                {props.content}
            </p>
            <footer className="blockquote-footer">
                {props.poster}
            </footer>
            <p style={{marginBottom:"0", fontSize:"0.8rem", color:"#888"}}>
                Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
            </p>
        </Card.Body>
        {
            loginStatus === props.poster &&
                <Card.Footer>
                    <Button variant="danger" onClick={handlePostDelete} style={{width:"100%"}}>
                        Delete Post
                    </Button>
                </Card.Footer>
        }
    </Card>
}

export default BadgerMessage;