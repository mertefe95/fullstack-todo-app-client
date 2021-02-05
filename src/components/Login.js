import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import { Form, Formik, Field, ErrorMessage } from "formik"
import Axios from "axios"
import Alert from "react-bootstrap/Alert"
import * as Yup from "yup"
import TextField from "@material-ui/core/TextField"
import { Link } from "react-router-dom"
import UserContext from "./context/UserContext"

function Login() {
	const [show, setShow] = useState({
		successText: "",
		errorText: "",
	})

	const { userData, setUserData } = useContext(UserContext)
	const history = useHistory()

	const initialValues = {
		email: "",
		password: "",
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string().required("Required"),
	})

	return (
		<div className="login-div">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					await Axios.post(
						"https://fullstack-todo-app-server.herokuapp.com/users/login",
						values
					)
						.then((response) => {
							setUserData({
								token: response.data.token,
								user: response.data.user,
							})

							localStorage.setItem("auth-token", response.data.token)
							history.push("/")
						})
						.catch((err) => {
							setShow({ errorText: err.response.data.msg })
						})
				}}
			>
				{({ values, isSubmitting }) => (
					<Form className="register-form">
						{show.errorText ? (
							<Alert
								variant="danger"
								onClose={() => setShow({ errorText: "" })}
								dismissible
							>
								<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
								<p>{show.errorText}</p>
							</Alert>
						) : (
							<></>
						)}

						{show.successText ? (
							<Alert className="successmessage" show={show} variant="success">
								<Alert.Heading className="sucessheader">Success!</Alert.Heading>
								<p className="successtext">{show.successText}</p>
								<hr />
								<div
									style={{ flexDirection: "row" }}
									className="success-text-div d-flex  justify-content-end"
								>
									<Link className="success-text-login" to="/login">
										<Button
											onClick={() => setShow({ successText: "" })}
											variant="outline-success"
										>
											Go to Login Page
										</Button>
									</Link>
									<Button
										onClick={() => setShow({ successText: "" })}
										variant="outline-success"
									>
										Close
									</Button>
								</div>
							</Alert>
						) : (
							<></>
						)}
						<div className="email-div">
							<label className="label email-label" htmlFor="email">
								Email address
							</label>
							<Field
								as={TextField}
								className="field email-field"
								type="email"
								id="email"
								name="email"
								placeholder="Enter email"
							/>

							<ErrorMessage className="errormessage" name="email">
								{(msg) => (
									<Alert className="alertmessage" variant="danger">
										{msg}
									</Alert>
								)}
							</ErrorMessage>
						</div>

						<div className="password-div">
							<label className="label password-label">Password</label>
							<Field
								as={TextField}
								className="field password-field"
								type="password"
								id="password"
								name="password"
								placeholder="Password"
							/>
							<ErrorMessage className="errormessage" name="password">
								{(msg) => (
									<Alert className="alertmessage" variant="danger">
										{msg}
									</Alert>
								)}
							</ErrorMessage>
						</div>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Login
