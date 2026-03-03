const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { checkAdmin } = require('../middlewares/check.role.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { getAllLanguages, getLangById, createLanguage, updateLangById, deleteLangById } = require('../controllers/admin.lang.controller');

// Ver la lista de todos los idiomas:
router.get('/languages', [
    verifyToken,
    getFullUserData,
    checkAdmin
], getAllLanguages);

// Ver la información de un idioma encontrado por su ID:
router.get('/languages/:id', [
    param('id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], getLangById);

// Crear un idioma nuevo:
router.post('/languages', [
    check('language')
        .notEmpty().withMessage("Escriba el idioma").bail()
        .trim()
        .isString().withMessage("Escriba un nombre de idioma válido")
        .isLength({ min: 2, max: 50 }).withMessage("Escriba un nombre de idioma válido")
        //Cualquier letra que empiece por mayúscula y siga con minúsculas (Unicode)
        .matches(/^\p{Lu}\p{Ll}+$/u).withMessage("Escriba un nombre de idioma válido, empezando por mayúscula"),
    check('code')
        .notEmpty().withMessage("Escriba el código del idioma").bail()
        .trim()
        .isString().withMessage("Escriba un código de idioma válido")
        .isLength({ min: 2, max: 2 }).withMessage("Escriba un código de idioma válido de 2 caracteres")
        .matches(/^[a-z]{2}$/).withMessage("Escriba un código de idioma válido de 2 caracteres en minúscula"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], createLanguage);

// Modificar la información de un idioma encontrado por su ID:
router.put('/languages/:id', [
    param('id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    check('language')
        .notEmpty().withMessage("Escriba el idioma").bail()
        .trim()
        .isString().withMessage("Escriba un nombre de idioma válido")
        .isLength({ min: 2, max: 50 }).withMessage("Escriba un nombre de idioma válido")
        .matches(/^\p{Lu}\p{Ll}+$/u).withMessage("Escriba un nombre de idioma válido, empezando por mayúscula"),
    check('code')
        .notEmpty().withMessage("Escriba el código del idioma").bail()
        .trim()
        .isString().withMessage("Escriba un código de idioma válido")
        .isLength({ min: 2, max: 2 }).withMessage("Escriba un código de idioma válido de 2 caracteres"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], updateLangById);

// Eliminar el idioma encontrado por su ID:
router.delete('/languages/:id', [
    param('id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], deleteLangById);

module.exports = router;