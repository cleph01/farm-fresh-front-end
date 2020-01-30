import React, { useState } from 'react';
import { axiosWithAuth } from '../tools/axiosAuth';
import axios from 'axios';
import styled from 'styled-components';
import Load from './Loader';
import '../App.css';


const FormWrap = styled.div`
background-color: rgba(0,0,0,.3);
color: white;
text-shadow: 2px 2px 2px #111;
width: 20em;
border-radius: 8px;
height: 35em;
margin: 0 auto;
padding: 3%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
h4 {
    font-size: 2.2em;
    text-align: center;
    font-family: 'Gelasio', serif;
    
}
form {
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
        margin: 1.5em 0em;
        height: 2em;
        font-size: 1.3em;
        border-radius 8px;
        font-family: 'Gelasio', serif;
    }
}
button {
    font-size: 1.3em;
    padding: 3%;
    border-radius: 8px;
    font-family: 'Gelasio', serif;
    
    @media(min-width: 800px) {
        padding: 2%;
    }
}
`

const Registration = (props) => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        
    });

    const [loading, setLoading] = useState({
        isLoading: false
    })

    const register = e => {
        e.preventDefault();
        axiosWithAuth().post('https://farm-fresh-produce-api.herokuapp.com/api/auth/register', credentials)
        .then(res => {
        console.log(res)
        props.history.push('/login');
    
        })
        setLoading({...loading,isLoading: true})
        setTimeout(()=> {
            setLoading({...loading,isLoading: false})
        },3000)
        console.log(credentials)
    }

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
        console.log(credentials)
    }

    return (
        <div className='field'>
            

            { loading.isLoading ? <FormWrap><h4>Logging in...</h4> <Load /> </FormWrap>   :
            <FormWrap>
                <h4>Register here to get access to farm fresh produce!</h4>
            <form onSubmit={register}>
                <input 
                name='username'
                value={credentials.username}
                type="text"
                placeholder='Username'
                onChange={handleChange}/>

            {/* <input 
                name='email'
                value={credentials.email}
                type="text"
                placeholder='Email'
                onChange={handleChange}/> */}

                <input 
                name='password'
                value={credentials.password}
                type="text"
                placeholder='Password'
                onChange={handleChange}/>

                <button type='submit'>Register!</button>
            </form>
            </FormWrap> }

            
            

            

            
            
        </div>
    );
}

export default Registration;