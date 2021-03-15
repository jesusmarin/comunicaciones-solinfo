const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    created:  { 
        type: Date,
        default: Date.now
    },
    isEnabled: {
        type: Boolean,
        trim: true,
    },
    usuario:{
        name:{
            type:String,
            trim: true,        
        },
        address:{
            type:String,
            trim: true,        
        },
        phone:{
            type:String,
            trim: true,        
        },    
        geo:{
            type:String,
            trim: true,        
        },
        observation:{
            type:String,
            trim: true,        
        }
    }    

});

module.exports = mongoose.model('User', userSchema);