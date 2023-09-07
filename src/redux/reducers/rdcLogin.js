import actLogin from "../actions/actLogin";

const initialState = {
    isLoginFormShow: false,
    userInfo: null,
    isLoginSuccess: null,
    isSignUpSuccess: null,
    isNamePutSuccess: null,
    isPasswordPutSuccess: null,
}

const rdcLogin = (state = initialState, { type, payload }) => {
    switch (type) {
        case actLogin.SET_LOGIN_FORM_SHOW_STATUS:
            return {
                ...state,
                isLoginFormShow: payload,
            }
        case actLogin.SET_LOGIN_DATA:
            return {
                ...state,
                userInfo: payload,
            }
        case actLogin.SET_LOGIN_STATUS:
            return {
                ...state,
                isLoginSuccess: payload,
            }
        case actLogin.SET_SIGNUP_STATUS:
            return {
                ...state,
                isSignUpSuccess: payload,
            }
        case actLogin.SET_NAME_PUT_STATUS:
            return {
                ...state,
                isNamePutSuccess: payload,
            }
        case actLogin.SET_PASWORD_PUT_STATUS:
            return {
                ...state,
                isPasswordPutSuccess: payload,
            }
        default:
            return state;
    }
}

export default rdcLogin;