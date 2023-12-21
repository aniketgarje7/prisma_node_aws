const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return { data: user, error: null };
  } catch (e) {
    console.log(e.message, "error in getUserEmail");
    return { error: e, data: null };
  }
};

const createUser = async (name, email, password) => {
  try {
    const data = await prisma.user.create({
      data: { name, email, password },
    });
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in createUser");
    return { data: null, error: e };
  }
};

module.exports = { getUserByEmail, createUser };
