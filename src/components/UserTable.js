import React from 'react'
import DeleteUser from '../graphql/mutations/DeleteUser'

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <button
                onClick={() => {
                  props.setEditing(true);
                  props.setCurrentUser(user);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <DeleteUser id={user.id} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable