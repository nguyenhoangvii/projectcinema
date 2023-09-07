import React, { useEffect, useState } from 'react'
import './NavBar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import actLogin from '../../redux/actions/actLogin';
import logo from '../../assets/Logo.png'

export default function NavBar() {
    const nav = useNavigate();
    const dispatch = useDispatch()
    const [isFixed, SetIsFixed] = useState(false);
    // const userInfo = useSelector(state => state.rdcLogin.userInfo)
    const isLoginSuccess = useSelector(state => state.rdcLogin.isLoginSuccess)

    // const userInfo = localStorage.getItem('userInfo')

    const ToggleNavbar = () => {
        // console.log(navbarRef.current.offsetHeight);
        // const navbarHeight = navbarRef.current.offsetHeight;
        if (window.scrollY > 90) { //90 is Navbar height
            SetIsFixed(true)
        } else if (window.scrollY === 0) {
            SetIsFixed(false)
        }
    };

    const HandleLogout = () => {
        nav('/')
        dispatch({ type: actLogin.SET_LOGIN_DATA, payload: null })
        dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: false })
        setTimeout(() => {
            dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: null })
        }, 100);
    }

    // useEffect(() => {
    //     console.log(isFixed, window.scrollY);
    // }, [isFixed]);

    useEffect(() => {
        window.addEventListener('scroll', ToggleNavbar);
        return () => {
            window.removeEventListener('scroll', ToggleNavbar);
        };
    }, []);

    const HandleLoginShow = () => {
        dispatch({ type: actLogin.SET_LOGIN_FORM_SHOW_STATUS, payload: true })
    }

    return (
        <>
            {isFixed && <div style={{ height: '9rem' }}></div>}
            {/* <div style={{ height: '9rem' }}></div> */}
            <nav className={`nav-bar ${isFixed ? 'fixed' : 'static'}`}>
                {/* <nav className={`nav-bar fixed`}> */}
                {console.log()}
                <img className='logo' alt='logo' src={logo} onClick={() => {
                    nav('/');
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }} />
                {/* <img className='logo' alt='logo' src='https://e7.pngegg.com/pngimages/417/55/png-clipart-everyman-logo-cinema-logos-thumbnail.png' /> */}
                <div className='links-wrapper'>
                    <Link to='/'><h3>TRANG CHỦ</h3></Link>
                    <Link to='/movies'><h3>PHIM</h3></Link>
                    <Link to='/showtimes'><h3>ĐẶT VÉ</h3></Link>
                    {
                        (!isLoginSuccess) &&
                        // eslint-disable-next-line
                        <a><h3 onClick={HandleLoginShow}>ĐĂNG NHẬP</h3></a>
                    }
                    {
                        isLoginSuccess &&
                        <div className="avatar-wrapper">
                            <div className='avatar' onClick={() => nav('/user/ticket')}>
                                <img alt='' src={`https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`} />
                            </div>
                            <ul className="dropdown__list">
                                <li className="dropdown__item" onClick={() => nav('/user/ticket')}>
                                    <span className="dropdown__text">VÉ ĐÃ ĐẶT</span>
                                    <i className="fa fa-solid fa-ticket-simple"></i>
                                </li>
                                <li className="dropdown__item" onClick={() => nav('/user/change-information')}>
                                    <span className="dropdown__text" >CẬP NHẬT THÔNG TIN</span>
                                    <i className="fa fa-user dropdown__icon"></i>
                                </li>
                                <li className="dropdown__item" onClick={() => nav('/user/change-password')}>
                                    <span className="dropdown__text" >ĐỔI MẬT KHẨU</span>
                                    <i className="fa-solid fa-key"></i>
                                </li>
                                <li className="dropdown__item" onClick={HandleLogout}>
                                    <span className="dropdown__text" >ĐĂNG XUẤT</span>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}
