const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//bcrypt is a packages hepl us to crypting user client password
const bcrypt = require("bcrypt");

///use validator package to validate if is email
const { isEmail } = require("validator");

const userSchema = new Schema(
  {
    full_name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Enter a valid email"],
    },
    phone: { type: String, required: true },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "The password min length is 6 caracters"],
    },
    image_url: { type: String },
  },
  { timestamps: true },
  { collection: "users" }
);

userSchema.pre("save", function (next) {
  bcrypt.genSalt().then((saltResult) => {
    bcrypt.hash(this.password, saltResult).then((cryptedResult) => {
      this.password = cryptedResult;
      next();
    });
  });
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("users", userSchema);
