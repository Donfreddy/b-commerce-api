// Import user model
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

function getAllCategories(req, res) {
    Category.find({}).exec(function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
}

function productPerCategory(req, res) {
    let categoryId = req.params.id;

    Product.find({ category: categoryId })
        .populate("category", "-__v")
        .exec(function(err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
}

module.exports = { getAllCategories, productPerCategory };