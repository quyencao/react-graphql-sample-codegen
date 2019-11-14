import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
    query getUser($id: ID!){
    getUser(id: $id){
        id
        username
        email
    }
}
`;

function GetUser() {
    const { loading, error, data } = useQuery(GET_USER);

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
        <div>
            <h1>GET_USER</h1>
        </div>
    )
}

export default GetUser;