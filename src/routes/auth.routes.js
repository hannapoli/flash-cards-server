const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateInput } = require('../middlewares/validateInput');
const { registerUser, getRole } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/verifyToken');

//Registrar un usuario:
router.post('/register', [
    verifyToken,
    //la validación del email se hace en Firebase
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    validateInput
], registerUser);

//Recibir el nombre y el rol del usuario
router.get('/me', verifyToken, getRole);

module.exports = router;