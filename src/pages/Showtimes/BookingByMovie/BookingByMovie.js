import React, { useEffect, useState } from 'react'
import './BookingByMovie.scss'
import { useDispatch, useSelector } from 'react-redux'
import actMovie from '../../../redux/actions/actMovie';
import actOrder from '../../../redux/actions/actOrder';
import { useNavigate } from 'react-router-dom';
import actLogin from '../../../redux/actions/actLogin';

export default function BookingByMovie() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const isLoginSuccess = useSelector(state => state.rdcLogin.isLoginSuccess)
    // const selectedSessionData = useSelector(state => state.rdcOrder.selectedSessionData)

    const lsMoviesShowing = useSelector(state => state.rdcMovie.lsMovies.movieShowing)
    const movieData = useSelector(state => state.rdcMovie.movieData)
    const [selection, SetSelection] = useState({});

    const selectedMovieId = localStorage.getItem('selectedMovieId');
    useEffect(() => {
        if (selectedMovieId) {
            const selectedMovieData = lsMoviesShowing.find(movie => movie.id === selectedMovieId);
            SetSelection({})
            setTimeout(() => {
                SetSelection({ movieId: selectedMovieId, selectedMovieData: selectedMovieData, cinemaIndex: null })
            }, 100);
            dispatch({ type: actMovie.GET_MOVIE_DATA, payload: selectedMovieId });
            setTimeout(() => {
                localStorage.removeItem('selectedMovieId')
            }, 500);
        }
        return () => {
            dispatch({ type: actMovie.SET_MOVIE_DATA, payload: [] })
            localStorage.removeItem('selectedMovieId')
        }
        // eslint-disable-next-line
    }, [])

    const HandleMovieSelection = (selectedMovie) => {
        localStorage.setItem('selectedMovieId', selectedMovie.id);
        if (selection.movieId === selectedMovie.id) { //Nếu click vào phim đó một lần nữa thì bỏ chọn
            SetSelection({})
        } else {
            SetSelection({})
            setTimeout(() => {
                SetSelection({ movieId: selectedMovie.id, selectedMovieData: selectedMovie, cinemaIndex: null })
            }, 100);
            // console.log(selection);
            // dispatch({ type: actMovie.SET_CURRENT_SELECTION, payload: selection });
            dispatch({ type: actMovie.GET_MOVIE_DATA, payload: selectedMovie.id });
        }
        // console.log(selectedMovie);
    }

    const HandleCinemaSelection = (index) => {
        if (selection.cinemaIndex === index) {
            SetSelection({ ...selection, cinemaIndex: null })
        } else {
            SetSelection({ ...selection, cinemaIndex: null })
            // console.log(index);
            setTimeout(() => {
                SetSelection({ ...selection, cinemaIndex: index })
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
        dispatch({ type: actOrder.SET_MOVIE_ORDER, payload: selection.selectedMovieData })
        dispatch({ type: actOrder.SET_CINEMA_ORDER, payload: { cinemaName: movieData[selection.cinemaIndex].name } })
        // console.log(selection.selectedMovieData);
        if (isLoginSuccess) {
            nav('/booking')
        } else {
            dispatch({ type: actLogin.SET_LOGIN_FORM_SHOW_STATUS, payload: true })
        }
    }



    // useEffect(() => {
    //     console.log(lsMoviesShowing);
    // }, [lsMoviesShowing])
    // useEffect(() => {
    //     console.log(movieData);
    // }, [movieData])

    useEffect(() => {
        console.log(movieData);
    }, [movieData])

    return (
        <>
            {
                lsMoviesShowing &&
                <div className='bookingByMovie'>
                    <div className="col-movies">
                        <h3 className='h3-title'>CHỌN PHIM</h3>
                        <div className='cards-wrapper'>
                            {
                                lsMoviesShowing.map((value, index) => {
                                    return (
                                        <div className={`movie-card ${value.id === selection.movieId ? "selected" : (selection.movieId ? "unselected" : "")}`}
                                            key={index}
                                            style={{ order: `${value.id === selectedMovieId ? 0 : index}` }}
                                            onClick={() => HandleMovieSelection(value)}
                                            data-title={value.name}>
                                            <img alt='' src={value.imageLandscapeMobile} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-cinemas'>
                        {
                            selection.movieId && <>
                                <h3 className='h3-title'>CHỌN RẠP</h3>
                                <div className="cards-wrapper">
                                    {
                                        movieData.map((value, index) => {
                                            return (
                                                <div className={`cinema-card ${index === selection.cinemaIndex ? "selected" : ""}`} key={index} onClick={() => HandleCinemaSelection(index)}>
                                                    <p className='cinema-card__name'><b>{value.name}</b></p>
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
                            (selection.cinemaIndex || selection.cinemaIndex === 0) && <>
                                <h3 className='h3-title'>CHỌN SUẤT CHIẾU</h3>
                                <div className="cards-wrapper">
                                    {
                                        movieData[selection.cinemaIndex]?.dates.map((value, index) => {
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
