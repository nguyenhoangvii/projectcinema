import React from 'react'
import './NotFound.scss'
import imgUrl from '../../assets/404.png'

export default function NotFound() {
    return (
        <div className='notFound'>
            <img alt='' src={imgUrl} />
        </div>
    )
}
