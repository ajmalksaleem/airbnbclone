import React, { useEffect, useState } from 'react'
import Perks from './PerksPage';
import PhotoUploader from './PhotoUploader';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { NavLink, Navigate, useParams } from 'react-router-dom';


function PlacesForm() {
    const { id } = useParams()

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [formredirect, setformredirect] = useState(false);
    const [price, setPrice] = useState(100);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id)
            .then((response) => {
                const { data } = response;
                setTitle(data.title)
                setAddress(data.address)
                setDescription(data.description)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setCheckIn(data.checkIn)
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests)
                setAddedPhotos(data.addedPhotos)
                setPrice(data.price)
            }).catch((err) => {
                alert(err)
            });
    }, [id])


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


    function SavePlace(ev) {
        ev.preventDefault();
        if (id) {
            //update
            axios.put('/updateplaces', {
                id, title, address, addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
                .then((response) => {
                    setformredirect(true);
                })
                .catch(err => {
                    alert(err)
                });

        } else {
            //newplace
            axios.post('/addplaces', {
                title, address, addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
                .then((response) => {
                    setformredirect(true);
                })
                .catch(err => {
                    alert(err)
                });
        }

    }

    if (formredirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form className='px-6 bg-gray-50 py-2' onSubmit={SavePlace}>
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
                <div className='grid gap-2 md:grid-col-4 sm:grid-cols-2 '>
                    <div>
                        <h3 className='mt-2'>Check in time</h3>
                        <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} type="text" placeholder='14' /></div>
                    <div>
                        <h3 className='mt-2'>Check out time</h3>
                        <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="text" placeholder='11' /></div>
                    <div>
                        <h3 className='mt-2'>Max no:of Guest</h3>
                        <input value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} type="number" min={1} /></div>
                    <div>
                        <h3 className='mt-2'>Price Per Night(in ruppes)</h3>
                        <input value={price} placeholder='1000₹' onChange={(e) => setPrice(e.target.value)} type="number" /></div>
                </div>



                <div>
                    <button className='primary my-6'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesForm
