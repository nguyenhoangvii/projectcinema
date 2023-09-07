import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute(props) {
    const nav = useNavigate();

    useEffect(() => { //Kiểm tra còn dữ liệu Login trong local thì giữ đăng nhập
        const userInfoLocal = localStorage.getItem('userInfo');
        if (!userInfoLocal) {
            nav('/login')
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            {props.children}
        </div>
    )
}
