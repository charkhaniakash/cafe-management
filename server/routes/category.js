const express = require("express");
const connection = require("../connection");
const router = express.Router();
const auth = require("../services/authentication");
const checkRole = require("../services/checkRole");

router.post(
  "/addCategory",
  auth.authenticateToken,
  //   checkRole.checkRole,
  (req, res) => {
    let category = req.body;
    console.log(category);
    query = "INSERT INTO category(name) VALUES(?)";
    connection.query(query, [category.name], (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "Category added successfully!" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

router.get("/getCategory", auth.authenticateToken, (req, res, next) => {
  query = "SELECT * FROM category order by name";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch(
  "/updateCategory",
  auth.authenticateToken,
//   checkRole.checkRole,
  (req, res, next) => {
    let product = req.body;
    query = "UPDATE category SET name=? WHERE id=?";
    connection.query(query, [product.name,product.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Category Id not found" });
        }
        return res
          .status(200)
          .json({ message: "Category updated successfully!" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
