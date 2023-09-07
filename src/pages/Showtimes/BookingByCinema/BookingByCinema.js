import React, { useEffect, useState } from 'react'
import './BookingByCinema.scss'
import { useDispatch, useSelector } from 'react-redux'
import actCinema from '../../../redux/actions/actCinema';
import actMovie from '../../../redux/actions/actMovie';
import actOrder from '../../../redux/actions/actOrder';
import { useNavigate } from 'react-router-dom';
import actLogin from '../../../redux/actions/actLogin';

export default function BookingByCinema() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const cinemasData = useSelector(state => state.rdcCinema.lsCinemas)
    const moviesData = useSelector(state => state.rdcMovie.movieDetailByCinemaCode)
    const [selectedMovieData, SetSelectedMovieData] = useState()
    const lsMoviesShowing = useSelector(state => state.rdcMovie.lsMovies.movieShowing)

    const isLoginSuccess = useSelector(state => state.rdcLogin.isLoginSuccess)
    // const selectedSessionData = useSelector(state => state.rdcOrder.selectedSessionData)

    const [selection, SetSelection] = useState({});

    const HandleCinemaSelection = (selectedCinemaData) => {
        // console.log(selectedCinemaData.id);
        dispatch({ type: actMovie.GET_MOVIE_BY_CINEMA_CODE, payload: selectedCinemaData.code })
        if (selection.cinemaCode === selectedCinemaData.code) {
            SetSelection({})
        } else {
            SetSelection({})
            setTimeout(() => {
                SetSelection({ cinemaCode: selectedCinemaData.code, cinemaName: selectedCinemaData.name })
            }, 100);
        }
    }

    const HandleMovieSelection = (movieData) => {
        SetSelectedMovieData(movieData)
        localStorage.setItem('selectedMovieId', movieData.id);

        if (selection.movieId === movieData.id) {
            SetSelection({ ...selection, movieId: null })
        } else {
            SetSelection({ ...selection, movieId: null })
            setTimeout(() => {
                SetSelection({ ...selection, movieId: movieData.id })
            }, 100);
        }
    }

    const HandleSessionSelection = (session, dayOfWeekLabel) => {
        // console.log(session);
        // console.log(cinemaString);
        // console.log(selection.selectedMovieData);
        session.dayOfWeekLabel = dayOfWeekLabel; //data này không có dayOfWeekLabel nên bổ sung vào
        // console.log(session);
        dispatch({ type: actOrder.SET_SESSION_ORDER, payload: session })
        // console.log(selection.cinemaName);
        dispatch({ type: actOrder.SET_MOVIE_ORDER, payload: selectedMovieData })
        dispatch({ type: actOrder.SET_CINEMA_ORDER, payload: { cinemaName: selection.cinemaName } })
        if (isLoginSuccess) {
            nav('/booking')
        } else {
            dispatch({ type: actLogin.SET_LOGIN_FORM_SHOW_STATUS, payload: true })
        }
    }

    useEffect(() => {
        dispatch({ type: actCinema.GET_ALL_CINEMA })
        // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     console.log(moviesData);
    // }, [moviesData])

    // useEffect(() => {
    //     console.log(selection);
    // }, [selection])
    return (
        <>
            {
                cinemasData &&
                <div className='bookingByCinema'>
                    <div className='col-cinemas'>
                        {
                            cinemasData && <>
                                <h3 className='h3-title'>CHỌN RẠP</h3>
                                <div className="cards-wrapper">
                                    {
                                        cinemasData.map((cinemaItem, cinemaIndex) => {
                                            return (
                                                <div className={`cinema-card ${cinemaItem.code === selection.cinemaCode ? "selected" : ""}`} key={cinemaIndex} onClick={() => HandleCinemaSelection(cinemaItem)}>
                                                    <p className='cinema-card__name'><b>{cinemaItem.name}</b></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>
                    <div className="col-movies">
                        {
                            selection.cinemaCode &&
                            <>
                                <h3 className='h3-title'>CHỌN PHIM</h3>
                                <div className='cards-wrapper'>
                                    {
                                        moviesData.map((movieItem, movieIndex) => {
                                            return (
                                                <div className={`movie-card ${movieItem.id === selection.movieId ? "selected" : (selection.movieId ? "unselected" : "")}`}
                                                    key={movieIndex}
                                                    data-title={movieItem.name}
                                                    onClick={() => HandleMovieSelection(movieItem)}>
                                                    <img alt='' src={lsMoviesShowing.find(value => value.id === movieItem.id)?.imageLandscapeMobile} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>
                    <div className='col-showtimes'>
                        {
                            selection.movieId &&
                            <>
                                <h3 className='h3-title'>CHỌN SUẤT CHIẾU</h3>
                                <div className="cards-wrapper">
                                    {
                                        selectedMovieData.dates.map((value, index) => {
                                            return <div className='showtime-card' key={index}>
                                                <p className='day-time'><b>{value.dayOfWeekLabel}, {value.showDate}</b></p>
                                                {
                                                    value.bundles.map((bundle, bundleIndex) => {
                                                        return (
                                                            <div className='bundle-wrapper' key={bundleIndex}>
                                                                <label className='bundle-name'>{bundle.version.toUpperCase()} - {bundle.caption === "sub" ? "Phụ Đề" : (bundle.caption === "voice" ? "L.Tiếng" : "Other")}</label>
                                                                <div className='bundle-sessions-wrapper'>
                                                                    {
                                                                        bundle.sessions.map((session, sessionIndex) => {
                                                                            return <span onClick={() => HandleSessionSelection(session, value.dayOfWeekLabel)} key={sessionIndex} className='bundle-session'>{session.showTime}</span>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
        </>

    )
}