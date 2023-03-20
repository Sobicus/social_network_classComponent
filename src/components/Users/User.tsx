import style from "./Users.module.css";
import userPhoto from "../../assets/img/users_avatar.png";
import React from "react";
import {usersStateType} from "../../redux/store";
import {NavLink} from "react-router-dom";

type usersType = {
    user: usersStateType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingInProgress: Array<number>
}
export const User: React.FC<usersType> = ({user, follow, unfollow, followingInProgress, ...props}) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="Avatar"
                             className={style.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            !user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id)
                                }}>Follow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>
                        }
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
        </div>)
}
