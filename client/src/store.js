import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {

    vehicleDetailsReducer,
    vehicleVerifyReducer,
    vehicleCreateReducer,
    vehicleUpdateReducer,

} from './reducers/VehicleReducer'

import {
    userLoginReducer,
    userRegisterReducer,

} from './reducers/UserReducer';




const reducer = combineReducers({

    vehicleDetails: vehicleDetailsReducer,
    vehicleVerify: vehicleVerifyReducer,

    vehicleCreate: vehicleCreateReducer,
    vehicleUpdate: vehicleUpdateReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,


})



const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null



const initialState = {

    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store