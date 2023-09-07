import { applyMiddleware, combineReducers, createStore } from "redux";
import rdcMovie from "./reducers/rdcMovie"
import rdcBooking from "./reducers/rdcBooking"
import rdcCinema from "./reducers/rdcCinema"
import rdcOrder from "./reducers/rdcOrder"
import rdcLogin from "./reducers/rdcLogin"
import rdcUser from "./reducers/rdcUser"
import createSagaMiddleware from "redux-saga"
import mySaga from "./sagas/mySaga";

const middle = createSagaMiddleware();

const globalState = combineReducers({
    rdcMovie,
    rdcBooking,
    rdcCinema,
    rdcOrder,
    rdcLogin,
    rdcUser
})

const store = createStore(globalState, applyMiddleware(middle))

export default store;

middle.run(mySaga)