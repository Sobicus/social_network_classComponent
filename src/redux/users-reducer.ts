import {usersPageType, usersStateType} from "./store";
import {FollowUnfollowType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppDispatch, useAppDispatch} from "./redux-store";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET-USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState: usersPageType = {
    users: [
        // {
        //     name: "string",
        //     id: 2,
        //     uniqueUrlName: "string",
        //     photos: {
        //         small: "string",
        //         large: "string"
        //     },
        //     status: "string",
        //     followed: true,
        // }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}
export const usersReducer = (state: usersPageType = initialState, action: UsersReducerActionType) => {
    switch (action.type) {
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case FOLLOW: {
            return {
                ...state, users: updateObjectInArray(state.users, 'id', action.userID, {followed: true})
                /*users:state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)*/
            }
        }
        case UNFOLLOW: {
            return {
                ...state, users: updateObjectInArray(state.users, 'id', action.userID, {followed: false})
                /*users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)*/
            }
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}
export const setUsersAC = (users: Array<usersStateType>) => {
    return {type: SET_USERS, users} as const
}
export const followAC = (userID: number) => {
    return {
        type: FOLLOW,
        userID
    } as const
}
export const unfollowAC = (userID: number) => {
    return {
        type: UNFOLLOW,
        userID
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, currentPage} as const
}
export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const
}
export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {type: TOGGLE_IS_FETCHING, isFetching} as const
}
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const
}
export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    // axios.get<responseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {withCredentials:true})
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setCurrentPageAC(currentPage))
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAC(data.items))
    dispatch(setTotalUsersCountAC(data.totalCount))
}
const followUnfollowFlow = async (
    dispatch: AppDispatch,
    userId: number,
    apiMethod: (userId: number) => Promise<AxiosResponse<FollowUnfollowType>>,
    actionCreator: (userId: number) => UsersReducerActionType) => {

    dispatch(toggleFollowingProgressAC(true, userId))
    let response = await apiMethod(userId)
    console.log(response)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgressAC(false, userId))
}

export const followTC = (userId: number) => async (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followAC)
    /*dispatch(toggleFollowingProgressAC(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgressAC(false, userId))*/
}
export const unfollowTC = (userId: number) => async (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowAC)
    /* dispatch(toggleFollowingProgressAC(true, userId))
     let response = await apiMethod(userId)
     if (response.data.resultCode === 0) {
         dispatch(actionCreator(userId))
     }
     dispatch(toggleFollowingProgressAC(false, userId))*/
}

type toggleFollowingProgressACType = ReturnType<typeof toggleFollowingProgressAC>
type toggleIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>
type setUsersTotalCountACType = ReturnType<typeof setTotalUsersCountAC>
type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
type setUsersACType = ReturnType<typeof setUsersAC>
type FollowACType = ReturnType<typeof followAC>
type UnfollowACType = ReturnType<typeof unfollowAC>
export type UsersReducerActionType = FollowACType |
    UnfollowACType |
    setUsersACType |
    setCurrentPageACType |
    setUsersTotalCountACType |
    toggleIsFetchingACType |
    toggleFollowingProgressACType