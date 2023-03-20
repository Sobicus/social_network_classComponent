import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusWithHooksType = {
    status: string
    updateStatus: (status: string) => void
}
export const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(()=>setStatus(props.status), [props.status])
    const activateEditMode = () => {
        setEditMode(true)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status:</b><span onDoubleClick={activateEditMode}> {props.status || "You don`t have status"} </span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onChange={onStatusChange} onBlur={deactivateEditMode} value={status}
                           type="text"/>
                </div>
            }
        </div>
    )
}