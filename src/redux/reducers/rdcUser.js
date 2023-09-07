import actUser from "../actions/actUser";

const initialState = {
    lsTickets: []
}

const rdcUser = (state = initialState, { type, payload }) => {
    switch (type) {
        case actUser.SET_ALL_TICKET:
            return {
                ...state,
                lsTickets: payload,
            }

        default:
            return state;
    }
}

export default rdcUser;
