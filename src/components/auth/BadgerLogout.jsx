
import React, { useEffect, useContext, useState } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from 'react-router';

export default function BadgerLogout() {

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const [secondsRemaining, setSecondsRemaining] = useState(5);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch('https://cs571.org/api/s24/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoginStatus(null);
            sessionStorage.removeItem("username");
        })

        const redirectTimer = setInterval(() => {
            setSecondsRemaining(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(redirectTimer);
    }, []);

    useEffect(() => {
        if(secondsRemaining===0){
            navigate('/');
        }
    }, [secondsRemaining]);

    return <>
        <h1>Logout</h1>
        { !loginStatus && <>
            <p>You have been successfully logged out.</p>
            <p>Back to home in {secondsRemaining}</p>
        </>}
    </>
}
