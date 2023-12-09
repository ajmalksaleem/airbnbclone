import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { userContext } from '../UserContext';


function Loginpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setredirect] = useState(false);
    const { SetUser } = useContext(userContext)

    function loginUser(e) {
        e.preventDefault()
        axios.post('/login', {
            email,
            password
        })
            .then((val) => {
                SetUser(val.data)
                setredirect(true)


            })
            .catch((err) => {
                alert('login cancelled' + err)
            })
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="mb-30">
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={loginUser}>
                    <input type="email" value={email} placeholder='Your Email' onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" value={password} placeholder='Your Password' onChange={(e) => { setPassword(e.target.value) }} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an Account yet?
                        <Link className='underline text-black' to={'/register'}> Register now</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Loginpage
