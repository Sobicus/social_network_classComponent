import {useFormik} from "formik";
import {useAppDispatch} from "../../../../redux/redux-store";
import {addPostAC} from "../../../../redux/profile-reducer";

export const AddPostForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            post: '',
        },
        validate(values) {
            const errors: loginErrorType = {};
            if (!values.post) {
                errors.post = 'Please enter the text of the post';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(addPostAC(values.post))
            values.post=''
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                id="post"
                type="text"
                {...formik.getFieldProps('post')}
            />
            {formik.touched.post && formik.errors.post ?
                <div style={{color: 'red'}}>{formik.errors.post}</div>
                : null
            }
            <br/>
            <button type="submit">Add Post</button>
        </form>
    )
}
type loginErrorType = {
    post?: string
}