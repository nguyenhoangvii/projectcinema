import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actMovie from '../../redux/actions/actMovie';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieDetail.scss'
import HTMLReactParser from 'html-react-parser';
import Trailer from './Trailer/Trailer';
import MoviesSlider from '../../components/MoviesSlider/MoviesSlider';
import Footer from '../../components/Footer/Footer';

export default function MovieDetail() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { slug } = useParams();
    const movieData = useSelector(state => state.rdcMovie.movieDetailBySlug)
    const [isTrailerShow, SetIsTrailerShow] = useState(false);

    const HandleBuyTicketClick = () => {
        localStorage.setItem('selectedMovieId', movieData.id);
        nav('/showtimes')
    }

    const HandleTrailerButtonClick = () => {
        SetIsTrailerShow(true);
        setTimeout(() => {
            // trailerRef.current.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: window.innerHeight - 90, // 50% chiều cao viewport
                behavior: "smooth"
            });
        }, 10);

    }

    useEffect(() => {
        dispatch({ type: actMovie.GET_MOVIE_DETAIL, payload: slug })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        // eslint-disable-next-line
    }, [slug]);

    useEffect(() => {
        if (movieData === "error") nav('/')
        // eslint-disable-next-line
    }, [movieData])

    useEffect(() => {
        dispatch({ type: actMovie.GET_MOVIE_DETAIL, payload: slug })

        return () => {
            dispatch({ type: actMovie.SET_MOVIE_DETAIL, payload: {} })
        }
        // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     console.log(movieData);
    // }, [movieData])

    return (
        <div className='movieDetail'>
            <div className='header'>
                <div className='header-img' onClick={HandleTrailerButtonClick}>
                    <img alt='' src={movieData?.imagePortrait} />
                    <div className='play-button'>
                        <i className="fa-solid fa-play"></i>
                    </div>
                </div>
                <div className='header-content-wrapper'>
                    <h1 className='h1-title' >{movieData?.name}</h1>
                    <h2 className='h2-title'>{movieData?.subName}</h2>
                    <p className='other-info'>
                        <span>Điểm: <b>{movieData.point?.toFixed(1)}/10</b></span>
                        <span>Độ tuổi: <b>{movieData.age?.toUpperCase()}</b></span>
                        <span>Thời lượng: <b>{movieData?.duration} phút</b></span>
                        <span>Ngày khởi chiếu: <b>{new Date(movieData?.startdate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</b></span>
                    </p>

                    <div className='desc-wrapper'>
                        {HTMLReactParser(`${movieData?.description}`)}
                    </div>

                    <div className='main-btn-wrapper'>
                        <button className='btn btn-white' onClick={HandleTrailerButtonClick}>TRAILER</button>
                        <button className='btn btn-gradient' onClick={HandleBuyTicketClick}>ĐẶT VÉ</button>
                    </div>
                </div>
            </div>
            <div className='main-content'>
                <div className='trailer-session' style={{ display: isTrailerShow ? "block" : "none" }}>
                    <Trailer trailerSrc={movieData?.trailer} />
                </div>
                <MoviesSlider />
                <Footer />
            </div>
        </div>
    )
}
