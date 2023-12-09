import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('')

    function registerUser(e) {
        e.preventDefault()
        axios.post('/register', {
            name,
            password,
            email
        })
            .then((val) => {
                setStatus('Login success')
            })
            .catch((err) => {
                setStatus('email id already exist')
            })

    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="mb-30">
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <p className='px-2 text-gray-400'>{status}</p>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>

                    <input type="text" placeholder='Your Name'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />

                    <input type="email" placeholder='Your Email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />

                    <input type="password" placeholder='Your Password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />

                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already have an account?
                        <Link className='underline text-black' to={'/login'}> login</Link>

                    </div>
                </form>
            </div>

        </div>
    )
}

export default RegisterPage
