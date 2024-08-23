const express = require("express");
const clc = require("cli-color");
const bodyParser = require("body-parser");
const cors = require("cors");
const xlsx = require("xlsx");
const db = require("./config/db");
const multer = require("multer");
const path = require("path");

require("dotenv").config();
const errorHandler = require("./middlewares/errorhandler");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const fs = require("fs");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/asset-management', { useNewUrlParser: true, useUnifiedTopology: true })
//connect to databas

// Models
const User = require("./models/User");
const Asset = require("./models/assetModel");

// Routes
app.use("/users", require("./routes/Users"));
app.use("/assets", require("./routes/Assests"));
app.use("/item",require("./routes/Item"))
app.use(errorHandler);

// Endpoint to upload and process Excel file
app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  // Read the Excel file
  const workbook = xlsx.readFile(filePath);
  const sheet_name_list = workbook.SheetNames;
  const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  // const workbook = xlsx.readFile(filePath);
  // const sheetName = workbook.SheetNames[0];
  // const sheet = workbook.Sheets[sheetName];
  // const jsonData = xlsx.utils.sheet_to_json(sheet);
  // console.log(xlData,"this is xlData");

  // xlData.forEach((row, index) => {
  //  let demo= []
  //  demo.push(row);

  //   const query = "INSERT INTO Assets (ID,Images,AssetModelNo,Name,AssignedEmployee, UnitPrice,  status,Action,isDelete) VALUES (?, ?, ?, ?, ?, ?,?,?,?)";
  //   db.execute(query, demo, (err, result) => {

  //     console.log(result, "this is result");
  //     // if (err) {
  //     //   console.error(`Error on row ${index + 1}:`, err); // Log the error
  //     //   if (index === xlData.length - 1) { // Send response after last iteration
  //     //     return res.status(500).send(err);
  //     //   }
  //     // } else {
  //     //   if (index === xlData.length - 1) { // Send response after last iteration
  //     //     return res.status(200).send('Data inserted successfully');
  //     //   }
  //     // }
  //   });
  // });

  try {
    for (const row of xlData) {
      const query =
        "INSERT INTO Asset(VC, Department, MobileNumber, Location, PG_UNIT, HostName, Purchased,Make,Model, SerialNo,AdaptorSerialNumber, CPUConfiguration,RAM,HDD_SSD,`Window` ) VALUES (?,?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)";
      const values = [
        row.VC ?? null,
        row.Department ?? null,
        row.MobileNumber ?? null,
        row.Location ?? null,
        row.PG_UNIT ?? null,
        row.HostName ?? null,
        row.Purchased ?? null,
        row.Make ?? null,
        row.Model ?? null,
        row.SerialNo ?? null,
        row.AdaptorSerialNumber ?? null,
        row.CPUConfiguration ?? null,
        row.RAM ?? null,
        row.HDD_SSD ?? null,
        row.Window ?? null,
      ];

      console.log("Executing query with values:", values);

      const [result] = await db.execute(query, values);
      console.log("Row inserted successfully:", result);
    }
  } catch (err) {
    console.error("Error processing data:", err);
  }

  // Insert data into the database
  // xlData.forEach(row => {
  //   const query = '"INSERT INTO Assets (AssetModelNo, Name, AssignedEmployee, UnitPrice,DateOfPurchase,Status) VALUES (?, ?, ?, ?,?,?)"';
  //   db.execute(query, row, (err, result) => {
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
  //   });
  // });

  res.send("Data inserted successfully");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(clc.yellowBright.underline(`Server running on port ${PORT}`))
);
