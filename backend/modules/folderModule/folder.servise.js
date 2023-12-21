const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const folderCreate = async (name, userId, parentId) => {
  let pId = parentId || null;
  try {
    const data = await prisma.folder.create({
      data: { name: name, userId: userId, parentId: pId },
    });
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in folderCreate");
    return { data: false, error: e };
  }
};

module.exports = { folderCreate };
