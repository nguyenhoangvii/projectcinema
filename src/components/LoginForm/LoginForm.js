import React, { useEffect, useRef, useState } from 'react'
import './LoginForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import actLogin from '../../redux/actions/actLogin';
import logo from '../../assets/Logo_White.png'

export default function LoginForm() {
    const dispatch = useDispatch();
    const isLoginFormShow = useSelector(state => state.rdcLogin.isLoginFormShow);
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

    const HandleCloseButton = () => {
        dispatch({ type: actLogin.SET_LOGIN_FORM_SHOW_STATUS, payload: false })
        dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: false })
        setTimeout(() => {
            dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: null })
        }, 100);
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

    useEffect(() => { //Kiểm tra còn dữ liệu Login trong local thì giữ đăng nhập
        const userInfoLocal = localStorage.getItem('userInfo');
        if (userInfoLocal) {
            dispatch({ type: actLogin.SET_LOGIN_DATA, payload: JSON.parse(userInfoLocal) })
            dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: true })
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (isLoginFormShow) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isLoginFormShow])

    return (
        <>
            {
                isLoginFormShow &&
                <div className='login-form-wrapper'>
                    <div className={`container ${isSignUpActive ? "right-panel-active" : ""}`}>
                        <div className='close' onClick={HandleCloseButton}>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ionicon"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={30}
                                        d="M368 368L144 144M368 144L144 368"
                                    />
                                </svg>

                            </span>
                        </div>
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
                                    <div className='close' onClick={HandleCloseButton}>
                                        <span style={{ left: "-11px" }}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ionicon"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    fill="none"
                                                    stroke="#fff"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={30}
                                                    d="M368 368L144 144M368 144L144 368"
                                                />
                                            </svg>

                                        </span>
                                    </div>
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
            }
        </>

    )
}
