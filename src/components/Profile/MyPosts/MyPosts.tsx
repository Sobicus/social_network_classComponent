import React from "react";
import {postsDataType} from "../../../redux/store";
import style from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {AddPostForm} from "./AddPostForm/AddPostrForm";

type MyPostsType = {
    posts: Array<postsDataType>
    // newPostText: string
    // addPost: (newPost: string) => void
    // updateNewPostText: (text: string) => void
}

export const MyPosts = React.memo((props: MyPostsType) => {
    return (
        <div className={style.posts_block}>
            <h3>
                My posts
            </h3>
            <hr/>
            <AddPostForm/>
            <hr/>
            <div className={style.posts}>
                {props.posts.map(el => <Post
                    id={el.id}
                    message={el.message}
                    likesCounter={el.likesCounter}
                    key={el.id}/>)}
            </div>
        </div>
    )
})