import React from 'react';
import gql from 'graphql-tag';
import uuid from "uuid/v4";
import { useMutation } from '@apollo/react-hooks';
import AddUserForm from '../../components/AddUserForm';
import { GET_USERS } from '../queries/GetUsers';

const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput!){
    createUser(input: $input){
        id
        username
        email
    }
}
`;

function CreateUser() {
    const [createUser, { data }] = useMutation(CREATE_USER);

    return (
        <React.Fragment>
            <AddUserForm addUser={(username, email) => createUser({ 
                variables: { input: { username, email } },
                optimisticResponse: {
                    __typename: "Mutation",
                    createUser: {
                      __typename: "User",
                        username: username,
                        email: email,
                        id: uuid()
                    }
                },
                update: (proxy, { data: { createUser: user } }) => {
                    const data = proxy.readQuery({ query: GET_USERS });
                    proxy.writeQuery({ query: GET_USERS, data: {
                      ...data,
                      getUsers: [...data.getUsers, user]
                    }});
                } 
            })}/>
        </React.Fragment>
    )
}

export default CreateUser;