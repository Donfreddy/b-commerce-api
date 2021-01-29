// Import user model
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

/**
 * Freddy's method
 */
async function getAllProduct(req, res) {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const getPagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;

        return { limit, offset };
    };

    // paginate option
    var options = {
        limit: limit,
        offset: offset,
        lean: true,
        populate: "category",
    };

    await Product.paginate({}, options)
        .then((result) => {
            let data = {
                totalItems: result.totalDocs,
                totalPages: result.totalPages,
                currentPage: result.page - 1,
                data: result.docs,
            };

            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err.message });
        });
}

/**
 * Zidane's method
 */
// async function getAllProduct(req, res) {
//     // Declaring variable
//     let start = req.query.page || 1; // page
//     let size = req.query.size;

//     // convert in to number
//     let pageNumber = parseInt(start);
//     let sizeNumber = parseInt(size);

//     Product.find({}, {}, { limit: sizeNumber * 1, skip: (pageNumber - 1) * sizeNumber })
//         .populate("category", "-__v")
//         .exec(function(err, doc) {
//             if (err) {
//                 res.json({ message: err.message });
//             } else {
//                 let data = {};
//                 resultsModel.find().countDocuments((err, num) => {
//                     data.total = num;
//                     data.page = pageNumber;
//                     data.size = sizeNumber;
//                     data.totalNumberOfPages = Math.ceil(num / size);
//                     data.data = doc;
//                     res.json(data);
//                 });
//             }
//         });
// }

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
        .exec(function(err, product) {
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