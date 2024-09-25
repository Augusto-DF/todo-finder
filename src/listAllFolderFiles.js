const fs = require("fs").promises;
const path = require("path");
const { config } = require("./config");

const listFilesWithString = async (directoryPath, searchString = "TODO") => {
  const matchingFiles = [];

  const files = await fs.readdir(directoryPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directoryPath, file.name);

    const pathArray = filePath.split("\\");

    const isDir = file.isDirectory();
    const isAnIgnoredDir = pathArray.find((ignoredDir) =>
      config.ignoredFolders.includes(ignoredDir)
    );

    if (isDir && !isAnIgnoredDir) {
      const subDirFiles = await listFilesWithString(filePath, searchString);
      matchingFiles.push(...subDirFiles);
    } else {
      if (file.isFile()) {
        const content = await fs.readFile(filePath, "utf-8");
        if (content.includes(searchString)) {
          matchingFiles.push(filePath);
        }
      }
    }
  }

  return matchingFiles;
};

const getTODOS = async (filePath, strTarget = "TODO") => {
  const file = await fs.readFile(filePath, "utf-8");

  const splittedByLines = file
    .split("\n")
    .filter((line) => line.includes(strTarget) && line.includes("//"));

  const regexCompoundComment = /\/\*[\s\S]*?\*\//g;

  const splittedByCompoundComment =
    file
      .match(regexCompoundComment)
      ?.filter((comment) => comment.includes("TODO")) || [];

  return [...splittedByLines, ...splittedByCompoundComment];
};

const formatTODO = (todo) => {
  return todo
    .replaceAll("\r\n", " ")
    .replaceAll("/", "")
    .replaceAll("*", "")
    .trim();
};

module.exports = { listFilesWithString, getTODOS, formatTODO };
