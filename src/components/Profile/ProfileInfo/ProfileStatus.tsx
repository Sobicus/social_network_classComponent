import React, {ChangeEvent} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, any> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status:this.props.status
            })
        }
    }

    render() {
        console.log('render')
        return (
            <div>
                {
                    !this.state.editMode ?
                        <div><span
                            onDoubleClick={this.activateEditMode}>{this.props.status || "You don`t have status"}</span>
                        </div>
                        :
                        <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                                    value={this.state.status}/></div>
                }
            </div>
        )
    }
}