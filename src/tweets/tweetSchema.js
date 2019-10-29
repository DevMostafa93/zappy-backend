const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    screen_name: {
        type: String,
        required: true
    }
});

const TweetSchema = mongoose.model('tweets', new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: userSchema
}));

exports.TweetSchema = TweetSchema;