import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppDispatch} from "./redux-store";

const SET_USER_DATA = 'social-network/auth/SET-USER-DATA'
const ERROR_MESSAGE = 'social-network/auth/ERROR-MESSAGE'
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET-CAPTCHA-URL-SUCCESS'

const initialAuthState: initialAuthStateType = {
    userId: 1,
    login: "",
    email: "",
    isAuth: false,
    errorMessage: '',
    captchaUrl: ''
}
// let initialAuthState1 = {
//     userId: null as number | null,
//     login: null as string | null,
//     email: null as string | null,
//     isAuth: false
// }
// type initialAuthState1Type = typeof initialAuthState1
export type initialAuthStateType = {
    userId: number
    login: string
    email: string
    isAuth: boolean
    errorMessage: string
    captchaUrl: string
}
export const authReducer = (state: initialAuthStateType = initialAuthState, action: authReducerType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        case ERROR_MESSAGE: {
            return {...state, errorMessage: action.errorMessage}
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {...state, captchaUrl: action.captchaUrl}
        }
        default:
            return state
    }
}
export const setUserDataAC = (userId: number, login: string, email: string, isAuth: boolean) => {
    return {type: SET_USER_DATA, payload: {userId, login, email, isAuth}} as const
}
export const errorAuthMessageAC = (errorMessage: string) => {
    return {type: ERROR_MESSAGE, errorMessage} as const
}
export const getCaptchaUrlSuccessAC = (captchaUrl: string) => {
    return {type: GET_CAPTCHA_URL_SUCCESS, captchaUrl} as const
}
export const authMeTC = () => async (dispatch: AppDispatch) => {
    let response = await authAPI.authMe()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setUserDataAC(id, login, email, true))
    }

}
export const loginTC = (email: string, password: string, rememberMe: boolean, captcha:string) => async (dispatch: AppDispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        await dispatch(authMeTC())
        dispatch(errorAuthMessageAC(''))
        dispatch(getCaptchaUrlSuccessAC(''))
    } else {
        if (response.data.resultCode === 10) {
           await dispatch(getCaptchaUrlTC())
        }
        let errorMesage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
         dispatch(errorAuthMessageAC(errorMesage))
    }

}

export const getCaptchaUrlTC = () => async (dispatch: AppDispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccessAC(captchaUrl))
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserDataAC(0, '', '', false))
    }
}
type setUserDataACType = ReturnType<typeof setUserDataAC>
type errorMessageACType = ReturnType<typeof errorAuthMessageAC>
type getCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccessAC>
type authReducerType = setUserDataACType | errorMessageACType | getCaptchaUrlSuccessType