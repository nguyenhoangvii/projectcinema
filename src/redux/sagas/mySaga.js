import { call, put, takeEvery } from "redux-saga/effects"
import actMovie from "../actions/actMovie";
import { CreateAccountAPI, DeleteAccountAPI, GetAllCinemaAPI, GetAllMovieAPI, GetAllTicketAPI, GetMovieDataAPI, GetMovieDataByCinemaCodeAPI, GetMovieDataBySlugAPI, GetSeatComboPriceDataAPI, GetUnavailableSeatsAPI, PostTicketAPI, UpdateUserNameAPI, UpdateUserPasswordAPI, UserLoginAPI } from "../../configs/api";
import actBooking from "../actions/actBooking";
import actCinema from "../actions/actCinema";
import actOrder from "../actions/actOrder";
import actLogin from "../actions/actLogin";
import actUser from "../actions/actUser";

function* GetAllMovie() {
    let data = yield call(GetAllMovieAPI);
    yield put({ type: actMovie.SET_ALL_MOVIE, payload: data });
}

function* GetMovieDetail({ type, payload }) {
    try {
        let data = yield call(GetMovieDataBySlugAPI, payload);
        yield put({ type: actMovie.SET_MOVIE_DETAIL, payload: data })
    } catch (error) {
        yield put({ type: actMovie.SET_MOVIE_DETAIL, payload: "error" })
    }
}

function* GetMovieData({ type, payload }) {
    let data = yield call(GetMovieDataAPI, payload);
    yield put({ type: actMovie.SET_MOVIE_DATA, payload: data });
}

function* GetSeatComboPriceData() {
    let data = yield call(GetSeatComboPriceDataAPI);
    yield put({ type: actBooking.SET_SEAT_COMBO_PRICE_DATA, payload: data })
}

function* GetAllCinema() {
    let data = yield call(GetAllCinemaAPI);
    yield put({ type: actCinema.SET_ALL_CINEMA, payload: data })
}

function* GetMovieDataByCinemaCode({ type, payload }) {
    let data = yield call(GetMovieDataByCinemaCodeAPI, payload)
    yield put({ type: actMovie.SET_MOVIE_BY_CINEMA_CODE, payload: data })
}

function* GetUnavailableSeats({ type, payload }) {
    let data = yield call(GetUnavailableSeatsAPI, payload);
    yield put({ type: actBooking.SET_UNAVAILABLE_SEAT, payload: data })
}

function* PostTicket({ type, payload }) {
    let res = yield call(PostTicketAPI, payload);
    if (res.status === 200) {
        // console.log(res);
        // alert("OK")
        yield put({ type: actOrder.SET_PAYMENT_STATUS, payload: true })
    } else {
        yield put({ type: actOrder.SET_PAYMENT_STATUS, payload: false })
        // alert("Có lỗi xảy ra!")
    }
}

function* GetLoginData({ type, payload }) {
    try {
        let data = yield call(UserLoginAPI, payload);
        yield put({ type: actLogin.SET_LOGIN_DATA, payload: data })
        yield put({ type: actLogin.SET_LOGIN_STATUS, payload: true })
    } catch (error) {
        // alert("Sai")
        yield put({ type: actLogin.SET_LOGIN_STATUS, payload: false })
        // yield put({ type: actLogin.SET_LOGIN_DATA, payload:  })
    }
}

function* CreateAccount({ type, payload }) {
    try {
        yield call(CreateAccountAPI, payload)
        yield put({ type: actLogin.SET_SIGNUP_STATUS, payload: true })
    } catch (error) {
        yield put({ type: actLogin.SET_SIGNUP_STATUS, payload: false })
        alert("Có lỗi xảy ra!")
    }
}

function* GetAllTicket({ type, payload }) {
    let data = yield call(GetAllTicketAPI, payload);
    yield put({ type: actUser.SET_ALL_TICKET, payload: data })
}

function* UpdateUserName({ type, payload }) {
    try {
        yield call(UpdateUserNameAPI, payload)
        // alert("Cập nhật thành công!");
        yield put({ type: actLogin.SET_NAME_PUT_STATUS, payload: true })
        yield put({ type: actLogin.SET_LOGIN_DATA, payload: payload })
    } catch (error) {
        alert("Có lỗi xảy ra!");
    }
}

function* UpdateUserPassword({ type, payload }) {
    try {
        let res = yield call(UpdateUserPasswordAPI, payload)
        // alert("Cập nhật thành công!");
        if (res.status === 200) {
            yield put({ type: actLogin.SET_PASWORD_PUT_STATUS, payload: true })
        } else {
            yield put({ type: actLogin.SET_PASWORD_PUT_STATUS, payload: false })
        }
    } catch (error) {
        alert("Có lỗi xảy ra!");
    }
}

function* DeleteAccount({ type, payload }) {
    console.log(payload);
    let res = yield call(DeleteAccountAPI, payload)
    try {
        console.log(res);
        if (res.status === 200) {
            alert("Xóa tài khoản thành công!");
        } else {
            alert("Có lỗi xảy ra!");
        }
    } catch (error) {
        alert("Có lỗi xảy ra!");
    }
}



function* mySaga() {
    yield takeEvery(actMovie.GET_ALL_MOVIE, GetAllMovie)
    yield takeEvery(actMovie.GET_MOVIE_DETAIL, GetMovieDetail)
    yield takeEvery(actMovie.GET_MOVIE_DATA, GetMovieData)
    yield takeEvery(actBooking.GET_UNAVAILABLE_SEAT, GetUnavailableSeats)
    yield takeEvery(actBooking.GET_SEAT_COMBO_PRICE_DATA, GetSeatComboPriceData)
    yield takeEvery(actCinema.GET_ALL_CINEMA, GetAllCinema)
    yield takeEvery(actMovie.GET_MOVIE_BY_CINEMA_CODE, GetMovieDataByCinemaCode)
    yield takeEvery(actOrder.POST_TICKET, PostTicket)
    yield takeEvery(actLogin.GET_LOGIN_DATA, GetLoginData)
    yield takeEvery(actLogin.CREATE_ACCOUNT, CreateAccount)
    yield takeEvery(actUser.GET_ALL_TICKET, GetAllTicket)
    yield takeEvery(actUser.SET_NEW_INFO, UpdateUserName)
    yield takeEvery(actUser.SET_NEW_PASSWORD, UpdateUserPassword)
    yield takeEvery(actLogin.DELETE_ACOUNT, DeleteAccount)
}

export default mySaga;