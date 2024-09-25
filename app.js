const exp = require("express");
const { config } = require("./src/config");
const {
  listFilesWithString,
  getTODOS,
  formatTODO,
} = require("./src/listAllFolderFiles");
const { createTODOCsvFile } = require("./src/csvCreator");
const app = exp();

const PORT = 8200;

const main = async () => {
  const files = await listFilesWithString(config.targetDir());

  let todos = [];

  for (let file of files) {
    const fileTodos = await getTODOS(file);
    const formattedTodos = fileTodos.map((todo) => formatTODO(todo));

    todos = [
      ...todos,
      {
        name: file,
        size: formattedTodos.length,
        todoList: [...formattedTodos],
      },
    ];
  }

  if (todos.length > 0) return createTODOCsvFile(todos);
};

main();

app.listen(PORT, () => {
  console.log("running on " + PORT);
});
