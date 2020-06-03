import React from "react";
import { ListGroup } from "react-bootstrap";

const User = ({ user }) => {
    if (!user) return <>Not found</>

    return (
        <div className="px-5">
            <h2>{user.name}</h2>
            <h4>Blogs</h4>
            <ListGroup>
                {
                    user.blogs.map(blog => (
                        <ListGroup.Item action key={ blog.id }>{blog.title}</ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    )
}

export default User;