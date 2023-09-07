import React, { useEffect, useState } from 'react'
import './Showtimes.scss'
import BookingByMovie from './BookingByMovie/BookingByMovie'
import BookingByCinema from './BookingByCinema/BookingByCinema';
import { useDispatch, useSelector } from 'react-redux';
import actMovie from '../../redux/actions/actMovie';
import actOrder from '../../redux/actions/actOrder';
import { useNavigate } from 'react-router-dom';

export default function Showtimes() {
    const nav = useNavigate()
    const [isBookingByMovie, SetIsBookingByMovie] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: actMovie.GET_ALL_MOVIE })

        // dispatch({ type: actOrder.SET_SESSION_ORDER, payload: null })
        dispatch({ type: actOrder.SET_MOVIE_ORDER, payload: null })
        dispatch({ type: actOrder.SET_CINEMA_ORDER, payload: null })
        // eslint-disable-next-line
        return () => localStorage.removeItem('selectedMovieId')
    }, [])


    const isLoginSuccess = useSelector(state => state.rdcLogin.isLoginSuccess)
    const selectedSessionData = useSelector(state => state.rdcOrder.selectedSessionData)
    const selectedMovieId = localStorage.getItem('selectedMovieId');
    useEffect(() => { //Kiểm tra sau khi đăng nhập đủ 3 yếu tố này thì tự động chuyển sang trang chọn ghế
        if (isLoginSuccess && selectedSessionData && selectedMovieId) {
            setTimeout(() => {
                nav('/booking')
            }, 1000);
        }
        // eslint-disable-next-line
    }, [isLoginSuccess])

    return (
        <div className='showtimes'>
            <div className='sidebar'>
                <h1 className={isBookingByMovie ? "selected" : ""} onClick={() => SetIsBookingByMovie(true)}>Đặt vé theo phim</h1>
                <h1 className={!isBookingByMovie ? "selected" : ""} onClick={() => SetIsBookingByMovie(false)}>Đặt vé theo rạp</h1>
            </div>
            <div className='main-content'>
                {isBookingByMovie ? <BookingByMovie /> : <BookingByCinema />}
            </div>
        </div>
    )
}
