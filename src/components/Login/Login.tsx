import {useFormik} from "formik";
import {loginTC} from "../../redux/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const authMe = useAppSelector(state => state.auth.isAuth)
    if (authMe) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <SignupForm/>
        </div>
    )
}

const SignupForm = () => {
    const dispatch = useAppDispatch()
    const errorMessage = useAppSelector(state => state.auth.errorMessage)
    const captchaPicture = useAppSelector(state => state.auth.captchaUrl)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha:''
        },
        validate(values) {
            const errors: loginErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 4) {
                errors.password = 'Must be 4 characters or more';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password, values.rememberMe, values.captcha))
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ?
                <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ?
                <div style={{color: 'red'}}>{formik.errors.password}</div>
                : null
            }
            {errorMessage.length > 0 ? <div style={{color: 'red', background: "orange"}}>{errorMessage}</div> : ''}
            <input
                type="checkbox"
                id="rememberMe"
                name='rememberMe'
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
            />
            <button type="submit">Submit</button>
            {captchaPicture && <img src={captchaPicture}/>}
            {captchaPicture && <input
                id="captcha"
                name="captcha"
                type="captcha"
                placeholder="captcha"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.captcha}

            />}
        </form>
    );
};

type loginErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
