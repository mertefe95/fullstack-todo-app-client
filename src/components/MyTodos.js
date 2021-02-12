import React, { useContext, useState } from "react"
import Card from "react-bootstrap/Card"
import UserContext from "./context/UserContext"
import { PencilSquare } from "react-bootstrap-icons"
import { XSquare } from "react-bootstrap-icons"
import { XSquareFill } from "react-bootstrap-icons"
import { Check2Square } from "react-bootstrap-icons"
import Alert from "react-bootstrap/Alert"
import { Link } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import Axios from "axios"

function MyTodos({ todos }) {
	const { userData } = useContext(UserContext)

	console.log(userData)

	const [edit, setEdit] = useState(false)
	const [editId, setEditId] = useState();
	const [editTitle, setEditTitle] = useState()
	const [editText, setEditText] = useState()
	const [show, setShow] = useState({
		successText: "",
		errorText: "",
	})

	const onDelete = async (id) => {
		await Axios.delete(`https://fullstack-todo-app-server.herokuapp.com/todos/${id}`)
			.then((response) => {
				setShow({ successText: response.data.msg })
			})
			.catch((err) => {
				setShow({ errorText: err.response.data.msg })
			})
	}

	const editClick = async (id) => {
		await setEdit(!edit)
		await setEditId(id)
	}

	const onEdit = async (id) => {
		let editTodo = {
			title: editTitle,
			text: editText,
		}
		

		await Axios.put(`https://fullstack-todo-app-server.herokuapp.com/todos/${id}`, editTodo)
			.then((response) => {
				setShow({ successText: response.data.msg })
				setEdit(!edit)
			})
			.catch((err) => {
				setShow({ errorText: err.response.data.msg })
			})
	}

	return (
		<div className="all-todos">
			{show.successText ? (
				<div className="all-todos-success">
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
				</div>
			) : (
				<></>
			)}

			{todos
				.filter((todo) => todo.userid == userData.user.id)
				.map((filteredTodo, key) => (
					<div className="todo-div">
						<Card
							bg="primary"
							key={key}
							text="white"
							style={{ width: "18rem", minHeight: "300px" }}
							className="mb-2"
						>
							<Card.Header>{filteredTodo.author}'s Todo List</Card.Header>
							<Card.Body>
								<Card.Title className="todo-title">{filteredTodo.title}</Card.Title>
								<Card.Text>
								{edit && editId == filteredTodo.id ? (
										<Form.Control
											type="text"
											onChange={(e) => setEditTitle(e.target.value)}
											placeholder="Enter the new title"
										/>
									) : null}	
								<p className="todo-text">{filteredTodo.text}</p>
								{edit && editId == filteredTodo.id  ? (
										<Form.Control
											type="text"
											onChange={(e) => setEditText(e.target.value)}
											placeholder="Enter the new text"
										/>
									) : null}
								</Card.Text>
								{ userData.user.id == filteredTodo.userid ?
							<>
							<button
									onClick={() => editClick(filteredTodo.id)}
									style={{ background: "transparent ", border: "none" }}
								>
									<PencilSquare fontSize="30px" color="white" />
								</button>
								

								
								<button
									onClick={() => onDelete(filteredTodo.id)}
									style={{ background: "transparent ", border: "none" }}
								>
									<XSquare fontSize="30px" color="white" />
								</button>
								</>
								:
								<></>
							}

								{edit && editId == filteredTodo.id ? (
									<button
										onClick={() => onEdit(filteredTodo.id)}
										style={{ background: "transparent ", border: "none" }}
									>
										<Check2Square fontSize="30px" color="white" />
									</button>
								) : null}
							

							</Card.Body>
						</Card>
					</div>
				))}
		</div>
	)
}

export default MyTodos;
