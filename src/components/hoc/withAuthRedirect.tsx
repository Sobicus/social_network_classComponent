import React, {ComponentType} from "react";
import { Navigate } from "react-router-dom";
import {RootStateType, useAppSelector} from "../../redux/redux-store";
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



export const withAuthRedirect1 = <T extends {}>(Component: ComponentType<T>) => {
    const RedirectComponent = ({ ...restProps }: T) => {
        const isAuth = useAppSelector((state) => state.auth.isAuth);

        if (!isAuth) {
            return <Navigate to={'/login'} />;
        }
        return <Component {...restProps} />;
    };

    return RedirectComponent;
};

type MapStateToPropsType = {
    isAuth: boolean;
};
//----------
/*
const withAuthRedirect = <P extends object>(Component: ComponentType<P>) => {
    const WithAuthRedirectComponent = (props: P & MapStateToPropsType) => {
        const isAuth = useSelector<RootState, boolean>((state) => state.auth.isAuth);

        if (!isAuth) {
            return <Redirect to={'/login'} />;
        }

        return <Component {...props} />;
    };

    return WithAuthRedirectComponent;
};

export default withAuthRedirect;
*/
