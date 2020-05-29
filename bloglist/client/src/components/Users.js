import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../redux";

const Users = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch]);

    return (
        <>
        <h2>Users</h2>
        <table>
            <thead>
            <tr>
                <th>User</th>
                <th>Blogs created</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map(user => (
                    <tr key={ user.id }>
                        <td>{ user.name }</td>
                        <td>{ user.blogs.length }</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}

export default Users;