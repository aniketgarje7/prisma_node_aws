const express = require('express');
const { loginUser, siginUser } = require('../modules/authModule/auth.controller');

const app = express();

app.post('/login',loginUser);
app.post('/signin',siginUser);

module.exports = app;