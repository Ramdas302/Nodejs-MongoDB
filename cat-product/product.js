const express = require('express');
var router = express.Router();
var { Product } = require('../models/product');
var { Category } = require('../models/category');


router.post('/add-product',function(req,res){
  var productData = new Product({
    productid: req.body.productid,
    productname:req.body.productname,
    categoryId:req.body.categoryId
  });
  productData.save(function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    } else {
      res.json({
        status: 200,
        data: result
      })
    }

  });

});
  
    router.get('/getproductsdata',async(req,res)=>{
      const perPage = 10;
      let page = parseInt(req.query.page) || 1;
        const count = await Product.count();
      var view_data=[];
      Product.find({})
      .skip(perPage * page - perPage)
      .limit(perPage).populate('categoryId', ['categoryname']).exec(function(err,product){
        if(err){
          console.error(err);
        }else if(product!='' || product!=undefined  || product!=null){
          product.forEach(function(products){
          view_data.push({
            productid :products._id,
            productname:products.productname,
            categoryId:products.categoryId._id,
            categoryname:products.categoryId.categoryname,
          })
      
        })
          res.json({
            status:200,
            data:view_data,
            current: page,
            pages: Math.ceil(count / perPage),
          });
        }else{
          res.json({
            status:400
          });
        }
      });
      });
      
      

  router.get('/readproduct/:id',(req, res) => {
    Product.findById(req.params.id, (err, productdata) => {
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: productdata
        });
      }
    })
  })
  
  router.get('/getProduct',function(req,res){
    Product.find({}).exec(function(err,products){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: products
        });
      }
    
    });
  
});
  

  router.put('/updateproduct/:id',function(req,res){
    update = {
    $set: {
      productname:req.body.productname,
      productid: req.body.productid,
      categoryId:req.body.categoryId
      
    }
    };
    Product.findByIdAndUpdate(req.params.id,update, function (err, product) {
      if (err) {
        return res.status(400).json({
          message: 'Bad Request'
        });
      } else {
        res.json({
          status: 200,
          data: product
        })
      }
    
    });
    
    });
  
  
    router.post('/deleteproduct/:id',function(req,res){
      Product.findByIdAndRemove(req.params.id,function(err,deleteproduct){
          if(err){
              res.json({
                  status : 400
              })
          }else{
              res.json({
                  status : 200
              })
          }
      })
  });
  module.exports = router;