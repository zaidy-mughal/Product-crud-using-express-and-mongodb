const express = require('express');
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct} = require('../controllers/products.controller.js');
const router = express.Router();

// router.use((req,res,next)=>{
//     if(req.query.isAdmin){
//       next();
//     }else{
//       res.send("Not Admin!");
//     }
//   });

router.get('/',getProducts);
router.get('/:id',getProduct);
router.post('/',createProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);


module.exports = router;