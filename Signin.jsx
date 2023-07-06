import { useState } from 'react'
import './css/authentication.css'
import { Formik } from 'formik';
import * as Yup from 'yup';

const Signin = () => {
    const [password, setpassword] = useState("")
    const SigninSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required')
            // used to check if user exists from database
            .test('Unique Email', "Incorrect User Name or Password", // <- key, message
                function (value) {
                    let body = {
                        email: value,
                        password: password
                    }
                    body = JSON.stringify(body)
                    console.log(body)
                    return new Promise((resolve) => {
                        fetch('url used to check if user exists', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: body
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                // response of url request 
                                // resolve() used to show the validation status
                                if (data.message == "User Not found.") {
                                    resolve(false);
                                } else if (data.message == "Invalid Password!") {
                                    resolve(false);
                                } else {
                                    resolve(true)
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    })
                })
    })
    return (
        <div className='main-container-parent'>
            <div className=" main-container main-container-signin">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validateOnChange={false}
                    validateOnBlur={false}

                    validationSchema={SigninSchema}
                    onSubmit={async (values, { setSubmitting }, formik) => {
                        let body = {
                            email: values.email,
                            password: values.password
                        }
                        body = JSON.stringify(body)
                        // data has been successfully validated and changed into a json object

                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit} className='signup-form'>
                            <div className="form-title">
                                Sign In And Explore
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}>

                                <div className="input-container">
                                    <input
                                        style={{ marginLeft: 0 }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email} type="email" name='email' placeholder='Email' className="" />
                                    <span className="">
                                    </span>
                                </div>
                                <div className='input-error-display' >{errors.email && touched.email && errors.email}</div>

                                <div className="input-container">
                                    <input
                                        style={{ marginLeft: 0 }}
                                        type="password"
                                        name="password"
                                        onChange={(event) => { setpassword(event.target.value), handleChange(event) }}
                                        onBlur={handleBlur}
                                        value={values.password} placeholder='password' className="" />
                                    <span className=''>
                                    </span>
                                </div>
                                <div className='input-error-display' >{errors.password && touched.password && errors.password}</div>
                                <div className="input-button">
                                    <button onClick={(event) => { handleSubmit(event) }} type='submit' className="sign-in">
                                        Sign In
                                    </button>
                                    <button type="button" className="login-with-google-btn" >
                                        Sign In with Google
                                    </button>
                                    <div className='register-container' >
                                        Not Registered Yet? <a href='/signup' className='register'> Register</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div >
    )
}
export default Signin