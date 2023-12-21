const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addFile = async (filename, url, size, folderId, userId) => {
  try {
    const data = await prisma.file.create({
      data: { name: filename, userId: userId, folderId: folderId, url: url, size: size },
    });
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in addFile");
    return { data: false, error: e };
  }
};

const updateFile = async (where, data) => {
  try {
    const file = await prisma.file.update({
      where: where,
      data: data,
    });
    return { data: file, error: false };
  } catch (e) {
    console.log(e.message, "error in updateFile");
    return { data: false, error: e };
  }
};

const getFolder = async (where) => {
  try {
    const folder = await prisma.folder.findUnique({ where: where });
    return { data: folder, error: false };
  } catch (e) {
    console.log(e.message, "error in getFolderById");
    return { data: false, error: e };
  }
};

const getFile = async (where) => {
  try {
    const folder = await prisma.file.findUnique({ where: where });
    return { data: folder, error: false };
  } catch (e) {
    console.log(e.message, "error in getFile");
    return { data: false, error: e };
  }
};

const deleteFileByWhere = async (where) => {
  try {
    const folder = await prisma.file.delete({ where: where });
    return { data: folder, error: false };
  } catch (e) {
    console.log(e.message, "error in getFile");
    return { data: false, error: e };
  }
};
module.exports = { addFile, updateFile, getFolder, getFile, deleteFileByWhere };
