import React from 'react'
import { useParams } from 'react-router-dom'

function Bookingview() {
    const { id } = useParams();
    return (
        <div>
            single booking {id}
        </div>
    )
}

export default Bookingview
