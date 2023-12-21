const Joi = require("joi");
const { s3 } = require("./awsS3");
const { addFile, updateFile, getFolder, getFile, deleteFileByWhere } = require("./file.service");

const createFile = async (req, res) => {
  const schema = Joi.object({
    folderId: Joi.required(),
  });
  const isValid = schema.validate(req.params);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      data: false,
      error: isValid?.error?.details[0],
    });
  }
  const { folderId } = req.params;
  const { userId } = req.locals;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: Date.now() + "-" + req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error uploading file." });
    }
    console.log(data, "data");
    const url = data.Location;
    const filename = req.file.originalname;
    const size = req.file.size;
    const file = await addFile(filename, url, size, Number(folderId), Number(userId));
    if (file.error) {
      return res.status(400).send({
        status: 400,
        message: "Error in DB",
        data: false,
        error: { message: "Error in DB" },
      });
    }
    return res.status(200).send({
      status: 200,
      message: "file is created.",
      data: file.data,
      error: false,
    });
  });
};

const renameFile = async (req, res) => {
  const { fileId } = req.params;
  const { fileName } = req.body;
  const schema = Joi.object({
    fileId: Joi.required(),
    fileName: Joi.string().required(),
  });
  const isValid = schema.validate({ fileId, fileName });
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      data: false,
      error: isValid?.error?.details[0],
    });
  }
  // isFileExist
  const checkFile = await getFile({ id: Number(fileId) });
  if (checkFile.data === null) {
    return res.status(400).send({
      status: 400,
      message: "file does not exist",
      data: false,
      error: { message: "file does not exist" },
    });
  } else if (checkFile.error) {
    return res.status(400).send({
      status: 400,
      message: "file does not exist",
      data: false,
      error: { message: checkFolder.error.message },
    });
  }
  const { userId } = req.locals;
  const fileUserId = checkFile.data.userId;
  if (Number(fileUserId) !== Number(userId)) {
    return res.status(400).send({
      status: 400,
      message: "can not update this file.",
      data: false,
      error: { message: "can not update this file" },
    });
  }
  const file = await updateFile({ id: Number(fileId) }, { name: fileName });
  if (file.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }
  return res.status(200).send({
    status: 200,
    message: "file is created.",
    data: file.data,
    error: false,
  });
};

const moveFile = async (req, res) => {
  const { fileId } = req.params;
  const { folderId } = req.body;
  const schema = Joi.object({
    fileId: Joi.required(),
    folderId: Joi.required(),
  });
  const isValid = schema.validate({ fileId, folderId });
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      data: false,
      error: isValid?.error?.details[0],
    });
  }
  const checkFile = await getFile({ id: Number(fileId) });
  if (checkFile.data === null) {
    return res.status(400).send({
      status: 400,
      message: "file does not exist",
      data: false,
      error: { message: "file does not exist" },
    });
  } else if (checkFile.error) {
    return res.status(400).send({
      status: 400,
      message: "file does not exist",
      data: false,
      error: { message: checkFolder.error.message },
    });
  }
  const { userId } = req.locals;
  const fileUserId = checkFile.data.userId;
  if (Number(fileUserId) !== Number(userId)) {
    return res.status(400).send({
      status: 400,
      message: "can not update this file.",
      data: false,
      error: { message: "can not update this file" },
    });
  }
  const checkFolder = await getFolder({ id: folderId });
  if (checkFolder.data === null) {
    return res.status(400).send({
      status: 400,
      message: "Folder does not exist",
      data: false,
      error: { message: "Folder does not exist" },
    });
  } else if (checkFolder.error) {
    return res.status(400).send({
      status: 400,
      message: "Folder does not exist",
      data: false,
      error: { message: checkFolder.error.message },
    });
  }
  const file = await updateFile({ id: Number(fileId) }, { folderId: Number(folderId) });
  if (file.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }
  return res.status(200).send({
    status: 200,
    message: "file is updated.",
    data: file.data,
    error: false,
  });
};

const deleteFile = async (req, res) => {
  const { fileId } = req.params;
  const schema = Joi.object({
    fileId: Joi.required(),
  });
  const isValid = schema.validate({ fileId });
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      data: false,
      error: isValid?.error?.details[0],
    });
  }
  const checkFile = await getFile({ id: Number(fileId) });
  if (checkFile.data === null) {
    return res.status(400).send({
      status: 400,
      message: "file does not exist",
      data: false,
      error: { message: "file does not exist" },
    });
  } else if (checkFile.error) {
    return res.status(400).send({
      status: 400,
      message: "file does not exist",
      data: false,
      error: { message: checkFolder.error.message },
    });
  }
  const { userId } = req.locals;
  const fileUserId = checkFile.data.userId;
  if (Number(fileUserId) !== Number(userId)) {
    return res.status(400).send({
      status: 400,
      message: "can not delete this file.",
      data: false,
      error: { message: "can not delete this file" },
    });
  }
  const file = await deleteFileByWhere({ id: Number(fileId) });
  if (file.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }
  return res.status(200).send({
    status: 200,
    message: "file is deleted.",
    data: file.data,
    error: false,
  });
};
module.exports = { createFile, renameFile, moveFile, deleteFile };
