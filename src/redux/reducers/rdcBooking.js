import actBooking from "../actions/actBooking";

const initialState = {
    seatData: [],
    ticketData: [],
    comboData: [],
    unavailableSeats: [],
}

const rdcBooking = (state = initialState, { type, payload }) => {
    switch (type) {
        case actBooking.SET_SEAT_COMBO_PRICE_DATA:
            return {
                ...state,
                seatData: payload.seatPlan.seatLayoutData.areas,
                ticketData: payload.ticket,
                comboData: payload.consession[0].concessionItems,
            }
        case actBooking.SET_UNAVAILABLE_SEAT:
            return {
                ...state,
                unavailableSeats: payload,
            }

        default:
            return state;
    }
}

export default rdcBooking;