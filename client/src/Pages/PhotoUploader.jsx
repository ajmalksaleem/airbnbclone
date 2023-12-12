import React, { useState } from 'react'
import axios from 'axios';
function PhotoUploader({ addedPhotos, onChange }) {
    const [photolink, setPhotoLink] = useState([]);


    function addPhotoByLink(e) {
        e.preventDefault();
        axios.post('/upload-by-link', {
            link: photolink
        })
            .then((val) => {
                onChange(prev => {
                    return [...prev, (val.data)];
                })
                setPhotoLink('')
            })
            .catch((err) => {
                alert('not uploaded' + err)
            })
    }


    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }                                           //notes : https://g.co/bard/share/ae007bf04583
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                const { data } = response;
                console.log(data)

                onChange(prev => {
                    return [...prev, ...data];
                })
            })
            .catch((error) => {
                alert(error)
            });
    }


    return (
        <>
            <div className='flex gap-2'>
                <input type="text" value={photolink} onChange={(e) => setPhotoLink(e.target.value)} placeholder='Add using a link......jpg' />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photos</button>
            </div>

            <div className='grid grid-cols-3 md:grid-cols-4 mt-3 lg:grid-cols-6'>
                {addedPhotos.length > 0 && addedPhotos.map((link) => (
                    <div className='h-32 flex' key={link}>
                        <img className='rounded-2xl w-full object-cover p-2' src={"http://localhost:8000/uploads/" + link} alt="" />
                    </div>
                ))}
                <label className='h-32 flex items-center p-5 gap-1 justify-center border bg-white rounded-2xl  text-2xl text-gray-600'>
                    <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>

                    Upload</label>
            </div>
        </>
    )
}

export default PhotoUploader
