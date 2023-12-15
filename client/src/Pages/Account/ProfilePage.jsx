import React, { useContext, useState } from 'react'
import { userContext } from '../../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import AccountNav from './AccountNav';


function ProfilePage() {
    const [redirect, setredirect] = useState(false);


    const { ready, user, SetUser } = useContext(userContext)
    if (!ready) {
        return 'loading...'
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    function logout() {
        axios.post('/logout')
            .then((val) => {
                setredirect(true)
                SetUser(null)
            })
            .catch((err) => {
                alert(err)
            })
    }



    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <AccountNav />

            <div className='text-center mx-auto max-w-lg'>
                Logged in as {user.name} ({user.email}) <br />
                <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
            </div>

        </div>
    )
}

export default ProfilePage
