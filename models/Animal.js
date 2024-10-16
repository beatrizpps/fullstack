const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['cachorro', 'gato', 'outro'],
        required: true
    },
    furColor: {
        type: String,
        required: true
    },
    condominium: { 
        type: String,
        required: true
    },
    block: { 
        type: String,
        required: true
    },
    apartment: { 
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    neutered: { 
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Animal', animalSchema);
