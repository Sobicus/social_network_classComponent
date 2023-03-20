import axios from "axios";
import {profileContactsType, ProfileType} from "../redux/store";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "978ec9e4-88e0-4331-b5bc-a8ba69be02cb"}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<responseUsersType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    followUser(userId: number) {
        return instance.post<FollowUnfollowType>(`follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete<FollowUnfollowType>(`follow/${userId}`)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatusProfile(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatusProfile(status: string) {
        return instance.put('profile/status', {status: status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: setProfileType) {
        return instance.put('profile', profile)
    }
}
export const authAPI = {
    authMe() {
        return instance.get<responseAuthType>('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string = '') {
        return instance.post<responseLoginType>('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}
type responseLoginType = {
    resultCode: number
    messages: Array<string>
    data: {
        userId: number
    }
}
export type modelType = {
    email: string
    password: string
    rememberMe: boolean
}
type responseUsersType = {
    items: Array<responseItemType>
    totalCount: number
    error: string
}
type responseItemType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: usersPhotosStateType
    status: string
    followed: boolean
}
type usersPhotosStateType = {
    small: string
    large: string
}
export type FollowUnfollowType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type responseAuthType = {
    data: responseDataType
    resultCode: number
    messages: Array<string>

}
type responseDataType = {
    id: number
    email: string
    login: string
}
export type setProfileType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: profileContactsType
}