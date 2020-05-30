import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
    return (
        <>
        <h2>Users</h2>
        <table cellSpacing="24px">
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
                        <td><Link to={ `/users/${user.id}` }>{ user.name }</Link></td>
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