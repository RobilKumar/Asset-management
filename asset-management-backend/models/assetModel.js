// models/assetModel.js
const db = require("../config/db");

const Asset = {
  async create(
    AssetModelNo,
    Name,
    AssignedEmployee,
    UnitPrice,
    DateOfPurchase,
    Status
  ) {
    const [result] = await db.execute(
      "INSERT INTO Assets (AssetModelNo, Name, AssignedEmployee, UnitPrice,DateOfPurchase,Status) VALUES (?, ?, ?, ?,?,?)",
      [AssetModelNo, Name, AssignedEmployee, UnitPrice, DateOfPurchase, Status]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await db.execute("SELECT * FROM Asset WHERE isDelete=0");
    return rows;
  },
  async findAllDeleted() {
    const [rows] = await db.execute("SELECT * FROM Asset WHERE isDelete=1");
    return rows;
  },

  async findById(ID) {
    console.log("working in assetModel");
    console.log(ID);
    const [rows] = await db.execute("SELECT * FROM Asset WHERE ID = ?", [ID]);
    console.log(rows);
    return rows[0];
  },

  // async update(AssetModelNo, Name, AssignedEmployee, UnitPrice, DateOfPurchase,Status,ID) {
  //   console.log("hii i have reached in assetModel update function query");
  //   await db.execute('UPDATE assets SET AssetModelNo = ?, Name = ?,AssignedEmployee = ?,UnitPrice = ?,DateOfPurchase = ?, Status= ?,WHERE ID = ?', [AssetModelNo, Name, AssignedEmployee, UnitPrice,DateOfPurchase,Status,ID]);
  // },

  async update(updateData, ID) {
    // console.log("hii i have reached in assetModel update function query");
    // console.log(ID)

    const {
      AssetModelNo,
      Name,
      AssignedEmployee,
      UnitPrice,
      DateOfPurchase,
      Status,
    } = updateData;

    await db.execute(
      "UPDATE Assets SET AssetModelNo = ?, Name = ?, AssignedEmployee = ?, UnitPrice = ?, DateOfPurchase = ?, Status = ? WHERE ID = ?",
      [
        AssetModelNo,
        Name,
        AssignedEmployee,
        UnitPrice,
        DateOfPurchase,
        Status,
        ID,
      ]
    );
  },

  async delete(ID) {
    console.log("hi this is delete api in AssetModel");
    await db.execute("UPDATE Asset SET isDelete=1 WHERE ID = ?", [ID]);

  },
};

module.exports = Asset;
