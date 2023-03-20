import React from "react";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../../redux/store";
import {Dispatch} from "redux";

const mapStateToProps = (state: stateType) => {
    return {
        posts: state.profilePage.postsData,
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // addPost: (newPost:string) => {
        //     dispatch(addPostAC(newPost))
        // },
        /*updateNewPostText: (text: string) => {
            let action = updateNewPostTextAC(text)
            dispatch(action)
        }*/
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)