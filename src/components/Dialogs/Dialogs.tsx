import React, {ChangeEvent} from "react";
import style from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";

type DialogsType = {}

export const Dialogs: React.FC<DialogsType> = (props) => {
    let newMessageElement = React.createRef<HTMLTextAreaElement>()
    let newMessageBody = useAppSelector(state=>state.dialogsPage.newMessageBody)
    let state = useAppSelector(state=>state.dialogsPage)
    const dispatch = useAppDispatch()

    const onSendMessageClick = () => {
        dispatch(sendMessageAC())
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        dispatch(updateNewMessageBodyAC(body))
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
                            value={newMessageBody}
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