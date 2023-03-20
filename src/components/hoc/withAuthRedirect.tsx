import React, {ComponentType} from "react";
import { Navigate } from "react-router-dom";
import {RootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})
export const withAuthRedirect = <T extends {}>(Component: ComponentType<T>) => {

    const RedirectComponent = ({isAuth, ...restProps}: mapStateToPropsType) => {
        if (!isAuth) return <Navigate to={'/login'}/>
        return <Component {...restProps as T}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}

