const mongoose = require('mongoose');
const { Schema } = mongoose;
var Category = mongoose.model('Category',{
    categoryid: {
        type: Number,
        
    },
    categoryname:{type:String,
        
    },
     
});

module.exports = { Category};