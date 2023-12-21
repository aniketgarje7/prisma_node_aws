const Joi = require("joi");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUserByEmail, createUser } = require("./auth.service");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const SALTROUND = Number(process.env.SALTROUND);

const loginUser = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(30),
    password: Joi.string().required(),
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

  const { email, password } = req.body;
  const userData = await getUserByEmail(email);
  if (userData.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: userData.error,
    });
  } else if (userData.data === null) {
    return res.status(400).send({
      status: 400,
      message: "user does not exist!",
      data: false,
    });
  }
  const hash = userData.data.password;
  const isPasswordCorrect = await bcrypt.compare(password, hash);
  if (!isPasswordCorrect) {
    return res.status(400).send({
      status: 400,
      message: "password is incorrect.",
      data: false,
      error: { message: "password is incorrect." },
    });
  }

  const { name, id } = userData.data;

  const payload = {
    name: name,
    email: email,
    userId: id,
  };
  const token = jwt.sign(payload, JWT_SECRET);

  return res.status(200).send({
    status: 200,
    message: "User logged in succesfully.",
    data: { message: "User logged in succesfully.", token: token, name: name },
  });
};

const siginUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).alphanum(),
    confirm_password: Joi.ref("password"),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      data: false,
      error: isValid.error.details[0],
      message: "error in data",
    });
  }
  const { email, password, name } = req.body;
  const isUserExist = await getUserByEmail(email);
  if (isUserExist.data) {
    return res.status(400).send({
      status: 400,
      message: "email is already register.",
      data: false,
      error: { message: "email is already register." },
    });
  } else if (isUserExist?.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in fetching  email",
      data: false,
    });
  }

  const hash_password = await bcrypt.hash(password, SALTROUND);
  const userData = await createUser(name, email, hash_password);
  if (userData.error) {
    return res.status(400).send({ status: 400, message: "DB error:Failed to create user", error: userData.error, data: false });
  }
  return res.status(200).send({
    status: 200,
    message: "User created succesfully.",
    data: { message: "User created succesfully.", user: userData.data },
    error: false,
  });
};

module.exports = { loginUser, siginUser };
