import {Field, useFormik} from "formik";
import React from "react";
import {ProfileType} from "../../../redux/store";
import {setProfileType} from "../../../api/api";
import {useAppDispatch, useAppSelector} from "../../../redux/redux-store";
import {useDispatch} from "react-redux";

type ProfileDataFormType = {
    profile: ProfileType
    saveProfile: (profile: setProfileType, setEditMode: (editMode: boolean) => void) => void
    setEditMode: (editMode: boolean) => void
}
export const ProfileDataForm: React.FC<ProfileDataFormType> = ({profile, saveProfile, setEditMode}) => {
    const errorMessage = useAppSelector(state => state.profilePage.errorMessage)

    const onSubmitFormik=(saveProfile: (profile: setProfileType, setEditMode: (editMode: boolean) => void) => void,
                          newProfile:TestType,
                          setEditMode: (editMode: boolean) => void)=>{
        saveProfile(newProfile, setEditMode)
    }

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            /*contacts: {...profile.contacts}*/
            facebook: profile.contacts.facebook,
            website: profile.contacts.website,
            vk: profile.contacts.vk,
            twitter: profile.contacts.twitter,
            instagram: profile.contacts.instagram,
            youtube: profile.contacts.youtube,
            github: profile.contacts.github,
            mainLink: profile.contacts.mainLink,
        },
        onSubmit: values => {
            const newProfile = {
                fullName: values.fullName,
                lookingForAJob: values.lookingForAJob,
                lookingForAJobDescription: values.lookingForAJobDescription,
                aboutMe: values.aboutMe,
                contacts: {
                    facebook: values.facebook,
                    website: values.website,
                    vk: values.vk,
                    twitter: values.twitter,
                    instagram: values.instagram,
                    youtube: values.youtube,
                    github: values.github,
                    mainLink: values.mainLink
                }
            }
            /*saveProfile(newProfile, setEditMode)*/
            /*setEditMode(false)*/
            //need realise waite
            onSubmitFormik(saveProfile, newProfile, setEditMode)
            alert(JSON.stringify(values));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            {errorMessage.length > 0 ? <div style={{color: 'red', background: "orange"}}>{errorMessage}</div> : ''}
            <label htmlFor="fullName">Full Name: </label>
            <input
                id="fullName"
                type="text"
                placeholder={'Full Name'}
                {...formik.getFieldProps('fullName')}
            />
            <label htmlFor="lookingForAJob">Looking for a job: </label>
            <input
                id="lookingForAJob"
                name="lookingForAJob"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.lookingForAJob}
            />
            <label htmlFor="lookingForAJobDescription">My professional skills: </label>
            <input
                placeholder={'Professional skills'}
                id="lookingForAJobDescription"
                type="text"
                {...formik.getFieldProps('lookingForAJobDescription')}
            />
            <label htmlFor="aboutMe">About me: </label>
            <input
                id="aboutMe"
                type="text"
                placeholder={'About me'}
                {...formik.getFieldProps('aboutMe')}
            />
            <label htmlFor="facebook">Facebook: </label>
            <input
                /* id="facebook"
                 name="facebook"
                 type="facebook"
                 onChange={formik.handleChange}
                 // value={formik.values.contacts.facebook}
                 value={profile.contacts.facebook}*/
                id="facebook"
                type="text"
                placeholder={"facebook"}
                {...formik.getFieldProps('facebook')}
            />
            <label htmlFor="vk">VK: </label>
            <input
                id="vk"
                type="vk"
                placeholder={"vk"}
                // value={formik.values.contacts.vk}
                {...formik.getFieldProps('vk')}
            />
            <label htmlFor="github">Github: </label>
            <input
                id="github"
                type="github"
                placeholder={"github"}
                // value={formik.values.contacts.github}
                {...formik.getFieldProps('github')}
            />
            <label htmlFor="twitter">Twitter: </label>
            <input
                id="twitter"
                type="twitter"
                placeholder={"twitter"}
                // value={formik.values.contacts.twitter}
                {...formik.getFieldProps('twitter')}
            />
            <label htmlFor="instagram">Instagram: </label>
            <input
                id="instagram"
                type="instagram"
                placeholder={"instagram"}
                // value={formik.values.contacts.instagram}
                {...formik.getFieldProps('instagram')}
            />
            <label htmlFor="mainLink">MainLink: </label>
            <input
                id="mainLink"
                type="mainLink"
                placeholder={"mainLink"}
                // value={formik.values.contacts.mainLink}
                {...formik.getFieldProps('mainLink')}
            />
            <label htmlFor="website">Website: </label>
            <input
                id="website"
                type="website"
                placeholder={"website"}
                // value={formik.values.contacts.website}
                {...formik.getFieldProps('website')}
            />
            <label htmlFor="youtube">Youtube: </label>
            <input
                id="youtube"
                type="youtube"
                placeholder={"youtube"}
                // value={formik.values.contacts.youtube}
                {...formik.getFieldProps('youtube')}
            />
            <button type="submit">Save</button>
        </form>
    )
}

type TestType={
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
}}