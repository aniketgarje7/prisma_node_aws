const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const Auth = async (req, res, next) => {
  const token = req.headers["x-propacity"];

  let verified;
  try {
    verified = jwt.verify(`${token}`, JWT_SECRET);
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Please provide Auth token.",
      data: false,
      error: error,
    });
  }

  if (verified) {
    req.locals = verified;
    next();
  } else {
    return res.status(400).send({
      status: 400,
      message: "User is not Authenticated ,please Login.",
      data: false,
      error: { message: "User is not Authenticated ,please Login." },
    });
  }
};
module.exports = { Auth };
