import React from 'react'
import { Link } from "react-router-dom";
import { Countries, Genders, Days, Months, Years } from '../globals'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import { withRouter } from 'react-router'

import './register.css'
import { useState } from 'react';

const RegisterSchema = Yup.object({
    username: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
    email: Yup.string()
        .required('Required'),
    firstName: Yup.string()
        .required('Required'),
    lastName: Yup.string()
        .required('Required'),
    resident: Yup.string()
        .matches(/^((?!-- select your resident --).)*$/, "Please select a resident")
        .required('Required'),
    day: Yup.string()
        .required('Required'),
    gender: Yup.string()
        .matches(/^((?!-- select your gender --).)*$/, "Please select a gender")
});

function Register(props) {
    const [isRegistered, setIsRegistered] = useState(false)

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                email: '',
                firstName: '',
                middleName: '',
                lastName: '',
                resident: '',
                day: '1',
                month: '0',
                year: '1990',
                gender: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
                axios.post('http://localhost:8080/seproject/services/rest/users',
                    {
                        username: values.username, password: values.password, email: values.email, firstname: values.firstName, middlename: values.middleName,
                        lastname: values.lastName, age: values.day, gender: values.gender
                    })
                    .then(res => {
                        if (res.status === 201) {
                            axios.post(`http://localhost:8080/seproject/services/rest/users/${values.username}/countries/${values.resident.toLowerCase()}`)
                                .then(res => {
                                    console.log(res.statusText)
                                    actions.resetForm()
                                    setIsRegistered(true)
                                    setTimeout(() => {
                                        props.history.push('/login')
                                    },
                                        3000
                                    );
                                })
                                .catch(error => {
                                    console.log(error.message)
                                })
                        }
                    })
                    .catch(error => {
                        actions.setFieldError('username', error.response.data.message)
                    });
                actions.setSubmitting(false)
            }}>
            {({ isSubmitting }) => (
                <div className="register-container">
                    {isRegistered ?
                        <div className="registered-screen">
                            <h1>Welcome on Board!</h1>
                            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div>
                                <div></div><div></div><div></div><div></div><div></div><div></div></div>
                            <p className="wait-text">Please wait...</p>
                        </div>
                        :
                        <div className="register-form-container">
                            <h1>Get on Board</h1>
                            <Form className="register-form">
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
                                <div className="form-item">
                                    <label>Email</label>
                                    <Field id="email" name="email" type="text" autoComplete="email" placeholder="" />
                                    <ErrorMessage className="form-item-error" name="email" component="div" />
                                </div>
                                <div className="form-item">
                                    <label>First Name</label>
                                    <Field id="firstName" name="firstName" type="text" autoComplete="firstName" placeholder="" />
                                    <ErrorMessage className="form-item-error" name="firstName" component="div" />
                                </div>
                                <div className="form-item">
                                    <label>Middle Name</label>
                                    <Field id="middleName" name="middleName" type="text" autoComplete="middleName" placeholder="" />
                                    <ErrorMessage className="form-item-error" name="middleName" component="div" />
                                </div>
                                <div className="form-item">
                                    <label>Last Name</label>
                                    <Field id="lastName" name="lastName" type="text" autoComplete="lastName" placeholder="" />
                                    <ErrorMessage className="form-item-error" name="lastName" component="div" />
                                </div>
                                <div className="form-item">
                                    <label>Current Resident</label>
                                    <Field id="resident" as="select" name="resident" type="text">
                                        <option>-- select your resident --</option>
                                        {Countries.map((country, index) => (
                                            <option key={index} value={country.countryName}>{country.countryName}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage className="form-item-error" name="resident" component="div" />

                                </div>
                                <div className="form-item">
                                    <label>Birthdate</label>
                                    <Field id="day" as="select" name="day" type="text">
                                        {Days.map((day, index) => (
                                            <option key={index} value={day}>{day}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage className="form-item-error" name="day" component="div" />
                                    <Field id="month" as="select" name="month" type="text">
                                        {Months.map((month, index) => (
                                            <option key={index} value={index}>{month.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage className="form-item-error" name="month" component="div" />
                                    <Field id="year" as="select" name="year" type="text">
                                        {Years.map((year, index) => (
                                            <option key={index} value={year}>{year}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage className="form-item-error" name="year" component="div" />
                                </div>
                                <div className="form-item">
                                    <label>Gender</label>
                                    <Field id="gender" as="select" name="gender" type="text">
                                        <option>-- select your gender --</option>
                                        {Genders.map((gender, index) => (
                                            <option key={index} value={gender.type}>{gender.type}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage className="form-item-error" name="gender" component="div" />
                                </div>
                                <button type="submit" className="form-btn" disabled={isSubmitting}>Sign Up</button>
                            </Form>

                            <Link to="/login">Already an account? <span>Sign In here!</span></Link>
                        </div>
                    }
                </div>
            )}
        </Formik>
    )
}

export default withRouter(Register)