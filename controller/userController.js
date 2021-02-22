// Import user model
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Product = require("../models/productModel");

async function getAllUsers(req, res) {
  //upload images
  await User.find((err, doc) => {
    if (err) {
      res.status(400).json({ message: "Error occured" });
    } else {
      res.status(200).json({ data: doc });
    }
  });
}

async function getUser(req, res) {
  await User.findById(req.params.id, (err, doc) => {
    if (err) {
      res.status(400).json({ message: "User does not exist" });
    } else {
      res.status(200).json({ data: doc, message: "User has been updated" });
    }
  });
}

async function updateUser(req, res) {
  // get file
  console.log(req.file);

  const user = {
    ...req.body,
    image_url: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  };

  await User.findByIdAndUpdate(req.params.id, user, (err, doc) => {
    if (err) {
      res.status(400).json({ message: "Error occured" });
    } else {
      res.status(200).json({ data: doc, message: "User has been updated" });
    }
  });
}

async function deleteUser(req, res) {
  await User.findByIdAndRemove(req.body.id, (err, doc) => {
    if (err) {
      res.json({ message: "Error occured" });
    } else {
      if (doc != null) {
        res.status(200).json({ data: null, message: "User has been deleted" });
      } else {
        res.status(400).json({ message: "Error occured" });
      }
    }
  });
}

/**
 *  User WishList
 */

async function getWishlist(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.json({ message: "Unauthenticated" });
  }

  const user = await User.findById(userId).populate("wishlist");
  var products = [];

  for (let i = 0; i < user.wishlist.length; i++) {
    const id = user.wishlist[i]._id;
    const product = await Product.findById(id).populate("category", "-__v");

    products.push(product);
  }
  res.status(200).json({ data: products });
}

async function addWishlistItem(req, res) {
  const { userId, productId } = req.params;

  if (!userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).send(`No product with id: ${productId}`);

  const user = await User.findById(userId);
  let isExist = user.wishlist.includes(productId);

  if (isExist) {
    return res.json({ message: "This product is already added" });
  } else {
    user.wishlist.push(productId);

    await User.findByIdAndUpdate(userId, user, (err, updateUser) => {
      if (err) {
        res.json({ message: err.message });
      }

      //console.log(updateUser);
      res.status(200).json({ message: "Added to wishlist" });
    });
  }
}

async function removeWishlistItem(req, res) {
  const { userId, productId } = req.params;

  if (!userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).send(`No product with id: ${productId}`);

  const user = await User.findById(userId);
  let index = user.wishlist.indexOf(productId);

  if (index === -1) {
    return res.json({ message: "Product not found" });
  } else {
    user.wishlist.splice(index, 1);

    await User.findByIdAndUpdate(userId, user, (err, updateUser) => {
      if (err) {
        res.json({ message: err.message });
      }

      //console.log(updateUser);
      res.status(200).json({ message: "Removed to wishlist" });
    });
  }
}

// Export module to allow it to be imported in other files
module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
};
