import React from "react";
import {Header} from "./Header";
import connect from "react-redux/es/components/connect";
import {authMeTC, logoutTC} from "../../redux/auth-reducer";
import {RootStateType} from "../../redux/redux-store";


type HeaderContainerType = {
    /*setAuthUserData: () => void*/
    isAuth: boolean
    login: string
    logout:()=>void
}


class HeaderContainer extends React.Component<HeaderContainerType> {
    // componentDidMount() {
    //     this.props.setAuthUserData()
    // }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {/*setAuthUserData: authMeTC,*/ logout:logoutTC})(HeaderContainer)