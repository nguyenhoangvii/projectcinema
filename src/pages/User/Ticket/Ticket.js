import React, { useEffect } from 'react'
import './Ticket.scss'
import { useDispatch, useSelector } from 'react-redux'
import actUser from '../../../redux/actions/actUser';
import { useNavigate } from 'react-router-dom';

export default function Ticket() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const userTickets = useSelector(state => state.rdcUser.lsTickets);
    const userInfo = useSelector(state => state.rdcLogin.userInfo);

    useEffect(() => {
        if (userInfo && userInfo.Email) {
            dispatch({ type: actUser.GET_ALL_TICKET, payload: userInfo.Email });
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        console.log(userTickets);
    }, [userTickets]);

    return (
        <div className='ticket'>
            <h1>Vé đã đặt</h1>
            {
                userTickets?.length > 0 ?
                    <div className='cards-wrapper'>
                        {
                            userTickets.map((ticket, index) => {
                                return <div className='card' key={index}>
                                    <img alt='' src={ticket.ImagePortrait} />
                                    <div className='ticket-info-wrapper'>
                                        <h3>{ticket.FilmName}</h3>
                                        <p>Rạp: <b>{ticket.CinemaName}</b>, <b>{ticket.TheaterName}</b></p>
                                        <p>Suất chiếu: <b>{new Date(ticket.ShowTime).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</b></p>
                                        <p>Thời gian: <b>{new Date(ticket.ShowTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</b></p>
                                        <p>Combo: <b>{ticket.Combo}</b></p>
                                        <p>Mã ghế: <b>{ticket.SeatCode}</b></p>
                                    </div>
                                    <br />
                                </div>
                            })
                        }
                    </div>
                    : <div className='no-ticket-noti-wrapper'>
                        <h1>BẠN CHƯA CÓ VÉ NÀO</h1>
                        <button className='btn btn-gradient' onClick={() => nav('/showtimes')}>ĐẶT VÉ NGAY</button>
                    </div>
            }

        </div>
    )
}
