import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {

    // Create the register component.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleRegisterSubmit = (e) => {
        e?.preventDefault();

        if (username==="" || password===""){
            alert("You must provide both a username and password!");
        }else if(password!==repeatPassword){
            alert("Your passwords do not match!");
        }else{
            fetch("https://cs571.org/api/s24/hw6/register",{
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
                if(res.status === 409){
                    alert("That username has already been taken!");
                }else if(res.status === 200){
                    console.log("The registration was successful.");
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
        <h1>Register</h1>
        <hr/>
        <Form onSubmit={handleRegisterSubmit}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
            <br/>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            <br/>
            <Form.Label htmlFor="repeatPasswordInput">Repeat Password</Form.Label>
            <Form.Control id="repeatPasswordInput" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}></Form.Control>
            <br/>
            <Button type="submit">Register</Button>
        </Form>
    </Container>
}
