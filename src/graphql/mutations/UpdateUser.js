import React,{ Fragment } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import EditUserForm from '../../components/EditUserForm';

const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $input: UpdateUserInput!){
    updateUser(id: $id, input: $input){
        id
        username
        email
    }
}
`;

function UpdateUser(props) {
    const [updateUser, { data }] = useMutation(UPDATE_USER);

    return (
        <Fragment>
            <EditUserForm
                setEditing={props.setEditing}
                currentUser={props.currentUser}
                updateUser={(id, user) => updateUser({ 
                    variables: { id, input: user },
                    optimisticResponse: {
                        __typename: "Mutation",
                        updateUser: {
                            id: id,
                            __typename: "User",
                            username: user.username,
                            email: user.email
                        }
                    }
                })}
            />
        </Fragment>
    )
}

export default UpdateUser;