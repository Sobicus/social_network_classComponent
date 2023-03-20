import React, {ChangeEvent, useState} from "react";
import style from './ProfileInfo.module.css'
import {profileContactsType, ProfileType} from "../../../redux/store";
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/users_avatar.png"
import { ProfileDataForm } from "./ProfileDataForm";
import {setProfileType} from "../../../api/api";

type profileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile:(profile:setProfileType, setEditMode: (editMode: boolean) => void)=>void

}
export const ProfileInfo: React.FC<profileInfoType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div>
                <img
                    src="https://steamuserimages-a.akamaihd.net/ugc/817811439325303605/ACB13C573377D3D2E4F32FE6ED61B3D082AA5ADC/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                    alt=""/>
            </div>
            <div className={style.description_block} style={{margin: 10}}>
                1. Large avatar
                <img src={props.profile.photos.large || userPhoto} alt="Large avatar" className={style.mainePhoto}/>
                <br/>
                2. Small avatar
                <img src={props.profile.photos.small} alt="Small avatar" className={style.smallPhoto}/>
                <br/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {/*<ProfileStatus status={props.status} updateStatus={props.updateStatus}/>*/}
                <br/>
                3. Profile status
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <br/>
                {editMode ? <ProfileDataForm profile={props.profile} saveProfile={props.saveProfile} setEditMode={setEditMode}/> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={()=>{setEditMode(true)}}/>}
            </div>
        </div>
    )
}
const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner,goToEditMode}) => {
    return (
        <div>
            <div>
                {isOwner && <button onClick={goToEditMode}>Edit</button>}
            </div>
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map((key) => {
                return <Contact key={key} contactTitle={key}
                                contactValue={profile.contacts[key as keyof profileContactsType]}/>
            })}
            </div>
        </div>
    )
}


const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return (
        <div className={style.contacts}>
            <b> {contactTitle}</b> :{contactValue}
        </div>
    )
}
type ContactType = {
    contactTitle: string
    contactValue: string
}
export type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode:()=>void
}