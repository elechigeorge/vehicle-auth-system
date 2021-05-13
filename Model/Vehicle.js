const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp')


const VehicleSchema = new mongoose.Schema({
    plate_number: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    broad_class: {
        type: String
    },

    images: {
        type: String
    },
    owner_information: {
        name: {
            type: String,
            required: true

        },
        address: {
            type: String,
            required: true
        }
    }
});

VehicleSchema.plugin(timestamp);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = Vehicle;