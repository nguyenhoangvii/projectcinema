import React, { useEffect, useRef, useState } from 'react'
import './Login.scss'
import { useDispatch, useSelector } from 'react-redux'
import actLogin from '../../redux/actions/actLogin';
import logo from '../../assets/Logo_White.png'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const [isSignUpActive, SetIsSignUpActive] = useState(false);

    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();
    const signUpNameRef = useRef();
    const signUpEmailRef = useRef();
    const signUpPasswordRef = useRef();

    const isLoginSuccess = useSelector(state => state.rdcLogin.isLoginSuccess)
    const isSignUpSuccess = useSelector(state => state.rdcLogin.isSignUpSuccess)
    const userInfo = useSelector(state => state.rdcLogin.userInfo)

    const HandleLoginButton = (event) => {
        event.preventDefault();
        const emailValue = loginEmailRef.current.value;
        const passwordValue = loginPasswordRef.current.value;
        // console.log(emailValue, passwordValue);

        dispatch({ type: actLogin.GET_LOGIN_DATA, payload: { "Email": emailValue, "Password": passwordValue } })
    }

    const HandleSignupButton = (event) => {
        event.preventDefault();
        const signUpNameValue = signUpNameRef.current.value;
        const signUpEmailValue = signUpEmailRef.current.value;
        const signUpPasswordValue = signUpPasswordRef.current.value;

        dispatch({
            type: actLogin.CREATE_ACCOUNT,
            payload: {
                "Email": signUpEmailValue,
                "Name": signUpNameValue,
                "Password": signUpPasswordValue,
                "Role": 0,
            },
        })
    }

    useEffect(() => {
        setTimeout(() => {
            SetIsSignUpActive(false)
        }, 1500);
        setTimeout(() => {
            dispatch({ type: actLogin.SET_SIGNUP_STATUS, payload: null })
        }, 2000); //Set thời gian đọc thông báo
        // eslint-disable-next-line
    }, [isSignUpSuccess])

    useEffect(() => {
        if (isLoginSuccess) {
            setTimeout(() => {
                dispatch({ type: actLogin.SET_LOGIN_FORM_SHOW_STATUS, payload: false })
                nav('/user/ticket')
            }, 1000);//Set thời gian để người dùng đọc thông báo đăng nhập thành công
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            // const userInfoLocal = localStorage.getItem('userInfo');
            // console.log(userInfoLocal);
            // console.log(JSON.parse(userInfoLocal));
        } else if (isLoginSuccess === false) { //Chỉ khi Logout mới xóa dữ liệu, F5 không mất Login
            localStorage.removeItem('userInfo')
            setTimeout(() => {
                dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: null })
            }, 1000);
            // const userInfoLocal = localStorage.getItem('userInfo');
            // console.log(userInfoLocal);
        }
        // eslint-disable-next-line
    }, [isLoginSuccess])


    return (

        <div className='loginPage'>
            <div className={`container ${isSignUpActive ? "right-panel-active" : ""}`}>
                <div className="form-container sign-up-container">
                    <form onSubmit={HandleSignupButton}>
                        <h1>Tạo tài khoản</h1>
                        <input type="text" placeholder="Name" required ref={signUpNameRef} />
                        <input type="email" placeholder="Email" required ref={signUpEmailRef} />
                        <input type="password" placeholder="Password" required ref={signUpPasswordRef} />
                        <button>ĐĂNG KÝ</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={HandleLoginButton}>
                        <h1>Đăng nhập</h1>
                        <input type="email" placeholder="Email" required ref={loginEmailRef} />
                        <input type="password" placeholder="Password" required ref={loginPasswordRef} />
                        <p className='noti'>
                            {
                                isLoginSuccess && <span className='noti-success'>Đăng nhập thành công!</span>
                            }
                            {
                                isLoginSuccess === false && <span className='noti-error'>Tài khoản hoặc mật khẩu không đúng!</span>
                            }
                        </p>
                        <button>ĐĂNG NHẬP</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1> <img alt='' src={logo} />xin chào!</h1>
                            <p>{isSignUpSuccess ? "Tạo tài khoản thành công!" : " Nếu đã có tài khoản thì ĐĂNG NHẬP thôi nào!"}</p>
                            <button
                                onClick={() => SetIsSignUpActive(false)}
                                className="ghost">
                                ĐẾN TRANG ĐĂNG NHẬP
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Lần đầu tiên<br />bạn đến đây?</h1>
                            <p>Hãy đăng ký tài khoản để sử dụng đầy đủ tính năng nhé! Let's goooooo</p>
                            <button
                                onClick={() => SetIsSignUpActive(true)}
                                className="ghost">
                                ĐĂNG KÝ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}
