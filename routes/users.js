const router = require('express').Router();
const { getUser, createUser, authUser } = require("../controllers/users");
const { check } = require('express-validator');
const authenticate = require('../middlewares/authenticate')


// users
router
    .route('/', check('username', 'Name is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 }))
    .post(createUser).get(authenticate, getUser);

router.route('/login').post(authUser);




module.exports = router;