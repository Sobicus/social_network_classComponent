import {AppDispatch} from "./redux-store";
import {authMeTC} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'social-network/app/SET-INITIALIZED'

let initialAppState: initialStateType = {
    initialized: false
}

export type initialStateType = {
    initialized: boolean
}
export const appReducer = (state: initialStateType = initialAppState, action: appReducerType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {...state, initialized: true}
        }
        default:
            return state
    }
}

export const initializedSuccessAC = () => {
    return {type: INITIALIZED_SUCCESS} as const
}
export const initializedAppTC = () => (dispatch: AppDispatch) => {
    let promise = dispatch(authMeTC())
    promise.then(() => {
        dispatch(initializedSuccessAC())
    })
}
type appReducerType = ReturnType<typeof initializedSuccessAC>