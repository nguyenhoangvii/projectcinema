import React, { useEffect, useState } from 'react'
import './MoviesSlider.scss'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

export default function MoviesSlider() {
    // const movieItemRef = useRef()
    const lsMoviesNowShowing = useSelector(state => state.rdcMovie.lsMovies.movieShowing);
    const lsMoviesComingSoon = useSelector(state => state.rdcMovie.lsMovies.movieCommingSoon);
    const [isMoviesNowShowing, SetIsMoviesNowShowing] = useState(true);
    const lsMoviesData = isMoviesNowShowing ? lsMoviesNowShowing : lsMoviesComingSoon;

    const [sliderIndex, SetSliderIndex] = useState(0)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const HandleBrowserResize = () => {
        setWindowWidth(window.innerWidth);
    };
    //Chiều rộng màn hình chia cho 300 (itemWidth và lề) rồi làm tròn sẽ ra số item hiển thị
    const itemQuantity = Math.floor(windowWidth / 300);
    //Chiều rộng màn hình trừ cho 2 bên padding, trừ cho khoảng cách để hiện border radius, trừ cho sai số nhỏ, trừ cho số lượng margin của item, chia cho số lượng item dự kiến
    //Sẽ ra được chiều rộng của item mong muốn để vừa màn hình :D
    const itemWidth = (windowWidth - 100 - 40 - 5 - (itemQuantity - 1) * 40) / itemQuantity;
    useEffect(() => {
        window.addEventListener('resize', HandleBrowserResize);
        return () => {
            window.removeEventListener('resize', HandleBrowserResize);
        };
    }, []);

    const nav = useNavigate()
    const HandleBuyTicketClick = (selectedMovieId, event) => {
        event.stopPropagation();
        localStorage.setItem('selectedMovieId', selectedMovieId);
        nav('/showtimes')
    }

    const HandleSliderNav = (newSliderIndex) => {
        if (newSliderIndex >= 0 && newSliderIndex <= lsMoviesData?.length - itemQuantity) {
            SetSliderIndex(newSliderIndex)
        } else if (newSliderIndex < 0) {
            SetSliderIndex(lsMoviesData?.length - itemQuantity)
        } else {
            SetSliderIndex(0)
        }
    }

    //Auto scroll slides
    useEffect(() => {
        const intervalId = setInterval(() => {
            HandleSliderNav(sliderIndex + 1)
            // console.log("run", activeIndex);
        }, 3000);

        return () => {
            clearInterval(intervalId);
            // console.log("remove");
        }
    },)
    return (
        <>
            <div className="movie-list-container">
                <div className='title'>
                    <h1 className={isMoviesNowShowing ? "selected" : ""} onClick={() => { SetIsMoviesNowShowing(true); SetSliderIndex(0); }}>Phim đang chiếu</h1>
                    <span className='line'></span>
                    <h1 className={!isMoviesNowShowing ? "selected" : ""} onClick={() => { SetIsMoviesNowShowing(false); SetSliderIndex(0); }}>Phim sắp chiếu</h1>
                    <Link to={'/movies'}>Xem thêm</Link>
                </div>
                <div className="movie-list-wrapper">
                    <button className='nav-btn prev-btn' onClick={() => HandleSliderNav(sliderIndex - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="#414141" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M328 112L184 256l144 144" /></svg>
                    </button>
                    <button className='nav-btn next-btn' onClick={() => HandleSliderNav(sliderIndex + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="#414141" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144" /></svg>
                    </button>
                    <div className="movie-list" style={{ transform: `translateX(-${sliderIndex * (itemWidth + 40)}px)` }}>
                        {
                            lsMoviesData?.map((movieItem, index) => {
                                return (
                                    <div className="movie-list-item" key={index} style={{ width: `${itemWidth}px` }}>
                                        <div className='img-container' onClick={() => nav(`/movies/${movieItem.slug}`)}>
                                            <img className="movie-list-item-img" src={movieItem.imagePortrait} alt="" />
                                            <div className='btn-wrapper' >
                                                <button className='btn btn-white' onClick={(event) => { nav(`/movies/${movieItem.slug}`); event.stopPropagation(); }}>
                                                    CHI TIẾT
                                                </button>
                                                {isMoviesNowShowing && <button className='btn btn-gradient' onClick={(event) => HandleBuyTicketClick(movieItem.id, event)}>ĐẶT VÉ</button>}
                                            </div>
                                        </div>
                                        <h3>{movieItem.name}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >

        </>
    )
}
