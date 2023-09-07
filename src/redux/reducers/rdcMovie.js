import actMovie from "../actions/actMovie";

const initialState = {
    lsMovies: [],
    movieDetailBySlug: {},
    movieDetailByCinemaCode: [],
    movieData: [],
}

const rdcMovie = (state = initialState, { type, payload }) => {
    switch (type) {
        case actMovie.SET_ALL_MOVIE:
            return {
                ...state,
                lsMovies: payload
            }
        case actMovie.SET_MOVIE_DETAIL:
            return {
                ...state,
                movieDetailBySlug: payload
            }

        case actMovie.SET_MOVIE_DATA:
            return {
                ...state,
                movieData: payload,
            }
        case actMovie.SET_MOVIE_BY_CINEMA_CODE: {
            return {
                ...state,
                movieDetailByCinemaCode: payload,
            }
        }

        default:
            return state;
    }
}

export default rdcMovie;