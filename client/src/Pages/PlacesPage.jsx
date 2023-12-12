import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from './PerksPage';
import PhotoUploader from './PhotoUploader';
import axios from 'axios';

function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState('');
    // const [price, setPrice] = useState(100);

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    };

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    };

    function preinput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    };


    function addNewPlace(ev) {
        ev.preventDefault();

        axios.post('/addplaces', {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests
        })
            .then((response) => {
                setRedirect('/account/places');
            })
            .catch(err => {
                alert(err)

            });
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            {action !== 'new' && (

                <div className="text-center ">
                    <Link className="bg-my-red inline-flex text-white px-4 py-2 rounded-full" to={'/account/places/new'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place</Link>
                </div>

            )}
            {action === 'new' && (
                <form className='px-6 bg-gray-50 py-2' onSubmit={addNewPlace}>
                    {preinput('Title', 'Title for your place.Should be short as in adverisement')}
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title for eg : my elegant apartment' />
                    {preinput('Address', 'Address to this place')}
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                    {preinput('Photos', 'More = Better')}

                    <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    {preinput('Description', 'Add Your Description')}
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                    {preinput('Perks', 'Select all the perks of your place')}
                    <Perks selected={perks} onChange={setPerks} />

                    {preinput('Extra Info', 'you can add your extra infos like house rules')}
                    <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />

                    {preinput('Check in&Out time', 'Add check in and out time')}
                    <div className='grid gap-2 sm:grid-cols-3'>
                        <div>
                            <h3 className='mt-2'>Check in time</h3>
                            <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} type="text" placeholder='14' /></div>
                        <div>
                            <h3 className='mt-2'>Check out time</h3>
                            <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="text" placeholder='11' /></div>
                        <div>
                            <h3 className='mt-2'>Max no:of Guest</h3>
                            <input value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} type="number" min={1} /></div>



                    </div>

                    <div>
                        <button className='primary my-6'>Save</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default PlacesPage
