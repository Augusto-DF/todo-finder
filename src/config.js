const TARGET_DIR = "bokinha-wedding-site-backend";
const START_DIR = "../";
const CSV_NAME = "TODOS_TABLE";

const config = {
  ignoredFolders: ["node_modules", ".git"],
  targetDir: () => `${START_DIR}${TARGET_DIR}`,
  csvDir: `./todos/${CSV_NAME}.csv`,
};

module.exports = { config };
