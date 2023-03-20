import React from "react";
import style from './Navbar.module.css'
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    const isActiveStyle = (isActive: boolean) => isActive ? style.active : undefined

    return (
        <nav className={style.nav}>
            <div className={`${style.item} ${style.active}`}>
                <NavLink to='/profile' className={({isActive}) =>
                    isActive ? style.active : undefined
                }>Profile</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/dialogs' className={({isActive}) =>
                    isActive ? style.active : undefined
                }>Messages</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/users' className={({isActive}) =>
                    isActive ? style.active : undefined
                }>Users</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/news' className={({isActive}) =>
                    isActive ? style.active : undefined
                }>News</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/music' className={({isActive}) =>
                    isActive ? style.active : undefined
                }>Music</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/settings' className={({isActive}) =>
                    isActive ? style.active : undefined
                }>Settings</NavLink>
            </div>
        </nav>
    )
}