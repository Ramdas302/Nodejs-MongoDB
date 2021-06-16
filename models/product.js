const mongoose = require('mongoose');
const { Schema } = mongoose;
var Product = mongoose.model('Product',{
    productid: {
        type: Number,
        
        
    },
    productname:{ type:String,
        
    },
    categoryId: {
        type: String,
        ref: 'Category',
      },
    
     
});

module.exports = { Product};
