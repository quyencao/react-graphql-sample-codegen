import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import UserTable from '../../components/UserTable';

export const GET_USERS = gql`
    query getUsers{
    getUsers{
        id
        username
        email
    }
}
`;

function GetUsers(props) {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error) {
        return (
            <div>
                { `Error! ${error.message}` }
            </div>
        )
    }

    return (
        <Fragment>
            <UserTable users={data.getUsers} setEditing={props.setEditing} setCurrentUser={props.setCurrentUser}/>
        </Fragment>
    )
}

export default GetUsers;