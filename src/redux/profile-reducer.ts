import {Dispatch} from "redux";
import {postsDataType, profilePageType, ProfileType, usersPhotosStateType} from "./store";
import {profileAPI, setProfileType} from "../api/api";
import {AppDispatch, RootStateType} from "./redux-store";
import {errorAuthMessageAC} from "./auth-reducer";

const ADD_POST = 'social-network/profile/ADD-POST';
const DELETE_POST = 'social-network/profile/DELETE-POST';
/*const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';*/
const SET_USER_PROFILE = 'social-network/profile/SET-USER-PROFILE';
const SET_STATUS = 'social-network/profile/SET-STATUS';
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE-PHOTO-SUCCESS'
const ERROR_MESSAGE = 'social-network/profile/ERROR-MESSAGE'

let initialState: profilePageType = {
    postsData: [
        {id: 1, message: 'It`s my first post', likesCounter: 1},
        {id: 2, message: 'Hi, how are you?', likesCounter: 5},
        {id: 3, message: 'GO GO GO?', likesCounter: 7},
        {id: 4, message: 'Test props', likesCounter: 13},
    ],
    profile: undefined,
    /*{
            "aboutMe": "я круто чувак 11%",
            "contacts": {
                "facebook": "facebook.com",
                "website": "null",
                "vk": "vk.com/dimych",
                "twitter": "https://twitter.com/@sdf",
                "instagram": "instagra.com/sds",
                "youtube": "null",
                "github": "github.com",
                "mainLink": "null"
            },
            "lookingForAJob": true,
            "lookingForAJobDescription": "не ищу, а дурачусь",
            "fullName": "samurai dimych",
            "userId": 2,
            "photos": {
                "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
                "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
            }
        },*/
    status: 'Field for status',
    errorMessage: ''
}
export const profileReducer = (state: profilePageType = initialState, action: actionsProfileReducerType) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: postsDataType = {
                id: 5,
                message: action.newPost,
                likesCounter: 1
            }
            return {...state, postsData: [...state.postsData, newPost], newPostText: ''}
        }
        case DELETE_POST: {
            return {...state, postsData: state.postsData.filter(el => el.id !== action.postId)}
        }
        /*case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newText}
        }*/
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
            // if (state.profile) {
            //     return {...state, profile: {...state.profile, photos: action.photos}}
            // } else {
            //
            // return state
            // }
        }
        case ERROR_MESSAGE:{
            return {...state, errorMessage:action.errorMessage}
        }
        default:
            return state
    }
}
export const addPostAC = (newPost: string): AddPostACType => {
    return {
        type: ADD_POST,
        newPost
    } as const
}
export const deletePostAC = (postId: number): deletePostACType => {
    return {type: DELETE_POST, postId} as const
}
/*export const updateNewPostTextAC = (text: string): UpdateNewPostTextACType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}*/
export const setUserProfileAC = (profile: ProfileType): setUserProfileType => {
    return {type: SET_USER_PROFILE, profile} as const
}
export const setStatusProfileAC = (status: string): setStatusProfileACType => {
    return {type: SET_STATUS, status} as const
}
export const savePhotoSuccessAC = (photos: usersPhotosStateType): savePhotoSuccessACType => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    } as const
}
export const errorProfileMessageAC = (errorMessage: string): errorProfileMessageACType => {
    return {type: ERROR_MESSAGE, errorMessage} as const
}
export const saveProfileTC = (profile: setProfileType, setEditMode: (editMode: boolean) => void) => async (dispatch: AppDispatch, getState: () => RootStateType) => {
    const userID = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        await dispatch(setUserProfileTC(userID))
        setEditMode(false)
    }
    if (response.data.resultCode === 1) {
        let errorMesыage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(errorProfileMessageAC(errorMesыage))
        setEditMode(true)
    }
}
export const getStatusProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatusProfile(userId)
    dispatch(setStatusProfileAC(response.data))
}
export const updateStatusProfileTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatusProfile(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusProfileAC(status))
    }
}
export const setUserProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data))
}
export const savePhotoTC = (file: File) => async (dispatch: AppDispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data.photos))
    }
}
export type setStatusProfileACType = {
    type: 'social-network/profile/SET-STATUS'
    status: string
}
export type setUserProfileType = {
    type: 'social-network/profile/SET-USER-PROFILE'
    profile: ProfileType
}
export type AddPostACType = {
    type: 'social-network/profile/ADD-POST'
    newPost: string
}
type deletePostACType = {
    type: 'social-network/profile/DELETE-POST'
    postId: number
}
type savePhotoSuccessACType = {
    type: 'social-network/profile/SAVE-PHOTO-SUCCESS',
    photos: usersPhotosStateType
}
type errorProfileMessageACType = {
    type: 'social-network/profile/ERROR-MESSAGE',
    errorMessage: string
}
/*export type UpdateNewPostTextACType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}*/
export type actionsProfileReducerType =
    AddPostACType
    | setUserProfileType
    | setStatusProfileACType
    | deletePostACType
    | savePhotoSuccessACType
    | errorProfileMessageACType