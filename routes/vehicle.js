const router = require('express').Router();
const { check } = require('express-validator');
const authenticate = require('../middlewares/authenticate');
const { registerVehicle, getVehicleByNumber, getVehicleById, updateVehicle } = require('../controllers/vehicle')


// VEHICLE
router.route('/register').post(registerVehicle);

router.route('/verify').post(getVehicleByNumber)

router
    .route('/:id')
    .get(getVehicleById)
    .put(updateVehicle)





module.exports = router;