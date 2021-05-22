import api from '../utils/api';

import {

    VEHICLE_DETAILS_REQUEST,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    VEHICLE_DETAILS_RESET,

    VEHICLE_VERIFY_FAIL,
    VEHICLE_VERIFY_REQUEST,
    VEHICLE_VERIFY_SUCCESS,

    VEHICLE_CREATE_REQUEST,
    VEHICLE_CREATE_SUCCESS,
    VEHICLE_CREATE_FAIL,
    VEHICLE_UPDATE_REQUEST,
    VEHICLE_UPDATE_SUCCESS,
    VEHICLE_UPDATE_FAIL,

} from '../constants/VehicleConstant';
import { logout } from './UserAction';


export const listVehicleDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: VEHICLE_DETAILS_REQUEST })

        const { data } = await api.get(`/vehicle/${id}`)

        dispatch({
            type: VEHICLE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: VEHICLE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}



export const createVehicle = (plateNumber) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VEHICLE_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            header: {
                "auth-token": `${userInfo.token}`,
            },
        }

        const { data } = await api.post(`/vehicle/register`, { plateNumber }, config)

        dispatch({
            type: VEHICLE_CREATE_SUCCESS,
            payload: data,
        })

        dispatch({ type: VEHICLE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }

        dispatch({
            type: VEHICLE_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateVehicle = (vehicle) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VEHICLE_UPDATE_REQUEST,
        })

        dispatch({
            type: VEHICLE_DETAILS_RESET,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": `${userInfo.token}`,
            },
        }

        const { data } = await api.put(
            `/vehicle/${vehicle._id}`,
            vehicle,
            config
        )

        dispatch({
            type: VEHICLE_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: VEHICLE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: VEHICLE_UPDATE_FAIL,
            payload: message,
        })
    }
}



export const verify = (plateNumber) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VEHICLE_VERIFY_REQUEST,
        })

        dispatch({
            type: VEHICLE_DETAILS_RESET,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${userInfo.token}`

            },
        }

        console.log(plateNumber)

        const { data } = await api.post(`/vehicle/verify`, { plateNumber }, config)

        dispatch({
            type: VEHICLE_VERIFY_SUCCESS,
            payload: data,
        })

        dispatch({ type: VEHICLE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }

        dispatch({
            type: VEHICLE_VERIFY_FAIL,
            payload: message,
        })
    }
}

