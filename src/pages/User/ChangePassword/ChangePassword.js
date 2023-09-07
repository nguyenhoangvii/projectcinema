import React, { useEffect, useRef } from 'react'
import './ChangePassword.scss'
import { useDispatch, useSelector } from 'react-redux'
import actLogin from '../../../redux/actions/actLogin'
import actUser from '../../../redux/actions/actUser'

export default function ChangePassword() {
    const dispatch = useDispatch()
    const passwordRef = useRef()
    const newPasswordRef = useRef()

    const userInfo = useSelector(state => state.rdcLogin.userInfo);
    const isPasswordPutSuccess = useSelector(state => state.rdcLogin.isPasswordPutSuccess)

    const HandleSubmit = (event) => {
        event.preventDefault();

        dispatch({
            type: actUser.SET_NEW_PASSWORD,
            payload: {
                "Email": userInfo.Email,
                "Password": passwordRef.current.value,
                "PasswordNew": newPasswordRef.current.value,
                "Role": userInfo.Role,
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: actLogin.SET_PASWORD_PUT_STATUS, payload: null })
        }, 2000); //Thời gian đọc thông báo
        // eslint-disable-next-line
    }, [isPasswordPutSuccess])
    return (
        <div className='changePassword'>
            <h1>ĐỔI MẬT KHẨU</h1>
            <div className="form-wrapper">
                <form onSubmit={HandleSubmit}>
                    <input type="password" placeholder="Mật khẩu cũ" required ref={passwordRef} />
                    <input type="password" placeholder="Mật khẩu mới" required ref={newPasswordRef} />
                    <div className='noti-wrapper'>
                        {isPasswordPutSuccess && <span className='noti-success'>Đổi mật khẩu thành công!</span>}
                        {isPasswordPutSuccess === false && <span className='noti-error'>Mật khẩu không chính xác!</span>}
                    </div>
                    <button type='submit'>THAY ĐỔI</button>
                </form>
            </div>
        </div>
    )
}
