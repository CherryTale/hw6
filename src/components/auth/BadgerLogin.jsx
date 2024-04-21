import React, { useRef, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    // Create the login component.
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleLoginSubmit = (e) => {
        e?.preventDefault();

        let username = usernameInputRef.current.value;
        let password = passwordInputRef.current.value;
        if (username === "" || password === ""){
            alert("You must provide both a username and password!");
        }else{
            fetch("https://cs571.org/api/s24/hw6/login",{
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.toLowerCase(),
                    password: password
                })
            }).then(res => {
                if(res.status === 401){
                    alert("Incorrect username or password!");
                }else if(res.status === 200){
                    console.log("The login was successful.");
                    return res.json();
                }
            }).then(json => {
                setLoginStatus(json.user.username);
                sessionStorage.setItem("username", json.user.username);
                navigate('/');
            })
        }
    }

    return <Container>
        <h1>Login</h1>
        <hr/>
        <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameInputRef}></Form.Control>
            <br/>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={passwordInputRef}></Form.Control>
            <br/>
            <Button type="submit">Login</Button>
        </Form>
    </Container>
}
