import actCinema from "../actions/actCinema";

const initialState = {
    lsCinemas: [],
}

const rdcCinema = (state = initialState, { type, payload }) => {
    switch (type) {
        case actCinema.SET_ALL_CINEMA:
            return {
                ...state,
                lsCinemas: payload,
            }

        default:
            return state;
    }
}

export default rdcCinema;

