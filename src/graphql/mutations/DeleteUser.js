import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GET_USERS } from '../queries/GetUsers';

const DELETE_USER = gql`
    mutation deleteUser($id: ID!){
    deleteUser(id: $id)
}
`;

function DeleteUser(props) {
    const [deleteUser, { data }] = useMutation(DELETE_USER);

    return (
        <Fragment>
            <button
                onClick={() => deleteUser({ 
                    variables: { id: props.id },
                    optimisticResponse: {
                        __typename: "Mutation",
                        deleteUser: {
                          __typename: "User",
                          id: props.id
                        }
                    },
                    update: (proxy) => {
                        const data = proxy.readQuery({ query: GET_USERS });
                        proxy.writeQuery({ query: GET_USERS, data: {
                          ...data,
                          getUsers: data.getUsers.filter(user => user.id !== props.id)
                        }});
                    }
                })}
                className="button muted-button"
            > 
                Delete
            </button>
        </Fragment>
    )
}

export default DeleteUser;