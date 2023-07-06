// modules needed formik,yup,bootstrap,react-country-region-selector(used if country drop down is include)
import React from 'react'
import { CountryDropdown } from 'react-country-region-selector';
import './css/authentication.css'
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
const Signup = () => {
    // schema used for validation inside formik
    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        confirmPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        userName: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        country: Yup.string()
            .required('Required'),
        state: Yup.string()
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required')
    })
    return (
        <div className="main-container">
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
                    firstName: "",
                    lastName: "",
                    userName: "",
                    country: "",
                    state: ""
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    let body = {
                        email: values.email,
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        userName: values.userName,
                        country: values.country,
                        state: values.state

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
                    setFieldValue,
                }) => (
                    <form className='signup-form row justify-content-center'>
                        <div className="form-title">
                            Sign Up And Explore
                        </div>
                        <div className="input-container col-12 col-md-6">
                            <input type="text" onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName} name='firstName' placeholder='First Name' className="" />
                            <div className='input-error-display' style={{ marginLeft: "40px" }} >{errors.firstName && touched.firstName && errors.firstName}</div>
                        </div>
                        <div className="input-container col-12 col-md-6">
                            <input type="text" onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName} name='lastName' placeholder='last Name' className="" />
                            <div className='input-error-display' style={{ marginLeft: "40px" }} >{errors.lastName && touched.lastName && errors.lastName}</div>

                        </div>
                        <div className="input-container col-12 col-md-6">
                            <input type="text" onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.userName} name='userName' placeholder='user Name' className="" />
                            <div className='input-error-display' style={{ marginLeft: "40px" }} >{errors.userName && touched.userName && errors.userName}</div>

                        </div>
                        <div className="input-container col-12 col-md-6">
                            <input type="email" onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email} name='email' placeholder='Email' className="" />
                            <div className='input-error-display' style={{ marginLeft: "40px" }} >{errors.email && touched.email && errors.email}</div>

                        </div>
                        <div className=" input-container col-12 col-md-6">
                            <CountryDropdown
                                className=" "

                                onChange={(val) => { setFieldValue("country", val) }}
                                onBlur={handleBlur}
                                value={values.country}
                            />
                            <div style={{ marginLeft: "40px" }} className='input-error-display' >{errors.country && touched.country && errors.country}</div>

                        </div>
                        <div className="input-container col-12 col-md-6">
                            <input type="text" onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.state} name='state' placeholder='State' className="" />
                            <div style={{ marginLeft: "40px" }} className='input-error-display' >{errors.country && touched.country && errors.country}</div>
                        </div>
                        <div className="input-container col-12 col-md-6">
                            <input onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password} type="password" name='password' placeholder='password' className="" />
                            <div style={{ marginLeft: "40px" }} className='input-error-display' >{errors.password && touched.password && errors.password}</div>
                        </div>

                        <div className="input-container col-12 col-md-6">
                            <input type="password" onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword} name='confirmPassword' placeholder='Confirm Password' className="" />
                            <span className=''></span>
                            <div style={{ marginLeft: "40px" }} className='input-error-display' >{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</div>
                        </div>


                        <div className="input-button col-6">
                            <button type='submit' onClick={handleSubmit} className="sign-in">

                                Sign Up
                            </button>
                            <button type="button" className="login-with-google-btn" >
                                Sign up with Google

                            </button>
                            <div className='register-container' >

                                Already Have an Account? <a href='/signin'> Login</a>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>

        </div>
    )
}

export default Signup