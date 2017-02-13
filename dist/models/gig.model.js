'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GigSchema = new Schema({
    title: {
        type: String,
        required: 'Enter gig title'
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        required: 'Describe what you have to offer in details'
    },
    duration: {
        type: Number,
        min: 1,
        required: 'Enter how long this will take you'
    },
    addedBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    imageUrl: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    address: {
        type: String
    }
}, {
    timeStamps: true
});

mongoose.model("Gig", GigSchema);
//# sourceMappingURL=gig.model.js.map