import React, {Suspense, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
// import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from './components/Login/Login';
import {DialogsContainer as Foo} from './components/Dialogs/DialogsContainer';
// import {initializedAppTC} from "./redux/app-reducer";
import {RootStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/Preloader";
import {initializedAppTC} from './redux/app-reducer';


//const DialogsContainer = React.lazy(() => import( './components/Dialogs/DialogsContainer'))
const DialogsContainer = React.lazy(() => Promise.resolve(
    {default: Foo}
))
const ProfileContainer = React.lazy(() => import( './components/Profile/ProfileContainer'))

export const App = () => {

    const initialized = useSelector<RootStateType>(state => state.app.initialized)

    useEffect(() => {
        const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
            console.log('promiseRejectionEvent' + ' ' + e)
            alert('Some error occured')
            console.error(e)
        }

        initializedAppTC()
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
        }
    }, [])


    // if (!initialized) {
    //     return <Preloader/>
    // }

    return (
        <>
            {!initialized?<Preloader/>:
            <div className='app_wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app_wrapper_content'>
                    <Suspense>
                        <Routes>
                            <Route path='/' element={<ProfileContainer/>}/>
                            <Route path='/profile/' element={<ProfileContainer/>}/>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/'
                                   element={<DialogsContainer/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/login' element={<Login/>}/>

                            <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                            <Route path='*' element={<Navigate to={'/404'}/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
            }
        </>
    );
}


/*
type AppType = {
initializedApp: () => void
initialized: boolean
}

class App extends React.Component<AppType> {
catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.log('promiseRejectionEvent' + ' ' + e)
    alert('Some error occured')
    console.error(e)
}

componentDidMount() {
this.props.initializedApp()
//catch all unhandked rejection
window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
}
componentWillUnmount() {
//remove eventListener
window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
}

render() {
if (!this.props.initialized) {
return <Preloader/>
}

return (
<div className='app_wrapper'>
<HeaderContainer/>
<Navbar/>
<div className='app_wrapper_content'>
<Suspense>
<Routes>
<Route path='/' element={<ProfileContainer/>}/>
<Route path='/profile/' element={<ProfileContainer/>}/>
<Route path='/profile/:userId' element={<ProfileContainer/>}/>
<Route path='/dialogs/'
element={<DialogsContainer/>}/>
<Route path='/users' element={<UsersContainer/>}/>
<Route path='/news' element={<News/>}/>
<Route path='/music' element={<Music/>}/>
<Route path='/settings' element={<Settings/>}/>
<Route path='/login' element={<Login/>}/>

<Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
<Route path='*' element={<Navigate to={'/404'}/>}/>
</Routes>
</Suspense>
</div>
</div>
);
}
}

const mapStateToProps = (state: RootStateType) => {
    return {
    initialized: state.app.initialized
}
}
export default compose<FC>(connect(mapStateToProps, {initializedApp: initializedAppTC}))(App)

    */
//------------------------------------------------------


// const App: React.FC<AppType> = (props) => {
//
//     return (
//         <div className='app_wrapper'>
//             <HeaderContainer/>
//             <Navbar/>
//             <div className='app_wrapper_content'>
//                 <Routes>
//                     <Route path='*' element={<ProfileContainer/>}/>
//                     <Route path='/profile/' element={<ProfileContainer/>}/>
//                     <Route path='/profile/:userId' element={<ProfileContainer/>}/>
//                     <Route
//                         path='/dialogs/'
//                         element={<DialogsContainer/>}
//                     />
//                     <Route path='/users' element={<UsersContainer/>}/>
//                     <Route path='/news' element={<News/>}/>
//                     <Route path='/music' element={<Music/>}/>
//                     <Route path='/settings' element={<Settings/>}/>
//                     <Route path='/login' element={<Login/>}/>
//                 </Routes>
//             </div>
//         </div>
//     );
// }


// function Dispatch(arg0: (dispatch: import("redux").Dispatch<import("redux").AnyAction>) => void) {
//     throw new Error('Function not implemented.');
// }

