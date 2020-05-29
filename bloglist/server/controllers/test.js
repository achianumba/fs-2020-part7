const testRouter = require('express').Router();
const { deleteAllUsers } = require('../models/user')
const { deleteAllBlogs } = require('../models/blog');

testRouter.post('/reset', async (req, res) => {
    await deleteAllBlogs();
    await deleteAllUsers();
    res.status(204).end()
});

module.exports = testRouter;