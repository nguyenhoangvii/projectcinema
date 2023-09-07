import actOrder from "../actions/actOrder";

const initialState = {
    bookingData: null,
    selectedMovieData: null,
    selectedSessionData: null,
    selectedCinemaData: null,
    isPaymentSuccess: null,
}

const rdcOrder = (state = initialState, { type, payload }) => {
    switch (type) {
        case actOrder.SET_SEAT_COMBO_COST_ORDER:
            return {
                ...state,
                bookingData: payload,
            }
        case actOrder.SET_MOVIE_ORDER:
            return {
                ...state,
                selectedMovieData: payload,
            }
        case actOrder.SET_CINEMA_ORDER:
            return {
                ...state,
                selectedCinemaData: payload,
            }
        case actOrder.SET_SESSION_ORDER:
            return {
                ...state,
                selectedSessionData: payload,
            }
        case actOrder.SET_PAYMENT_STATUS:
            return {
                ...state,
                isPaymentSuccess: payload,
            }

        default:
            return state;
    }
}

export default rdcOrder;