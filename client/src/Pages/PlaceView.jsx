import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from './Account/BookingWidget';


function PlaceView() {
    const { id } = useParams()
    const [place, setPlace] = useState([]);
    const [showallphotos, setShowallphotos] = useState(false)

    useEffect(() => {
        axios.get('/places/' + id)
            .then((response) => {
                setPlace(response.data)
            }).catch((err) => {
                alert(err);
            });
    }, [id]);



    if (!place) return ''

    if (showallphotos) {
        return (
            <div className='absolute inset-0 bg-white '>
                <div className='p-8 grid lg:columns-3 gap-4'>
                    <div className=''>
                        <h2 className='text-3xl '>Photos of {place.title}</h2>
                        <button onClick={() => setShowallphotos(false)} className='top-8 right-12 fixed flex gap-2 py-2 px-2 shadow shadow-gray-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            close photos</button>
                    </div>
                    {place?.addedPhotos?.length > 0 && place.addedPhotos.map((images) => (
                        <div >
                            <img src={"http://localhost:8000/uploads/" + images} alt="" />
                        </div>
                    ))}
                </div>



            </div>



        );
    }





    return (
        <div className='mt-8 mx-5 '>
            <h1 className='text-3xl'>{place.title}</h1>
            <div className='flex gap-2 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <a className='block font-semibold underline my-2' target='_blank' href={"https://maps.google.com/?q=" + place.address}>{place.address}</a>
            </div>

            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr_2fr]  my-4 mt-9 mx-5  content-center">
                    <div>
                        {place.addedPhotos?.[0] && (
                            <div >
                                <img className='aspect-square object-cover' src={"http://localhost:8000/uploads/" + place.addedPhotos[0]} alt="" />
                            </div>

                        )}
                    </div>
                    <div className='grid'>
                        <div>
                            {place.addedPhotos?.[1] && (
                                <img className='aspect-square object-cover' src={"http://localhost:8000/uploads/" + place.addedPhotos[1]} alt="" />
                            )}
                        </div>
                        <div className='border overflow-hidden'>
                            {place.addedPhotos?.[2] && (
                                <img className='aspect-square object-cover relative top-2' src={"http://localhost:8000/uploads/" + place.addedPhotos[2]} alt="" />
                            )}
                        </div>
                    </div>
                    <div>
                        {place.addedPhotos?.[3] && (
                            <div >
                                <img className='aspect-square object-cover' src={"http://localhost:8000/uploads/" + place.addedPhotos[3]} alt="" />
                                <div className='flex'>

                                    <button onClick={() => { setShowallphotos(true) }} className=" bg-white px-3 py-1 rounded-full font-bold  absolute bottom-0 right-0 mb-2 mx-6 text-sm" >
                                        Show more photos</button>

                                </div>

                            </div>

                        )}

                    </div>
                </div>

            </div>

            <div className="mt-8  grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] mx-5">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    <div className='font-bold'>
                        Check-in: {place.checkIn}<br />
                        Check-out: {place.checkOut}<br />
                        Max number of guests: {place.maxGuests}
                    </div>


                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className='mx-5 mt-2 mb-2'>
                <h2 className='font-semibold text-2xl'>Extra Info</h2>
            </div>
            <div className='text-sm  text-gray-500 mx-5'>
                {place.extraInfo}
            </div>
        </div >
    )
}

export default PlaceView
