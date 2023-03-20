import React from "react";
import {usersStateType} from "../../redux/store";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

type usersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<usersStateType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>

}
export const Users: React.FC<usersType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    // let pages = []
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i)
    // }

    return (
        <div>
            {/*<div>*/}
            {/*    {pages.map(el => {*/}
            {/*            return <span className={props.currentPage === el ? style.selectedPage : ''} onClick={() => {*/}
            {/*                props.onPageChanged(el)*/}
            {/*            }}>*/}
            {/*                {el}*/}
            {/*            </span>*/}
            {/*        }*/}
            {/*    )}*/}
            {/*</div>*/}
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged} portionSize={10}/>
            {props.users.map(u => <User user={u}
                                        follow={props.follow}
                                        unfollow={props.unfollow}
                                        followingInProgress={props.followingInProgress}
                                        key={u.id}
                />
                /*<div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="Avatar"
                             className={style.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            !u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>*/
            )}

        </div>
    )
}
