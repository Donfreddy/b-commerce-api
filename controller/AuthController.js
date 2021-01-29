const userModel = require("../models/userModel");
//use for json web token
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const register = (req, res) => {
  const { email, password } = req.body;
  const user = new userModel({ email, password });

  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        user: user,
        jwt: createToken(result._id),
      });
    })
    .catch((err) => {
      console.log(err.message, err.code);
      if (err.code === 11000) {
        res.send(`The email : ${req.body.email} already exit `);
      }
      //  const errors = handleErrors(err);
      //     res.status(400).json({ errors });
      res.send(err.message);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  userModel
    .login(email, password)
    .then((result) => {
      res.status(201).json({
        user: result,
        jwt: createToken(result._id),
      });
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
};

const deleteUser = (req, res) => {
  userModel.findByIdAndRemove({ _id: req.params.id }).then((result) => {
    res.send(result);
  });
};

const getAllUser = (req, res) => {
  userModel.find().then((result) => {
    res.send(result);
  });
};

/// generate the json web token
const createToken = (id) =>
  jwt.sign({ id: id }, config.secret, {
    expiresIn: maxAge,
  });

const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports = {
  register,
  login,
  getAllUser,
  deleteUser,
};
