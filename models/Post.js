const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    Text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            
        }
    }],
    Comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        Text: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Post =mongoose.model('post', postSchema);