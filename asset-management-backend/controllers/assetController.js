// controllers/assetController.js
const Asset = require('../models/assetModel');

exports.createAsset = async (req, res, next) => {
  try {
    const {AssetModelNo, Name, AssignedEmployee, UnitPrice,DateOfPurchase,Status} = req.body;
    const insertId = await Asset.create(AssetModelNo, Name, AssignedEmployee, UnitPrice,DateOfPurchase,Status);
    const newAsset = await Asset.findById(insertId);
    res.status(201).json(newAsset);
  } catch (err) {
    next(err);
  }
};

exports.getAllAssets = async (req, res, next) => {
  try {
    
    console.log("working till here in controller getAllAssets")
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (err) {
    next(err);
  }
};


exports.getAllDeletedAssets = async (req, res, next) => {
  try {
    
    console.log("working till here in controller getAllAssets")
    const assets = await Asset.findAllDeleted();
    res.json(assets);
  } catch (err) {
    next(err);
  }
};

exports.getAssetById = async (req, res, next) => {
  try {
    console.log("working till here in controller getAssetById")
    const asset = await Asset.findById(req.params.id);

    if (!asset) return res.status(404).send('Asset not found');
    res.json(asset);
  } catch (err) {
    next(err);
  }
};

// exports.updateAsset = async (req, res, next) => {
//   try {
//     console.log(req.body , "this is updateAsset");
//     const { ID } = req.body;
//     const updateData = {};

//     // Add only provided fields to updateData
//     if (req.body.AssetModelNo !== undefined) updateData.AssetModelNo = req.body.AssetModelNo;
//     if (req.body.Name !== undefined) updateData.Name = req.body.Name;
//     if (req.body.AssignedEmployee !== undefined) updateData.AssignedEmployee = req.body.AssignedEmployee;
//     if (req.body.UnitPrice !== undefined) updateData.UnitPrice = req.body.UnitPrice;
//     if (req.body.DateOfPurchase !== undefined) updateData.DateOfPurchase = req.body.DateOfPurchase;
//     if (req.body.Status !== undefined) updateData.Status = req.body.Status;

//     // Check if there are fields to update
//     if (Object.keys(updateData).length === 0) {
//       return res.status(400).send('No fields provided to update');
//     }

//     await Asset.update(ID, updateData);
//     const updatedAsset = await Asset.findById(ID);
//     if (!updatedAsset) return res.status(404).send('Asset not found');
//     res.json(updatedAsset);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateAsset = async (req, res, next) => {
//   try {
//     console.log(req.body, "this is updateAsset");
//     const { ID } = req.body;
//     const updateData = {};

//     // Add only provided fields to updateData and ensure no undefined values
//     if (req.body.AssetModelNo !== undefined) updateData.AssetModelNo = req.body.AssetModelNo !== '' ? req.body.AssetModelNo : null;
//     if (req.body.Name !== undefined) updateData.Name = req.body.Name !== '' ? req.body.Name : null;
//     if (req.body.AssignedEmployee !== undefined) updateData.AssignedEmployee = req.body.AssignedEmployee !== '' ? req.body.AssignedEmployee : null;
//     if (req.body.UnitPrice !== undefined) updateData.UnitPrice = req.body.UnitPrice !== '' ? req.body.UnitPrice : null;
//     if (req.body.DateOfPurchase !== undefined) updateData.DateOfPurchase = req.body.DateOfPurchase !== '' ? req.body.DateOfPurchase : null;
//     if (req.body.Status !== undefined) updateData.Status = req.body.Status !== '' ? req.body.Status : null;

//     // Check if there are fields to update
//     if (Object.keys(updateData).length === 0) {
//       return res.status(400).send('No fields provided to update');
//     }

//     // Execute update operation
//     await Asset.update(ID, updateData);
//     const updatedAsset = await Asset.findById(ID);
//     if (!updatedAsset) return res.status(404).send('Asset not found');
//     res.json(updatedAsset);
//   } catch (err) {
//     next(err);
//   }
// };

exports.updateAsset = async (req, res, next) => {
  try {
    console.log(req.body, "this is updateAsset");
    const  ID  = req.params.ID;
    console.log(req.params.ID);
    const updateData = {
      VC: req.body.VC !== undefined ? req.body.VC : null,
      Department: req.body.Department !== undefined ? req.body.Department : null,
      IssueDate: req.body.IssueDate !== undefined ? req.body.IssueDate : null,
      MobileNumber: req.body.MobileNumber !== undefined ? req.body.MobileNumber : null,
      Location: req.body.Location !== undefined ? req.body.Location : null,
      PG_UNIT: req.body.PG_UNIT !== undefined ? req.body.PG_UNIT : null,
      HostName: req.body.HostName !== undefined ? req.body.HostName : null,
      Purchased: req.body.Purchased !== undefined ? req.body.Purchased : null,
      Make: req.body.Make !== undefined ? req.body.Make : null,
      Model: req.body.Model !== undefined ? req.body.Model : null,
      SerialNo: req.body.SerialNo !== undefined ? req.body.SerialNo : null,
      AdaptorSerialNumber: req.body.AdaptorSerialNumber !== undefined ? req.body.AdaptorSerialNumber : null,
      CPUConfiguration: req.body.CPUConfiguration !== undefined ? req.body.CPUConfiguration : null,
      RAM: req.body.RAM !== undefined ? req.body.RAM : null,
      HDD_SDD: req.body.HDD_SDD !== undefined ? req.body.HDD_SDD : null,
      Window: req.body.Window !== undefined ? req.body.Window : null,
    };

    // Check if there are fields to update
    if (Object.values(updateData).every(value => value === null)) {
      return res.status(400).send('No fields provided to update');
    }

    // Execute update operation
    await Asset.update(updateData, ID);
    const updatedAsset = await Asset.findById(ID);
    if (!updatedAsset) return res.status(404).send('Asset not found');
    res.json(updatedAsset);
  } catch (err) {
    next(err);
  }
};




exports.deleteAsset = async (req, res, next) => {
  try {
    console.log("hi this is delete api in AssetController before api hit")
    await Asset.delete(req.params.ID);
    console.log(req.params.ID)
    console.log("hi this is delete api in AssetController after api hit")
    res.send('Asset deleted');
  } catch (err) {
    next(err);
  }
};
