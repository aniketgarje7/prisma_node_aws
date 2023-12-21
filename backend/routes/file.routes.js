const express = require("express");
const { Auth } = require("../middlewares/auth.middleware");
const { createFile, renameFile, moveFile, deleteFile } = require("../modules/fileModule/file.controller");
const { upload } = require("../modules/fileModule/awsS3");

const app = express();

app.post("/create/:folderId", upload.single("file"), Auth, createFile);
app.post("/update/:fileId", Auth, renameFile);
app.post("/move/:fileId", Auth, moveFile);
app.delete("/delete/:fileId", Auth, deleteFile);
module.exports = app;
