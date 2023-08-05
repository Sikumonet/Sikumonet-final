import React, {useState} from "react";
import { Link } from "react-router-dom"
import './Login.css'

function Login(){
    const [email , setEmail]  = useState('')
    const [password,setPassword] = useState('')

    async function loginUser (event) {
        event.preventDefault()
       const response = await fetch('http://localhost:1337/api/login', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               email,
               password
           })
        })
        const data = await response.json()
        if(data.user){
            localStorage.setItem('token', data.user)
            alert('Login Successful')
            window.location.href = '/dashboard'
        }else{
            alert('Please check your Username and Password')
        }
    }

    return (
        <div className='LoginPage'>
            <h1 className='LoginWord'>Login</h1>
            <form onSubmit={loginUser} className='LoginForm'>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                />
                <br />
                <input type="submit" value="Login" />
                <Link to="/register">Dont have an account? Register here!</Link>
            </form>
        </div>
    )
}

export default Login
