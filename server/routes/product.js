const express = require("express");

const connection = require("../connection");
const router = express.Router();

const auth = require("../services/authentication");
const checkRole = require("../services/checkRole");

router.post(
  "/addProduct",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res) => {
    let product = req.body;
    query =
      "INSERT INTO product(name,categoryId,description,price,status) VALUES(?,?,?,?,'true)";
    connection.query(
      query,
      [product.name, product.categoryId, product.description, product.price],
      (err, results) => {
        if (!err) {
          return res
            .status(200)
            .send({ message: "Product added successfully!" });
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
);

router.get("getProducts", auth.authenticateToken, (req, res) => {
  query =
    "SELECT p.id,p.name,p.description,p.price,c.id as categoryId,c.name as categoryName FROM product as p INNER JOIN category as c WHERE p.categoryId = c.id";
});
