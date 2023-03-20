import React from "react";
import style from './Post.module.css'

type postPropsType = {
    id:number
    message: string
    likesCounter: number
}

export const Post: React.FC<postPropsType> = (props) => {
    return (
        <div className={style.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nvlmwygLKlmp7aC6rEIPSgNEcTLbi1TV5P1gVU-LSwImRRp9CzMZywB1PPC9JjeFWNU&usqp=CAU"
                alt=""/>
            {props.message}
            <div>
                <span>like {props.likesCounter}</span>
            </div>
        </div>
    )
}