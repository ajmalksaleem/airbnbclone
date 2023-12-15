import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountNav from './AccountNav';
import axios from 'axios';

function PlacesPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/user-places')
            .then((val) => {
                setPlaces(val.data)
            })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="text-center ">
                list of all places <br />
                <Link className="bg-my-red inline-flex text-white px-4 py-2 rounded-full" to={'/account/places/new'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place</Link>
            </div>
            <div className='mt-4'>
                {places.length > 0 && places.map((place) => (
                    <Link to={'/account/places/' + place._id} className='bg-gray-100 gap-4 p-4 rounded-2xl flex cursor-pointer mb-5' key={place}>
                        <div className='w-32 h-32 bg-gray-300 flex  grow shrink-0'>
                            {place.addedPhotos.length > 0 && (
                                <img className='object-cover' src={"http://localhost:8000/uploads/" + place.addedPhotos[0]} alt="" />
                            )}
                        </div>

                        <div className='grow-0 shrink'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>

                    </Link>
                ))}
            </div>
        </div>

    )
}

export default PlacesPage
