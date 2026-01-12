const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { checkAdmin } = require('../middlewares/check.role.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { uploadSingleImg } = require('../middlewares/upload.middleware');
const { getAllWords, getWordyById, createWord, updateWordById, deleteWordById } = require('../controllers/admin.words.controller');

// Ver la lista de todas las palabras de la categoría:
router.get('/word/getall/:category_id', [
    verifyToken,
    getFullUserData,
    checkAdmin
], getAllWords);

// Ver la información de una palabra encontrada por su ID:
router.get('/word/get/:id', [
    param('id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], getWordyById);

// Crear una palabra nueva:
router.post('/word/create', [
    uploadSingleImg,
    check('word')
        .notEmpty().withMessage("Escriba la palabra").bail()
        .trim()
        .isString().withMessage("Escriba un nombre de palabra válido")
        .isLength({ min: 2, max: 50 }).withMessage("Escriba un nombre de palabra válido")
        //Cualquier letra que empiece por mayúscula (Unicode)
        .matches(/^\p{Lu}[\p{L}\p{S}\p{P}\s]*$/u).withMessage("Escriba un nombre de palabra válido, empezando por mayúscula"),
    check('definition')
        .trim()
        .isString().withMessage("Escriba una definición válida")
        .isLength({ max: 200 }).withMessage("Escriba una definición válida de hasta 200 caracteres"),
    check('transcription')
        .trim()
        .isString().withMessage("Escriba una transcripción válida")
        .isLength({ max: 100 }).withMessage("Escriba una transcripción válida de hasta 100 caracteres"),
    check('example')
        .trim()
        .isString().withMessage("Escriba un ejemplo válido")
        .isLength({ max: 200 }).withMessage("Escriba un ejemplo válido de hasta 200 caracteres"),
    check('category_id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], createWord);

// Modificar la información de una palabra encontrada por su ID:
router.put('/word/edit/:id', [
    uploadSingleImg,
    param('id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    check('word')
        .notEmpty().withMessage("Escriba la palabra").bail()
        .trim()
        .isString().withMessage("Escriba un nombre de palabra válido")
        .isLength({ min: 2, max: 50 }).withMessage("Escriba un nombre de palabra válido")
        .matches(/^\p{Lu}[\p{L}\p{S}\p{P}\s]*$/u).withMessage("Escriba un nombre de palabra válido, empezando por mayúscula"),
    check('definition')
        .trim()
        .isString().withMessage("Escriba una definición válida")
        .isLength({ max: 200 }).withMessage("Escriba una definición válida de hasta 200 caracteres"),
    check('transcription')
        .trim()
        .isString().withMessage("Escriba una transcripción válida")
        .isLength({ max: 100 }).withMessage("Escriba una transcripción válida de hasta 100 caracteres"),
    check('example')
        .trim()
        .isString().withMessage("Escriba un ejemplo válido")
        .isLength({ max: 200 }).withMessage("Escriba un ejemplo válido de hasta 200 caracteres"),
    check('category_id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], updateWordById);

// Eliminar la palabra encontrada por su ID:
router.delete('/word/delete/:id', [
    param('id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], deleteWordById);

module.exports = router;