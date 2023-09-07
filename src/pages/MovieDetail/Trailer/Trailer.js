import React from 'react'
import './Trailer.scss'

export default function Trailer({ trailerSrc }) {
    const trailerId = trailerSrc?.split("v=")[1];

    return (

        <>{trailerSrc &&
            <div className='trailer'>
                <h1 className='h1-title'>Trailer</h1>
                {console.log(trailerSrc)}
                <iframe
                    width={1200}
                    height={600}
                    src={`https://www.youtube.com/embed/${trailerId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    allowFullScreen
                />

            </div>
        }</>
    )
}
