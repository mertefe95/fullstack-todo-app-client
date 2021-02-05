import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import UserContext from './context/UserContext'

function AllTodos({ todos }) {
	const { userData } = useContext(UserContext)

	const sortedArray = todos.sort((a, b) => (a.userId > b.userId ? 1 : -1))
	return (
		<div className='all-todos'>
			{sortedArray.map((todo, key) => (
				<div className='todo-div' key={todo.userId}>
					<Card
						bg={userData.user.id == todo.userid ? 'primary' : 'success'}
						key={key}
						text='white'
						style={{ width: '18rem' }}
						className='mb-2'
					>
						<Card.Header>{todo.author}'s Todo List</Card.Header>
						<Card.Body>
							<Card.Title>Card Title </Card.Title>
							<Card.Text>
								<p>{todo.title}</p>
								<p>{todo.text}</p>
								<p>{todo.author}</p>
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			))}
		</div>
	)
}

export default AllTodos
