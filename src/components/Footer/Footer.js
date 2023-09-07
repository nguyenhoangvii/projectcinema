import React from 'react'
import './Footer.scss'
import logo from '../../assets/Logo_White.png'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='footer'>
            <img alt='' src={logo} />
            <div className='link-wrapper'>
                <Link to='/'>HOME</Link>
                <Link to='/movies'>PHIM</Link>
                <Link to='/showtimes'>ĐẶT VÉ</Link>
                <Link to='/user/ticket'>TÀI KHOẢN</Link>
                <Link to='/user/change-password'>ĐỔI MẬT KHẨU</Link>
                <Link to='/login'>ĐĂNG NHẬP</Link>
            </div>
            <div className='icons-wrapper'>
                <span><i className="fa-brands fa-facebook-f"></i></span>
                <span><i className="fa-brands fa-youtube"></i></span>
                <span><i class="fa-brands fa-instagram"></i></span>
            </div>
            <p>Copyright ©2023 All rights reserved | This website is made with  <span><i className="fa-solid fa-heart"></i></span></p>
        </div >
    )
}
