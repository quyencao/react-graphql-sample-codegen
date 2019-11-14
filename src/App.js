import React, { Fragment, useState } from 'react';
import GetUsers from './graphql/queries/GetUsers';
import CreateUser from './graphql/mutations/CreateUser';
import './App.css';
import UpdateUser from './graphql/mutations/UpdateUser';

function App() {
  const initialFormState = { id: null, username: '', email: '' }
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  return (
    <div className="container">
        <h1>Graphql Apollo Sample</h1>
      	<div className="flex-row">
				    <div className="flex-large">
              {editing ? (
                <Fragment>
                  <h2>Edit user</h2>
                  <UpdateUser currentUser={currentUser} setEditing={setEditing}/>
                </Fragment>
              ) : (
                <Fragment>
                  <h2>Add user</h2>
                  <CreateUser />
                </Fragment>
              )
              }
            </div>
            <div className="flex-large">
                <h2>View users</h2>
                <GetUsers setEditing={setEditing} setCurrentUser={setCurrentUser}/>
            </div>
        </div>
    </div>
  );
}

export default App;
