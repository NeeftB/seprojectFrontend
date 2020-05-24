import React from 'react'
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import { withRouter } from 'react-router'

import './login.css'

const RegisterSchema = Yup.object({
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required')
})

function setData(res) {
    localStorage.setItem("user", JSON.stringify(res.data))
    
}

function Login(props) {

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
                axios.post('http://localhost:8080/seproject/services/rest/authentication',
                    {
                        username: values.username, password: values.password
                    })
                    .then(res => {
                        if (res && res.status === 200) {
                            setData(res)
                            console.log(res.headers['Authorization'])
                            props.setIsLoggedIn(true)
                            props.history.push('/')
                        }
                    })
                    .catch(err => {
                        console.log(err.response.data.message)
                        if (err.response) {
                            actions.setFieldError('username', err.response.data.message)
                        } else {
                            actions.setFieldError('username', "Something went wrong")
                        }

                    });
                actions.setSubmitting(false)
            }}>
            {({ isSubmitting }) => (

                <div className="login-container">
                    <h1>Hello there, <span>Welcome back.</span></h1>
                    <Form className="login-form">
                        <div className="form-item">
                            <label>Username</label>
                            <Field id="username" name="username" type="text" autoComplete="username" placeholder="" />
                            <ErrorMessage className="form-item-error" name="username" component="div" />
                        </div>
                        <div className="form-item">
                            <label>Password</label>
                            <Field id="password" name="password" type="password" autoComplete="current-password" placeholder="" />
                            <ErrorMessage className="form-item-error" name="password" component="div" />
                        </div>
                        <a href="/">Forgot your password?</a> {/*Create a Link of this */}
                        <button type="submit" className="form-btn" disabled={isSubmitting}>Sign In</button>
                    </Form>

                    <Link to="/register">New here? <span>Sign Up now!</span></Link> {/*Create a Link of this */}


                </div>
            )}
        </Formik>
    )
}

export default withRouter(Login)