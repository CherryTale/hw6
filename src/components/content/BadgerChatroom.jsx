import React, { useEffect, useState, useContext } from "react"
import BadgerMessage from "./BadgerMessage"
import { Row, Col, Pagination } from 'react-bootstrap';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { Form, Button } from 'react-bootstrap';

export default function BadgerChatroom(props) {

    const [page, setPage] = useState(1);
    const [messages, setMessages] = useState([]);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const loadMessages = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);

    const handlePostSubmit = (e) => {
        e?.preventDefault();

        if(title === "" || content === ""){
            alert("You must provide both a title and content!");
        }else{
            fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}`,{
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            }).then(res => {
                if(res.status === 200){
                    console.log("Successfully posted!");
                    loadMessages();
                }
            })
        }
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* Allow an authenticated user to create a post. */
            loginStatus?
                <Form onSubmit={handlePostSubmit}>
                    <Form.Label htmlFor="titleInput">Post Title</Form.Label>
                    <Form.Control id="titleInput" value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                    <br/>
                    <Form.Label htmlFor="contentInput">Post Content</Form.Label>
                    <Form.Control id="contentInput" value={content} onChange={(e) => setContent(e.target.value)}></Form.Control>
                    <br/>
                    <Button type="submit">Create Post</Button>
                </Form>
            :
                <p>You must be logged in to post!</p>
        }
        <hr/>
        {
            messages.length > 0 ?
                <Row>
                {
                    /* Complete displaying of messages. */
                    messages.map(item => {
                        return <Col xs={12} sm={6} lg={4} xl={3} key={item.id}>
                            <BadgerMessage
                                id={item.id}
                                title={item.title}
                                poster={item.poster}
                                content={item.content}
                                created={item.created}
                                loadMessages={loadMessages}
                            ></BadgerMessage>
                        </Col>
                    })
                }
                </Row>
            :
                <p>There are no messages on this page yet!</p>
        }
        <Pagination>
            <Pagination.Item onClick={()=>setPage(1)} active={page===1}>{1}</Pagination.Item>
            <Pagination.Item onClick={()=>setPage(2)} active={page===2}>{2}</Pagination.Item>
            <Pagination.Item onClick={()=>setPage(3)} active={page===3}>{3}</Pagination.Item>
            <Pagination.Item onClick={()=>setPage(4)} active={page===4}>{4}</Pagination.Item>
        </Pagination>
    </>
}
