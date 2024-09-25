const { config } = require("./config");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const createTODOCsvFile = (records) => {
  const now = new Date().toISOString().split("T")[0];
  const pathName = `${config.csvDir.split(".csv")[0]}-${now}.csv`;
  const csvWriter = createCsvWriter({
    path: pathName,
    header: [
      { id: "name", title: "File Name" },
      { id: "size", title: "Size" },
      { id: "todoList", title: "TODOS" },
    ],
  });

  const formattedRecords = records.map((record) => ({
    ...record,
    todoList: record.todoList.join("\n"),
  }));

  csvWriter
    .writeRecords(formattedRecords)
    .then(() => {
      console.log("CSV file created successfully!");
    })
    .catch((err) => {
      console.error("Error creating CSV file:", err);
    });
};

module.exports = { createTODOCsvFile };
