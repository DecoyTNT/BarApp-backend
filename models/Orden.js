const mongoose = require('mongoose');

const OrdenSchema = mongoose.Schema({
    bebidas: {
        type: Array,
        required: true
    },
    cliente: {
        type: String,
        required: true,
        trim: true
    },
    total: {
        type: Number,
        required: true
    },
    completada: {
        type: Boolean,
        default: false
    },
    proceso: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Ordenes', OrdenSchema);