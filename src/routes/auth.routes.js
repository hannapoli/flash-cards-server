const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateInput } = require('../middlewares/validateInput');
const { registerUser, loginUser } = require('../controllers/auth.controller');

//Registrar un usuario:
router.post('/register', [
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido"),
    validateInput
], registerUser);

//Iniciar sesión de un usuario:
router.post('/login', [
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Escriba un correo electrónico válido.").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Escriba un email válido válido"),
        validateInput
], loginUser);

module.exports = router;