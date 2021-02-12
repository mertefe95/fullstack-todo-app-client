import React, { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { Form, Formik, Field, ErrorMessage } from "formik"
import Axios from "axios"
import Alert from "react-bootstrap/Alert"
import * as Yup from "yup"
import TextField from "@material-ui/core/TextField"
import { Link } from "react-router-dom"
import UserContext from "./context/UserContext"

function AddTodo() {
	const { userData, setUserData } = useContext(UserContext)

	const [show, setShow] = useState({
		successText: "",
		errorText: "",
	})

	const initialValues = {
		title: "",
		text: "",
	}

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Required"),
		text: Yup.string().required("Required"),
	})

	return (
		<div className="register-div">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					values.userId = userData.user.id
					values.author = userData.user.username
					await Axios.post(
						"https://fullstack-todo-app-server.herokuapp.com/todos/add",
						values
					)
						.then((response) => {
							setShow({ successText: response.data.msg })
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
											Go to Home Page
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

						<div className="title">
							<label className="label title-label" htmlFor="username">
								Title
							</label>
							<Field
								as={TextField}
								className="field title-field"
								id="title"
								name="title"
								type="type"
								placeholder="Enter title"
							/>
							<p className="text-muted">
								Provide us a todo title that you would like to have.
							</p>
							<ErrorMessage className="errormessage" name="title">
								{(msg) => (
									<Alert className="alertmessage" variant="danger">
										{msg}
									</Alert>
								)}
							</ErrorMessage>
						</div>

						<div className="text-div">
							<label className="label text-label" htmlFor="text">
								Text
							</label>
							<Field
								as={TextField}
								className="field text-field"
								type="text"
								id="text"
								name="text"
								placeholder="Enter text"
							/>
							<p className="text-muted">Write your todo text here.</p>
							<ErrorMessage className="errormessage" name="text">
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

export default AddTodo
