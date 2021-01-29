// Import user model
const User = require("../models/userModel");

async function getAllUsers(req, res) {
  await User.find((err, doc) => {
    if (err) {
      res.status(400).json({ message: "Error occured" });
    } else {
      res.status(200).json({ data: doc });
    }
  });
}

async function getUser(req, res) {
  await User.findById(req.body.id, (err, doc) => {
    if (err) {
      res.status(400).json({ message: "User does not exist" });
    } else {
      res.status(200).json({ data: doc, message: "User has been updated" });
    }
  });
}

async function updateUser(req, res) {
  await User.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
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

// Export module to allow it to be imported in other files
module.exports = { getAllUsers, getUser, updateUser, deleteUser };
