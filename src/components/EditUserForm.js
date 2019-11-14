import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        if (!user.email || !user.username) return

        props.updateUser(user.id, { username: user.username, email: user.email })
        props.setEditing(false)
      }}
    >
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <label>Email</label>
      <input type="text" name="email" value={user.email} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm
