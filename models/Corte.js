const mongoose = require('mongoose');

const CorteSchema = mongoose.Schema({
    ordenes: {
        type: Array,
        required: true
    },
    creado: {
        type: Date,
        default: new Date()
    },
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Corte', CorteSchema);