const fs = require("fs");
const csv = require("csv-parser");

exports.parseCsv = (req, res, next) => {
  const csvFile = req.files;
  let parsed = [];
  
  if (!csvFile) {
    const error = new Error("An error occured!");
    error.title = "Error Occured";
    error.statusCode = 422;
    throw error;
  }

  fs.writeFile("./csv/file.csv", csvFile.csv.data, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.createReadStream("./csv/file.csv")
    .pipe(csv())
    .on("data", (data) => parsed.push(data))
    .on("end", () => {
      res.status(200).json({ parsedCsv: parsed });
    });
};
