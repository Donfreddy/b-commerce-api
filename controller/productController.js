// Import user model
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

async function getAllProduct(req, res) {
  Product.find({})
    .populate("category", "-__v")
    .exec(function (err, data) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(data);
      }
    });
}

async function productCreate(req, res) {
  let data = req.body;
  const { category } = data;

  let product = new Product({
    name: data.name,
    price: data.price,
    size: data.size,
    color: data.color,
    description: data.description,
    image_url: data.image_url,
  });

  product.save((err) => {
    if (err) {
      res.json({ message: err.message });
    }

    if (category) {
      Category.findOne({ name: category }, (err, category) => {
        if (err) {
          res.json({ message: err.message });
        }

        product.category = category._id;
        product.save((err) => {
          if (err) {
            res.json({ message: err.message });
          }

          res.json({ product: product, message: "Product created" });
        });
      });
    } else {
      //TODO: implement when category is null.
    }
  });
}

async function productDetail(req, res, next) {
  let id = req.params.id;

  await Product.findById(id)
    .populate("category", "-__v")
    .exec(function (err, product) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ data: product });
      }
    });
}

async function productUpdate(req, res) {
  let id = req.params.id;

  await Product.findOneAndUpdate({ _id: id }, req.body, (err, doc) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json({ message: "Product updated" });
    }
  });
}

async function productDelete(req, res) {
  let id = req.params.id;

  await Product.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json({ message: "Product deleted" });
    }
  });
}

module.exports = {
  getAllProduct,
  productDetail,
  productCreate,
  productUpdate,
  productDelete,
};
