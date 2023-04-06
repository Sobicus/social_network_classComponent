import React, {Suspense, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from './components/Login/Login';
import {DialogsContainer as Foo} from './components/Dialogs/DialogsContainer';
import {RootStateType, useAppDispatch} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/Preloader";
import {initializedAppTC} from './redux/app-reducer';
import Dialogs from './components/Dialogs/Dialogs';


const DialogsContainer = React.lazy(() => Promise.resolve(
    {default: Foo}
))

//const DialogsContainer = React.lazy(() => import( './components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import( './components/Profile/ProfileContainer'))

export const App = () => {

    const dispatch = useAppDispatch()
    const initialized = useSelector<RootStateType>(state => state.app.initialized)

    useEffect(() => {
        const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
            console.log('promiseRejectionEvent' + ' ' + e)
            alert('Some error occured')
            console.error(e)
        }

        dispatch(initializedAppTC())
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
        }
    }, [])


    if (!initialized) {
        return <Preloader/>
    }

    return (
        <>
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
                                   element={<Dialogs/>}/>
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
        </>
    );
}

