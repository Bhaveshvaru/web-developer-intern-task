const Product = require("./product.model.js");

//Create new Product
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  }

  // Create a Product
  const product = new Product({
    avgSpeed: req.body.avgSpeed,
    total_travel_duration: req.body.total_travel_duration,
    total_travel_distance: req.body.total_travel_distance,
    safe_travel_distance: req.body.safe_travel_distance,
    safe_travel_duration: req.body.safe_travel_duration,
    moderate_travel_distance: req.body.moderate_travel_distance,
    modedrate_travel_duration: req.body.modedrate_travel_duration,
    risky_travel_distance: req.body.risky_travel_distance,
    risky_travel_duration: req.body.risky_travel_duration,
    Date: req.body.Date
  });

  // Save Product in the database
  product
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the product."
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving products."
      });
    });
};

// Update a product
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  }

  // Find and update product with the request body
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      avgSpeed: req.body.avgSpeed,
      total_travel_duration: req.body.total_travel_duration,
      total_travel_distance: req.body.total_travel_distance,
      safe_travel_distance: req.body.safe_travel_distance,
      safe_travel_duration: req.body.safe_travel_duration,
      moderate_travel_distance: req.body.moderate_travel_distance,
      modedrate_travel_duration: req.body.modedrate_travel_duration,
      risky_travel_distance: req.body.risky_travel_distance,
      risky_travel_duration: req.body.risky_travel_duration,
      Date: req.body.Date
    },
    { new: true }
  )
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Something wrong updating id " + req.params.productId
      });
    });
};

// Delete  with the specified  in the request
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      res.send({ message: "Product deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.productId
      });
    });
};
