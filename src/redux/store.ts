import {AddPostACType} from "./profile-reducer";
import {sendMessageACType, updateNewMessageBodyACType} from "./dialogs-reducer";

// export let store: storeType = {
//     _state: {
//         profilePage: {
//             postsData: [
//                 {id: '1', message: 'It`s my first post', likesCounter: 1},
//                 {id: '2', message: 'Hi, how are you?', likesCounter: 5},
//                 {id: '3', message: 'GO GO GO?', likesCounter: 7},
//                 {id: '4', message: 'Test props', likesCounter: 13},
//             ],
//             newPostText: '',
//         },
//         dialogsPage: {
//             dialogsData: [
//                 {
//                     id: '1',
//                     name: 'Max',
//                     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
//                 },
//                 {
//                     id: '2',
//                     name: 'Alina',
//                     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
//                 },
//                 {
//                     id: '3',
//                     name: 'Vika',
//                     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
//                 },
//                 {
//                     id: '4',
//                     name: 'Lubov',
//                     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
//                 },
//                 {
//                     id: '5',
//                     name: 'Anatoliy',
//                     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
//                 },
//             ],
//             messageData: [
//                 {id: '1', message: 'Hi'},
//                 {id: '2', message: 'How are you?'},
//                 {id: '3', message: 'Good, and you?'},
//             ],
//             newMessageBody: '',
//         },
//         usersPage: {
//             users: [
//                 {
//                     name: 'Alina',
//                     id: 1,
//                     uniqueUrlName: 'test',
//                     photos: {
//                         small: "null",
//                         large: 'https://cdn.dribbble.com/users/3734064/screenshots/14348087/media/a99ab961c8f8c7d29b5f7136e0b19ca4.png?compress=1&resize=400x300&vertical=top'
//                     },
//                     status: 'I am a boss',
//                     followed: false
//                 },
//                 {
//                     name: 'Max',
//                     id: 2,
//                     uniqueUrlName: 'test',
//                     photos: {
//                         small: "null",
//                         large: 'https://cdn.dribbble.com/users/3734064/screenshots/14348087/media/a99ab961c8f8c7d29b5f7136e0b19ca4.png?compress=1&resize=400x300&vertical=top'
//                     },
//                     status: 'I am a boss',
//                     followed: true
//                 },
//                 {
//                     name: 'Vika',
//                     id: 3,
//                     uniqueUrlName: 'test',
//                     photos: {
//                         small: "null",
//                         large: 'https://cdn.dribbble.com/users/3734064/screenshots/14348087/media/a99ab961c8f8c7d29b5f7136e0b19ca4.png?compress=1&resize=400x300&vertical=top'
//                     },
//                     status: 'I am a boss',
//                     followed: false
//                 },
//             ],
//             pageSize: 5,
//             totalUsersCount: 0,
//             currentPage: 1,
//         },
//     },
//     _callSubscriber(state: stateType) {
//         console.log('State changed')
//     },
//
//     getState() {
//         return this._state
//     },
//     subscribe(observer: (state: stateType) => void) {
//         this._callSubscriber = observer
//     },
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//
//         this._callSubscriber(this._state)
//     }
// }
export type ActionsType = AddPostACType | sendMessageACType | updateNewMessageBodyACType

export type storeType = {
    _state: stateType
    getState: () => stateType
    _callSubscriber: (state: stateType) => void
    subscribe: (observer: (state: stateType) => void) => void
    dispatch: (action: ActionsType) => void
}
export type stateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    usersPage: usersPageType
}
export type profilePageType = {
    postsData: Array<postsDataType>
    profile: ProfileType | undefined
    status: string
    errorMessage:string
}
export type dialogsPageType = {
    dialogsData: Array<dialogsDataType>
    messageData: Array<messageDataType>
    newMessageBody: string
}
export type messageDataType = {
    id: string
    message: string
}
export type dialogsDataType = {
    id: string
    name: string
    avatar: string
}
export type postsDataType = {
    id: number
    message: string
    likesCounter: number
}
export type usersPageType = {
    users: Array<usersStateType>
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
export type usersStateType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: usersPhotosStateType
    status: string
    followed: boolean
}
export type usersPhotosStateType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string
    contacts: profileContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: usersPhotosStateType
}
//below differents  variants typization for Object.keys().map
//1
/*
export type ContactsKeys = 'facebook' | 'website' | 'vk' | 'twitter' | 'instagram' | 'youtube' | 'github' | 'mainLink'
export type profileContactsType = Record<ContactsKeys, string>
*/
//2

/*export type profileContactsType={
    [key: string]: string
}*/


export type profileContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}