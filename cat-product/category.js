const express = require('express');
var router = express.Router();
var { Category } = require('../models/category');
const { Product } = require('../models/product');


router.post('/add-category',function(req,res){
  var categorytData = new Category({
    categoryid: req.body.categoryid,
    categoryname:req.body.categoryname,
  });
  categorytData.save(function (err, result) {
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
  
  
  

router.get('/readcategory/:id',(req, res) => {
  Category.findById(req.params.id, (err, categorydata) => {
    if(err){
      return res.status(400).json({
        message: 'Bad Request'
      });
    }else{
      res.json({
        status: 200,
        data: categorydata
      });
    }
  })
})

router.get('/getCategory',function(req,res){
  Category.find({}).exec(function(err,categorys){
    if(err){
      return res.status(400).json({
        message: 'Bad Request'
      });
    }else{
      res.json({
        status: 200,
        data: categorys
      });
    }
  
  });

});


router.put('/updatecategory/:id',function(req,res){
  update = {
  $set: {
    categoryid:req.body.categoryid,
    categoryname: req.body.categoryname,
  }
  };
  Category.findByIdAndUpdate(req.params.id,update, function (err, category) {
    if (err) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    } else {
      res.json({
        status: 200,
        data: category
      })
    }
  
  });
  
  });


  router.post('/deletecategory/:id',function(req,res){
    Category.findByIdAndRemove(req.params.id,function(err,deletecategory){
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