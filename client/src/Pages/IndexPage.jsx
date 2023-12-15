import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/places')
            .then((response) => {
                setPlaces(response.data)

            }).catch((err) => {

            });
    }, [])
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20 px-6 gap-6 gap-y-8'>
            {places.length > 0 && places.map((place) => (
                <Link to={'/place/' + place._id}>
                    <div className='bg-gray-500 rounded-2xl flex mb-2'>
                        {place.addedPhotos?.[0] && (
                            <img className='rounded-2xl aspect-square object-cover' src={'http://localhost:8000/uploads/' + place.addedPhotos[0]} alt="" />
                        )}
                    </div>
                    <h3 className='font-bold'>{place.address}</h3>
                    <h2 className="text-xs truncate 10">{place.title}</h2>
                    <div className='mt-1'>
                        <span className='font-bold'>₹ {place.price}</span> per night
                    </div>
                </Link>
            ))}

        </div>
    )
}

export default IndexPage
