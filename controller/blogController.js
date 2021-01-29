const blogModel = require("../models/blogModel");

//dans notre cas de figure cette requete nos sert a creer un article
const blog_index = (req, res) => {
  const blog = new blogModel({
    title: "Full stack web dev",
    snippet: "hello mongo db",
    body:
      "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
     console.log('error :',ErrorEvent);
     
    });

};

const blog_allBlog = (req, res) => {
  blogModel.find((err, doc) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
};

module.exports = {
  blog_index,
  blog_allBlog,
};
