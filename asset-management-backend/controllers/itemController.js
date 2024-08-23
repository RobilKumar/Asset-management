const Item = require("../models/itemModel");

exports.getItem = async (req, res, next) => {
  const searchQuery = req.query.q; // The search query parameter, e.g., ?q=John
  try {
    const items = await Item.getItem(searchQuery);
    if (!items || items.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(items);
  } catch (error) {
    next(error);
  }
};
