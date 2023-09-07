import React, { useEffect } from 'react'
// import NavBar from '../../components/NavBar/NavBar'
import Banner from '../../components/Banner/Banner'
import { useDispatch } from 'react-redux'
import actOrder from '../../redux/actions/actOrder'
import MoviesSlider from '../../components/MoviesSlider/MoviesSlider'
import Footer from '../../components/Footer/Footer'

export default function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: actOrder.SET_SESSION_ORDER, payload: null })
        dispatch({ type: actOrder.SET_MOVIE_ORDER, payload: null })
        dispatch({ type: actOrder.SET_CINEMA_ORDER, payload: null })
        localStorage.removeItem('selectedMovieId')
    })
    return (
        <div>
            <Banner />
            <MoviesSlider />
            <Footer />
        </div>
    )
}
