const { validationResult } = require('express-validator')
const Vehicle = require('../Model/Vehicle');


const registerVehicle = async (req, res) => {

    // create error boundaries
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // register new vehicle
        const vehicle = new Vehicle({
            plate_number: req.body.plate_number,
            mode: 'sample data',
            color: "sample data",
            brand: "sample data",
            category: "sample data",
            broad_class: "sample data",
            images: '/images/sample.png',
            owner_information: {
                name: "sample data",
                address: "sample data"
            }

        })




        // register vehicle 
        await vehicle.save();

        res.status(201).json(vehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: "Server error" }] })
    }

}


// get 
const getVehicleByNumber = async (req, res) => {

    // grab user data
    const { plate_number } = req.body;

    try {
        // get vehicle by number
        let vehicle = await Vehicle.findOne({ plate_number: new RegExp('^' + plate_number + '$', "i") });

        if (vehicle) {
            // send response
            res.status(200).json(vehicle);
        }

    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Server Error' }] });
    }


}

const getVehicleById = async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id)

    if (vehicle) {
        res.status(200).json(vehicle)
    } else {
        res.status(404)
        throw new Error('Vehicle not found')
    }
}



const updateVehicle = async (req, res) => {

    const {
        plate_number,
        mode,
        color,
        brand,
        category,
        broad_class,
        images,
        name,
        address
    } = req.body

    try {
        const vehicle = await Vehicle.findById(req.params.id)

        if (vehicle) {
            vehicle.plate_number = plate_number
            vehicle.mode = mode
            vehicle.color = color
            vehicle.brand = brand
            vehicle.category = category
            vehicle.broad_class = broad_class
            vehicle.images = images
            vehicle.owner_information.name = name
            vehicle.owner_information.address = address

            const updatedVehicle = await vehicle.save()
            res.status(200).json(updatedVehicle)
        } else {
            res.status(404)
            throw new Error('Vehicle not found')
        }
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Server Error' }] });
    }


}


module.exports = {
    registerVehicle,
    getVehicleByNumber,
    updateVehicle,
    getVehicleById
}