import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState(false)
    const [bookingid, setBookingid] = useState('')

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    function bookThisPlace() {
        axios.post('/booking', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id, price: numberOfNights * place.price
        })
            .then((response) => {
                setBookingid(response.data._id)
                setRedirect(true)
            }).catch((err) => {
                alert('error' + err)
            });
    }

    if (redirect) {
        return <Navigate to={'/account/bookings/' + bookingid} />
    }


    return (
        <div className="bg-gray-200 p-4 rounded-2xl text-center mt-5 ">
            <span className=' font-bold text-2xl '>Price : ₹ {place.price} / per night</span>
            <div className="flex  justify-center gap-2">
                <div className='my-4 bg-white py-2 px-3'>
                    <label>Check In : </label>
                    <input type="date" value={checkIn} onChange={(ev) => { setCheckIn(ev.target.value) }} />
                </div>

                <div className='my-4 bg-white py-2 px-3'>
                    <label>Check Out : </label>
                    <input type="date" value={checkOut} onChange={(ev) => { setCheckOut(ev.target.value) }} />
                </div>
            </div>

            <div className='  bg-white py-2 px-4'>
                <label>Max no of Guests : </label>
                <input min={1} type="number" value={numberOfGuests} onChange={(ev) => { setNumberOfGuests(ev.target.value) }} />
            </div>
            {numberOfNights > 0 && (
                <>
                    <div className=' mb-2 bg-white py-2 px-4'>
                        <label>Your Full Name: </label>
                        <input value={name} onChange={(ev) => { setName(ev.target.value) }} type="text" />
                    </div>
                    <div className=' mb-2 pb-3 bg-white py-2 px-4'>
                        <label>Your Phone no: </label>
                        <input value={phone} onChange={(ev) => { setPhone(ev.target.value) }} type="tel" />
                    </div>
                    <div>
                        {numberOfNights > 0 && (
                            <span className='font-bold'> Total Price : {numberOfNights * place.price}</span>
                        )}
                    </div>
                </>
            )}


            <button onClick={bookThisPlace} className='primary mt-2'>
                Book now
            </button>
        </div>
    )
}

export default BookingWidget
