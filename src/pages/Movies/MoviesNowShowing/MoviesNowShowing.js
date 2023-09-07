import React from 'react'
import './MoviesNowShowing.scss'
import { useNavigate } from 'react-router-dom'

export default function MoviesNowShowing({ data }) {
    const nav = useNavigate()
    const HandleBuyTicketClick = (selectedMovieId, event) => {
        event.stopPropagation();
        localStorage.setItem('selectedMovieId', selectedMovieId);
        nav('/showtimes')
    }
    return (
        <div className='moviesNowShowing'>
            {
                data?.map((movieItem, index) => {
                    return (
                        <div className='card' key={index}>
                            <div className='img' onClick={() => nav(`/movies/${movieItem.slug}`)}>
                                <img alt='' src={movieItem?.imagePortrait} />
                                <div className='btn-wrapper' >
                                    <button className='btn btn-white' onClick={(event) => { nav(`/movies/${movieItem.slug}`); event.stopPropagation(); }}>
                                        CHI TIẾT
                                    </button>
                                    <button className='btn btn-gradient' onClick={(event) => HandleBuyTicketClick(movieItem.id, event)}>ĐẶT VÉ</button>
                                </div>
                            </div>
                            <h3 className='name'>{movieItem?.name}</h3>
                            <p className='sub-name'>{movieItem?.subName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
