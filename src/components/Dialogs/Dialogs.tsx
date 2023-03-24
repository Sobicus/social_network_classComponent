import React, {ChangeEvent} from "react";
import style from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {dialogsPageType} from '../../redux/store';
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";

type DialogsType = {
   /*
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    dialogsPage: dialogsPageType
*/
}

export const Dialogs: React.FC<DialogsType> = (props) => {
    /*
    let state = props.dialogsPage
    */
    let newMessageElement = React.createRef<HTMLTextAreaElement>()
    /*
    let newMessageBody = props.dialogsPage.newMessageBody
*/
    let newMessageBody1 = useAppSelector(state=>state.dialogsPage.newMessageBody)
    const dispatch = useAppDispatch()



    const onSendMessageClick = () => {
        sendMessageAC()
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        updateNewMessageBodyAC(body)
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogs_items}>
                {state.dialogsData.map(el => <DialogItem id={el.id} name={el.name} avatar={el.avatar}
                                                         key={el.id}/>)}
            </div>
            <div className={style.messages}>
                {state.messageData.map(el => <Message message={el.message} key={el.id}/>)}
                <div>
                    <div>
                        <textarea
                            value={newMessageBody1}
                            ref={newMessageElement}
                            placeholder='Enter your message'
                            onChange={onNewMessageChange}
                        >
                        </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>

            </div>


        </div>
    )
}