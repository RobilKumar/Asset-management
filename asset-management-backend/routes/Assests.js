// routes/assetRoutes.js
const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

router.post('/', assetController.createAsset);
router.get('/', assetController.getAllAssets);
router.get('/deletedData',assetController.getAllDeletedAssets);
router.get('/:ID', assetController.getAssetById);
router.put('/:ID', assetController.updateAsset);
router.patch('/:ID', assetController.deleteAsset);

module.exports = router;
