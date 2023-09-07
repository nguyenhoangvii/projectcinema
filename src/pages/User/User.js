import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actLogin from '../../redux/actions/actLogin'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './User.scss'

export default function User() {
    const location = useLocation();
    const dispatch = useDispatch()
    const nav = useNavigate();
    const userInfo = useSelector(state => state.rdcLogin.userInfo)
    // const userTickets = useSelector(state => state.rdcUser.lsTickets)
    const [params, SetParams] = useState("ticket")

    useEffect(() => {
        const sessionName = location.pathname.split('/').pop()
        SetParams(sessionName)
        // eslint-disable-next-line
    }, [location]);

    const HandleLogout = () => {
        nav('/')
        dispatch({ type: actLogin.SET_LOGIN_DATA, payload: null })
        dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: false })
        setTimeout(() => {
            dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: null })
        }, 100);
    }

    // useEffect(() => {
    //     dispatch({ type: actUser.GET_ALL_TICKET, payload: userInfo.Email })
    //     // eslint-disable-next-line
    // }, [])




    // const handleButtonClick = () => {
    //     const confirmed = window.confirm("Bạn có chắc chắn muốn tiếp tục?");
    //     if (confirmed) {
    //         // Thực hiện hành động khi người dùng chọn Yes
    //     } else {
    //         // Thực hiện hành động khi người dùng chọn No
    //     }
    // };

    return (
        <div className='user'>
            <div className='side-bar'>
                <div className='user-info'>
                    <div className='avatar' onClick={() => nav('/user')}>
                        <img alt='' src={`https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`} />
                    </div>
                    <h2 className='user-name'>{userInfo?.Name}</h2>
                    <h2 className='user-email'>{userInfo?.Email}</h2>
                </div>
                <div className='menu-wrapper'>
                    <ul className="menu">
                        <li className={`menu-item ${params === "ticket" ? "active" : ""}`} onClick={() => nav('/user/ticket')}>
                            <i className="fa fa-solid fa-ticket-simple"></i>
                            <span className="menu-text">Vé đã đặt</span>
                        </li>
                        <li className={`menu-item ${params === "change-information" ? "active" : ""}`} onClick={() => nav('/user/change-information')}>
                            <i className="fa-solid fa-user-pen"></i>
                            <span className="menu-text">Cập nhật thông tin</span>
                        </li>
                        <li className={`menu-item ${params === "change-password" ? "active" : ""}`} onClick={() => nav('/user/change-password')}>
                            <i className="fa-solid fa-key"></i>
                            <span className="menu-text">Đổi mật khẩu</span>
                        </li>
                        <li className={`menu-item ${params === "delete-account" ? "active" : ""}`} onClick={() => nav('/user/delete-account')}>
                            <i className="fa-solid fa-user-large-slash"></i>
                            <span className="menu-text">Xóa tài khoản</span>
                        </li>
                        <li className="menu-item" onClick={HandleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span className="menu-text">Đăng xuất</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='main-content'>
                <Outlet />
            </div>

            {/* <button onClick={HandleLogout}>ĐĂNG XUẤT</button> */}

            {/* {
                userTickets.length > 0 &&
                <div className='cards-wrapper'>
                    {
                        userTickets.map((ticket, index) => {
                            return <div className='card' key={index}>
                                <h3>{ticket.FilmName}</h3>
                                <p>{ticket.CinemaName}, {ticket.TheaterName}</p>
                                <p>Suất chiếu: {new Date(ticket.ShowTime).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                <p>Thời gian: {new Date(ticket.ShowTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                                <p>{ticket.Combo}</p>
                                <p>{ticket.SeatCode}</p>
                                <br />
                            </div>
                        })
                    }
                </div>
            } */}
        </div>
    )
}
