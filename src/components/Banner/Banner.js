import React, { useEffect, useState } from 'react'
import './Banner.scss'
import { CarouselItem } from './CarouselItem/CarouselItem';
import { useSelector } from 'react-redux';
import HTMLReactParser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

export default function Banner() {
    const nav = useNavigate();
    const lsMoviesShowing = useSelector(state => state.rdcMovie.lsMovies.movieShowing)
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = lsMoviesShowing?.length - 1;
        } else if (newIndex === lsMoviesShowing?.length) {
            newIndex = 0;
        }
        // console.log(newIndex);
        setActiveIndex(newIndex);
    };

    const HandleBuyTicketClick = (selectedMovieId) => {
        localStorage.setItem('selectedMovieId', selectedMovieId);
        nav('/showtimes')
    }

    // useEffect(() => {
    //     console.log(lsMoviesShowing);
    // }, [lsMoviesShowing])

    //Auto scroll slides
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateIndex(activeIndex + 1);
            // console.log("run", activeIndex);
        }, 3000);

        return () => {
            clearInterval(intervalId);
            // console.log("remove");
        }
    },)

    return (
        <div className='banner'>
            {/* {console.log(lsMoviesShowing)} */}
            {
                lsMoviesShowing &&
                <div className='movie-info-wrapper' >
                    <div className='bg-blur' style={{ backgroundImage: `url(${lsMoviesShowing[activeIndex].imageLandscape})` }}></div>
                    {/* {console.log(lsMoviesShowing)} */}
                    <div className='movie-info-text'>
                        <h1>{lsMoviesShowing[activeIndex].name}</h1>
                        <div className='desc-wrapper'>{HTMLReactParser(lsMoviesShowing[activeIndex].description)}</div>
                    </div>
                    <span className='three-dots'>...</span>
                    <div className='main-btn-wrapper'>
                        <button className='btn btn-white' onClick={() => nav(`./movies/${lsMoviesShowing[activeIndex].slug}`)}>CHI TIẾT</button>
                        <button className='btn btn-gradient' onClick={() => HandleBuyTicketClick(lsMoviesShowing[activeIndex].id)}>ĐẶT VÉ</button>
                    </div>

                    <div className='nav-btn-wrapper'>
                        <button className="btn-arrow" onClick={() => { updateIndex(activeIndex - 1) }}  >
                            <span>{"<"}</span>
                        </button>
                        <button className="btn-arrow" onClick={() => { updateIndex(activeIndex + 1) }}>
                            <span>{">"}</span>
                        </button>
                    </div>
                    <div className="indicators">
                        {lsMoviesShowing?.map((item, index) => {
                            return (
                                <button key={index} className="indicator" onClick={() => { updateIndex(index); }}>
                                    <span className={`material-symbols-outlined ${index === activeIndex ? "indicator-symbol-active" : "indicator-symbol"}`}>

                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            }

            <div className="carousel-wrapper">
                <div className="carousel">
                    <div className="carousel-items" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {lsMoviesShowing?.map((value, index) => {
                            return <CarouselItem key={index} data={value} width={"100%"} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
