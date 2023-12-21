const express = require('express');
const { Auth } = require('../middlewares/auth.middleware');
const { createFolder } = require('../modules/folderModule/folder.controller');

const app = express();

app.post('/create',Auth,createFolder);

module.exports = app;