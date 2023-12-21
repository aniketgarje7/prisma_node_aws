const Joi = require("joi");
const { folderCreate } = require("./folder.servise");

const createFolder = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required().max(30),
    parentId: Joi.number(),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      data: false,
      error: isValid?.error?.details[0],
    });
  }
  const { name, parentId } = req.body;
  const { userId } = req.locals;

  const folder = await folderCreate(name, userId, parentId);
  if (folder.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }

  return res.status(200).send({
    status: 200,
    message: "folder is created.",
    data: folder.data,
    error: false,
  });
};

module.exports = { createFolder };
