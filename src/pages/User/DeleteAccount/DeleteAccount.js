import React from 'react'
import './DeleteAccount.scss'
import { useDispatch, useSelector } from 'react-redux'
import actLogin from '../../../redux/actions/actLogin'
import { useNavigate } from 'react-router-dom';

export default function DeleteAccount() {
    const dispatch = useDispatch();
    const nav = useNavigate()
    const userInfo = useSelector(state => state.rdcLogin.userInfo);

    const HandleSubmit = (event) => {
        console.log(userInfo.Email);
        dispatch({ type: actLogin.DELETE_ACOUNT, payload: { "Email": userInfo.Email } })

        nav('/')
        dispatch({ type: actLogin.SET_LOGIN_DATA, payload: null })
        dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: false }) //Set sang false để LoginForm bắt được và xóa trong localStorage
        setTimeout(() => {
            dispatch({ type: actLogin.SET_LOGIN_STATUS, payload: null })
        }, 100);
    }

    return (
        <div className='deleteAccount'>
            <h1>XÓA TÀI KHOẢN</h1>
            <div className="form-wrapper">
                <form onSubmit={HandleSubmit}>
                    <h1>TÀI KHOẢN SẼ BỊ XÓA VĨNH VIỄN</h1>
                    <button type='submit'>XÁC NHẬN</button>
                </form>
            </div>
        </div>
    )
}
