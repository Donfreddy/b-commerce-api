#! /usr/bin/env node

console.log(
  "Specified database as argument - e.g.: initData mongodb://localhost/your_database_name"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require("async");
var Product = require("./models/productModel");
var Category = require("./models/categoryModel");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var products = [];
var categories = [];

// Callback (cb)

function categoryCreate(data, cb) {
  var category = new Category({ name: data.name, image_url: data.image });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category.name);
    categories.push(category);
    cb(null, category);
  });
}

function productCreate(data, cb) {
  let product = new Product({
    name: data.name,
    price: data.price,
    size: data.size,
    color: data.color,
    category: data.category,
    description: data.desc,
    image_url: data.image,
  });

  product.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New Product: " + product);
    products.push(product);
    cb(null, product);
  });
}

function createCategories(cb) {
  let data = [
    {
      name: "Pull",
      image:
        "https://i.pinimg.com/236x/85/98/46/859846f7babbb9d7297d935fdbdbec71.jpg",
    },
    {
      name: "Watch",
      image:
        "https://i.pinimg.com/236x/b8/e7/67/b8e76758c36c2cece393ab4e90d5b1b2.jpg",
    },
    {
      name: "T-shirts",
      image:
        "https://i.pinimg.com/236x/85/98/46/859846f7babbb9d7297d935fdbdbec71.jpg",
    },
    {
      name: "Shirts",
      image:
        "https://i.pinimg.com/236x/87/4e/8c/874e8c4946e78f5491518198cd5bf90f.jpg",
    },
    {
      name: "Shoes",
      image:
        "https://i.pinimg.com/236x/c9/53/d7/c953d70361375a12bf139ebb8a28758a.jpg",
    },
  ];

  async.series(
    data.map((obj) => (callback) => categoryCreate(obj, callback)),
    // optional callback
    cb
  );
}

function createProducts(cb) {
  let data = [
    {
      name: "Afro shoes",
      price: 9000,
      category: categories[0],
      image:
        "https://i.pinimg.com/236x/89/57/db/8957db0c3af1f7f5363492d824b35a4c.jpg",
      size: " M",
      color: "Orange",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "pull over",
      price: 8000,
      category: categories[0],
      image:
        "https://i.pinimg.com/564x/e1/2c/34/e12c34d5145a5491cc46a16a82efa07e.jpg",
      size: " M",
      color: "Red",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "Trouser Omega",
      price: 1600,
      category: categories[0],
      image:
        "https://i.pinimg.com/236x/dc/53/16/dc53168dbfb793b62ad30ac5147882da.jpg",
      color: "Blue",
      size: " M",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "pull shining",
      price: 500,
      category: categories[0],
      size: " M",
      image:
        "https://i.pinimg.com/564x/a8/a4/6e/a8a46e6cd67d69294143fd3d43b361dc.jpg",
      color: "Purple",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "Afro shirt 1",
      price: 600,
      category: categories[3],
      size: " M",
      image:
        "https://i.pinimg.com/236x/f2/14/47/f214471c6988b1555c5e877556e5358b.jpg",
      color: "Reinbow",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "Shirt pack 2",
      price: 1000,
      category: categories[3],
      size: " M",
      image:
        "https://i.pinimg.com/564x/1b/b1/cb/1bb1cb9c530e6b2e722d469482491c80.jpg",
      color: "Rainbow",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "Afro shirt 3",
      price: 1500,
      category: categories[3],
      size: " M",
      image:
        "https://i.pinimg.com/564x/2f/fe/4d/2ffe4d93ed5e399ca33a5c7fc4750989.jpg",
      color: "Purple",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "Afro shirt 4",
      price: 8000,
      category: categories[3],
      size: " M",
      image:
        "https://i.pinimg.com/564x/29/03/7d/29037d701d8e3e4576c9677e6e357e04.jpg",
      color: "Blue",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  async.series(
    data.map((obj) => (callback) => productCreate(obj, callback)),
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createProducts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Products: " + products);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
