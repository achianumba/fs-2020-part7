import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = ({ users }) => {
    return (
        <>
        <h2 className="display-4 text-center mb-4">Users</h2>
        <Table striped bordered hover>
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
        </Table>
        </>
    )
}

export default Users;