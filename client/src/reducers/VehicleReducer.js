import {

    VEHICLE_DETAILS_REQUEST,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    VEHICLE_DETAILS_RESET,

    VEHICLE_VERIFY_FAIL,
    VEHICLE_VERIFY_REQUEST,
    VEHICLE_VERIFY_RESET,
    VEHICLE_VERIFY_SUCCESS,

    VEHICLE_CREATE_RESET,
    VEHICLE_CREATE_FAIL,
    VEHICLE_CREATE_SUCCESS,
    VEHICLE_CREATE_REQUEST,
    VEHICLE_UPDATE_REQUEST,
    VEHICLE_UPDATE_SUCCESS,
    VEHICLE_UPDATE_FAIL,
    VEHICLE_UPDATE_RESET,

} from '../constants/VehicleConstant'

export const vehicleDetailsReducer = (
    state = { vehicle: {} },
    action
) => {
    switch (action.type) {
        case VEHICLE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case VEHICLE_DETAILS_SUCCESS:
            return { loading: false, vehicle: action.payload }
        case VEHICLE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case VEHICLE_DETAILS_RESET:
            return { vehicle: {} }
        default:
            return state
    }
}



export const vehicleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case VEHICLE_CREATE_REQUEST:
            return { loading: true }
        case VEHICLE_CREATE_SUCCESS:
            return { loading: false, success: true, vehicle: action.payload }
        case VEHICLE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case VEHICLE_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const vehicleUpdateReducer = (state = { vehicle: {} }, action) => {
    switch (action.type) {
        case VEHICLE_UPDATE_REQUEST:
            return { loading: true }
        case VEHICLE_UPDATE_SUCCESS:
            return { loading: false, success: true, vehicle: action.payload }
        case VEHICLE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case VEHICLE_UPDATE_RESET:
            return { vehicle: {} }
        default:
            return state
    }
}


export const vehicleVerifyReducer = (state = { vehicle: {} }, action) => {
    switch (action.type) {
        case VEHICLE_VERIFY_REQUEST:
            return { loading: true }
        case VEHICLE_VERIFY_SUCCESS:
            return { loading: false, success: true, vehicle: action.payload }
        case VEHICLE_VERIFY_FAIL:
            return { loading: false, error: action.payload }
        case VEHICLE_VERIFY_RESET:
            return { vehicle: {} }
        default:
            return state
    }
}
