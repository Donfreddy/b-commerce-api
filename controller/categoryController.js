// Import user model
const Category = require("../models/categoryModel");

function getAllCategories(req, res) {
  Category.find({}).exec(function (err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
}

module.exports = { getAllCategories };
