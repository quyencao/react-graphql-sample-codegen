import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { id: null, email: '', username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.email || !user.username) return

				// props.addUser({ username: user.username, email: user.email })
				props.addUser(user.username, user.email)
				setUser(initialFormState)
			}}
		>
			<label>Username</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
			<label>Email</label>
			<input type="text" name="email" value={user.email} onChange={handleInputChange} />
			<button>Add new user</button>
		</form>
	)
}

export default AddUserForm
