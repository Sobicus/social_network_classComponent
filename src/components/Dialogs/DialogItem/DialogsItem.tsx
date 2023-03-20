import style from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

type DialogItemPropsType = {
    id: string
    name: string
    avatar: string
}
export const DialogItem:React.FC<DialogItemPropsType> = (props) => {
    return (
        <div className={style.dialog + ' ' + style.active}>
            <NavLink to={`/dialogs/${props.id}`}>
                <img
                    src={props.avatar}
                    alt=""/>
                {props.name}
            </NavLink>
        </div>
    )
}