import React, { useEffect, useRef } from 'react'
import './ChangeInformation.scss'
import { useDispatch, useSelector } from 'react-redux'
import actUser from '../../../redux/actions/actUser'
import actLogin from '../../../redux/actions/actLogin'

export default function ChangeInformation() {
    const dispatch = useDispatch()
    const nameRef = useRef()
    const passwordRef = useRef()

    const userInfo = useSelector(state => state.rdcLogin.userInfo);
    const isNamePutSuccess = useSelector(state => state.rdcLogin.isNamePutSuccess)

    const HandleSubmit = (event) => {
        event.preventDefault();
        console.log(nameRef.current.value);
        console.log(passwordRef.current.value);

        console.log(nameRef.current.value, passwordRef.current.value, userInfo.Email);
        dispatch({
            type: actUser.SET_NEW_INFO,
            payload: {
                "Email": userInfo.Email,
                "Name": nameRef.current.value,
                "Password": passwordRef.current.value,
                "Role": userInfo.Role,
            }
        })
    }

    useEffect(() => {
        if (isNamePutSuccess) {
            // console.log(nameRef.current.value);
            // console.log(passwordRef.current.value);
            setTimeout(() => {
                dispatch({ type: actLogin.SET_NAME_PUT_STATUS, payload: null })
            }, 2000);
            localStorage.setItem('userInfo', JSON.stringify({
                "Email": userInfo.Email,
                "Name": userInfo.Name,
                "Role": userInfo.Role,
            }))
        }
    }, [isNamePutSuccess])
    return (
        <div className='changeInformation'>
            <h1>CẬP NHẬT THÔNG TIN</h1>
            <div className="form-wrapper">
                <form onSubmit={HandleSubmit}>
                    <input type="text" placeholder="Nhập tên mới" required ref={nameRef} />
                    <input type="password" placeholder="Mật khẩu" required ref={passwordRef} />
                    <div className='noti-wrapper'>
                        {isNamePutSuccess && <span className='noti-success'>Cập nhật thành công!</span>}
                    </div>
                    <button type='submit'>THAY ĐỔI</button>
                </form>
            </div>
        </div>
    )
}
