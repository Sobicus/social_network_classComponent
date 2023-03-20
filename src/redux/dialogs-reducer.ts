import {ActionsType, messageDataType, dialogsPageType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = 'social-network/dialogs/UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'social-network/dialogs/SEND-MESSAGE';

let initialState:dialogsPageType =
    {
        dialogsData: [
            {
                id: '1',
                name: 'Max',
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
            },
            {
                id: '2',
                name: 'Alina',
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
            },
            {
                id: '3',
                name: 'Vika',
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
            },
            {
                id: '4',
                name: 'Lubov',
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
            },
            {
                id: '5',
                name: 'Anatoliy',
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBStQk5WBxo9GGOnZ8vLmViRGavDshthEnw&usqp=CAU"
            },
        ],
        messageData: [
            {id: '1', message: 'Hi'},
            {id: '2', message: 'How are you?'},
            {id: '3', message: 'Good, and you?'},
        ],
        newMessageBody: '',
    }
export const dialogsReducer = (state: dialogsPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            return {...state, newMessageBody: action.body}
        }
        case SEND_MESSAGE: {
            let newMessage: messageDataType = {
                id: '1',
                message: state.newMessageBody
            }
            return {...state, messageData: [...state.messageData, newMessage], newMessageBody: ''}
        }
        default:
            return state

    }
}

export const sendMessageAC = (): sendMessageACType => {
    return {
        type: SEND_MESSAGE
    } as const
}
export const updateNewMessageBodyAC = (body: string): updateNewMessageBodyACType => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: body
    } as const
}

export type sendMessageACType = {
    type: 'social-network/dialogs/SEND-MESSAGE'
}
export type updateNewMessageBodyACType = {
    type: 'social-network/dialogs/UPDATE-NEW-MESSAGE-BODY'
    body: string
}

