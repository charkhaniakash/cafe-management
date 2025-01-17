const express = require("express");

const connection = require("../connection");
const router = express.Router();

const auth = require("../services/authentication");
const checkRole = require("../services/checkRole");

router.post(
  "/addProduct",
  auth.authenticateToken,
//   checkRole.checkRole,
  (req, res) => {
    let product = req.body;
    query =
      "INSERT INTO product(name,categoryId,description,price,status) VALUES(?,?,?,?,'true')";
    connection.query(
      query,
      [product.name, product.categoryId, product.description, product.price],
      (err, results) => {
        if (!err) {
            console.log("result: " + results)
          return res
            .status(200)
            .json({ message: "Product added successfully!" });
        } else {
            console.log(err)
          return res.status(500).json(err);
        }
      }
    );
  }
);

router.get("/getProducts", auth.authenticateToken, (req, res) => {
  query ="SELECT p.id,p.name,p.description,p.price,c.id as categoryId,c.name as categoryName FROM product as p INNER JOIN category as c WHERE p.categoryId = c.id";
  connection.query(query , (err,results)=>{
    if(!err){
        return res.status(200).json(results)
    }
    else{
        return res.status(500).json(err)
    }
  })
});

router.get("/getByCategoryId/:id" , auth.authenticateToken , (req,res)=>{
    const id = req.params.id;
    query = "SELECT id,name FROM product WHERE categoryId=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(500).json(err)
        }
    })
} )


router.get("/getById/:id" , auth.authenticateToken , (req,res)=>{
    const id = req.params.id;
    query = "SELECT id,name,description,price FROM product WHERE id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results[0])
        }else{
            return res.status(500).json(err)
        }
    })
})

router.patch('/updateProduct', auth.authenticateToken, (req, res, next) => {
    let product = req.body;
    let query = "update product set name=?, categoryId=?, description=?, price=? where id=?";
    connection.query(
        query,
        [product.name, product.categoryId, product.description, product.price, product.id],
        (err, result) => {
            if (!err) {
                if (result.affectedRows == 0) {
                    return res.status(404).json({ message: "Product id does not found" });
                }
                return res.status(200).json({ message: "Product Updated Successfully" });
            } else {
                return res.status(500).json(err);
            }
        }
    );
});


router.delete('/deleteProduct/:id', auth.authenticateToken , (req,res)=>{
    const id = req.params.id;
    query = "DELETE FROM product WHERE id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Product Id not found"})
            }
            return res.status(200).json({message:"Product Deleted Successfully"})
        }else{
            return res.status(500).json(err)
        }
    })
})




module.exports = router;
