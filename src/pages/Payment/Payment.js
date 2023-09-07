import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actOrder from '../../redux/actions/actOrder';
import './Payment.scss'
import chip from '../../assets/chip.png'
import visa from '../../assets/Visa.png'
import { useNavigate } from 'react-router-dom';

export default function Payment() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const userInfo = useSelector(state => state.rdcLogin.userInfo)
    const isPaymentSuccess = useSelector(state => state.rdcOrder.isPaymentSuccess)
    const bookingData = useSelector(state => state.rdcOrder.bookingData);
    const selectedMovieData = useSelector(state => state.rdcOrder.selectedMovieData)
    const selectedSessionData = useSelector(state => state.rdcOrder.selectedSessionData)
    const selectedCinemaData = useSelector(state => state.rdcOrder.selectedCinemaData)

    // useEffect(() => {
    //     console.log(bookingData);
    // }, [bookingData])

    const [cardNumber, setCardNumber] = useState('');
    const handleCardNumberChange = (event) => {
        const input = event.target.value;
        const formattedInput = input
            .replace(/\s/g, '') // Loại bỏ khoảng trắng
            .replace(/\D/g, '') // Loại bỏ tất cả các ký tự không phải số
            .replace(/(\d{4})(?=\d)/g, '$1 '); // Tự động cách số sau mỗi 4 chữ số
        setCardNumber(formattedInput);
    };

    const [date, setDate] = useState('');
    const handleDateChange = (event) => {
        const input = event.target.value;
        const formattedInput = input
            .replace(/\D/g, '') // Loại bỏ tất cả các ký tự không phải số
            .replace(/^(\d{2})/, '$1/') // Tự động thêm dấu / sau 2 số đầu tiên

        setDate(formattedInput);
    };

    const cardName = useRef()
    const cvvRef = useRef()

    const HandlePayment = (event) => {
        event.preventDefault();

        const postData = {
            "BankId": 2,
            "CardNumber": cardNumber.replace(/\s/g, ''),
            "CardName": cardName.current.value,
            "ExpireDate": date.replace(/\//g, ''),
            "CVV": cvvRef.current.value,
            "Email": userInfo.Email,
            ...bookingData,
            "CinemaName": selectedCinemaData.cinemaName,
            "FilmName": selectedMovieData.name,
            "ImageLandscape": selectedMovieData.imageLandscape,
            "ImagePortrait": selectedMovieData.imagePortrait,
            "TheaterName": selectedSessionData.screenName,
            "ShowCode": selectedSessionData.id,
            "ShowTime": new Date(selectedSessionData.sessionBusinessDate.substring(0, 11) + selectedSessionData.showTime).toISOString(),
        }

        console.log(postData);
        dispatch({ type: actOrder.POST_TICKET, payload: postData })
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    useEffect(() => {
        if (isPaymentSuccess) {
            setTimeout(() => {
                nav('/user/ticket');
            }, 2500);
        }
        setTimeout(() => {
            dispatch({ type: actOrder.SET_PAYMENT_STATUS, payload: null })
        }, 2500);

        return () => {
            dispatch({ type: actOrder.SET_SESSION_ORDER, payload: null })
            dispatch({ type: actOrder.SET_MOVIE_ORDER, payload: null })
            dispatch({ type: actOrder.SET_CINEMA_ORDER, payload: null })
        }
    }, [isPaymentSuccess])
    return (
        <div className='payment'>
            {
                isPaymentSuccess &&
                <div className='noti-success-wrapper'>
                    <i className="fa-regular fa-circle-check"></i>
                    <h1>Thanh toán thành công!</h1>
                </div>
            }

            {
                isPaymentSuccess === false &&
                <div className='noti-error-wrapper'>
                    <i className="fa-regular fa-circle-xmark"></i>
                    <h1>Thanh toán không thành công!<br />Vui lòng kiểm tra lại</h1>
                </div>
            }

            <h1>THÔNG TIN THANH TOÁN</h1>
            <h2>Số tiền thanh toán: <b>{formatCurrency(bookingData?.Price)}</b></h2>
            <form onSubmit={HandlePayment}>
                <div className='card-wrapper'>
                    <div className='img-wrapper'>
                        <img className='chip-img' alt='' src={chip} />
                        <img className='visa-img' alt='' src={visa} />
                    </div>
                    <div>
                        <input className='number' type="text" placeholder="0000 0000 0000 0000" required
                            pattern="[0-9\s]*" value={cardNumber} onChange={handleCardNumberChange} maxLength="19" />
                        <div className='name-ddmm'>
                            <input className='name' type="text" placeholder="HO VA TEN" required ref={cardName} />
                            <input className='ddmm' type="text" placeholder="DD/MM" required
                                value={date} onChange={handleDateChange} maxLength="5" />
                        </div>
                    </div>
                </div>
                <div className='card-2-wrapper'>
                    <div className='black'></div>
                    <input className='ddmm' type="number" placeholder="CVV" required
                        ref={cvvRef} maxLength="3" />
                </div>
                <button className='btn btn-gradient' type='submit'>THANH TOÁN</button>
            </form>
        </div>
    )
}
