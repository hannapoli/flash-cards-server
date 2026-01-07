const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { registerUser, getRole } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');

//Registrar un usuario:
router.post('/register', [
    //la validación del email y la contraseña se hace en Firebase
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    validateInput
], registerUser);

//Recibir el nombre y el rol del usuario
router.get('/me', [verifyToken, getFullUserData], getRole);

module.exports = router;