import React, { useEffect } from 'react'
import './App.scss'
import Home from './pages/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import { useDispatch } from 'react-redux'
import actMovie from './redux/actions/actMovie'
import Showtimes from './pages/Showtimes/Showtimes'
import Booking from './pages/Booking/Booking'
import NotFound from './pages/NotFound/NotFound'
import Payment from './pages/Payment/Payment'
import LoginForm from './components/LoginForm/LoginForm'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Movies from './pages/Movies/Movies'
import User from './pages/User/User'
import Ticket from './pages/User/Ticket/Ticket'
import ChangePassword from './pages/User/ChangePassword/ChangePassword'
import ChangeInformation from './pages/User/ChangeInformation/ChangeInformation'
import DeleteAccount from './pages/User/DeleteAccount/DeleteAccount'
import Login from './pages/Login/Login'

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actMovie.GET_ALL_MOVIE })
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <LoginForm />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies/' element={<Movies />} />
          <Route path='/movies/:slug' element={<MovieDetail />} />
          <Route path='/showtimes' element={<Showtimes />} />
          <Route path='/booking' element={<PrivateRoute><Booking /></PrivateRoute>} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user/:session?' element={<PrivateRoute><User /></PrivateRoute>} >
            <Route path='ticket' element={<Ticket />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='change-information' element={<ChangeInformation />} />
            <Route path='delete-account' element={<DeleteAccount />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}