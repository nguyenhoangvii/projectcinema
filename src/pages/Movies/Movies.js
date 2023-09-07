import React, { useEffect, useState } from 'react'
import './Movies.scss'
import MoviesNowShowing from './MoviesNowShowing/MoviesNowShowing';
import MoviesComingSoon from './MoviesComingSoon/MoviesComingSoon';
import { useDispatch, useSelector } from 'react-redux';
import actMovie from '../../redux/actions/actMovie';
import Footer from '../../components/Footer/Footer';

export default function Movies({ position }) {
    const [isMoviesShowingSession, SetIsMoviesShowingSession] = useState(true);
    const lsMoviesShowing = useSelector(state => state.rdcMovie.lsMovies)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: actMovie.GET_ALL_MOVIE })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    return (<>
        <div className='movies'>
            <div className='sidebar' style={{ position: position }}>
                <h1 className={isMoviesShowingSession ? "selected" : ""} onClick={() => SetIsMoviesShowingSession(true)}>Phim đang chiếu</h1>
                <h1 className={!isMoviesShowingSession ? "selected" : ""} onClick={() => SetIsMoviesShowingSession(false)}>Phim sắp chiếu</h1>
            </div>
            <div className='main-content'>
                {isMoviesShowingSession ? <MoviesNowShowing data={lsMoviesShowing.movieShowing} /> : <MoviesComingSoon data={lsMoviesShowing.movieCommingSoon} />}
            </div>
        </div>
        <Footer />
    </>
    )
}
