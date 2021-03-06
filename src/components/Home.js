import React, { useEffect, useState, useRef } from 'react'
import Navigation from './Navigation'
import Map from './Map'
import UserContext from '../contexts/UserContext';
import Search from './Search';
import Toggle from './Toggle';
import { useQuery, gql } from '@apollo/client'

const createFriendshipMutation = gql`
mutation($username:String!) {
	createFriendshipFromUsername(username:$username) {
  	    success,
        message, 
        errors {
            path,
            message
        }
	}
}`;


const getUser = 
gql`
    query {
        getUser {
            success
            user {
                id
                firstName
                lastName
                username
                status
                friends {
                    id
                    firstName
                    lastName
                    username
                }
            },
            errors {
                path,
                message
            }
        }
    }
`;

function Home () {

    const { loading, error, data } = useQuery(getUser);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (error) console.log(`Error! ${error.message}`);

    if (data && data.getUser.success) {
        // user.current = data.getUser.user;
        return (
            <div>
                <UserContext.Provider value={data.getUser.user}>
                    <div className="flex items-center justify-between flex-wrap bg-transparent z-50">
                        <div className="w-1/2 flex justify-start items-center">
                            <Search />
                            <Toggle />
                        </div>
                        <div>
                            <Navigation />
                        </div>
                    </div>
                    {/* <Map /> */}
                </UserContext.Provider>
            </div>
        )
    }

}

export default Home