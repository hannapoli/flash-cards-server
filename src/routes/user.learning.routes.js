const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { checkUser } = require('../middlewares/check.role.middleware');
const { getUserLanguages, getAvailableLanguages, getUserCategories, getAvailableCategories, getAllWordsOfCategoryByUserId, getWordCardByUserId, addWordToCollection, deleteWordFromCollection, markWordAsLearned } = require('../controllers/user.learning.controller');

// Obtener los idiomas que el usuario está aprendiendo:
router.get('/languages', [
    verifyToken,
    getFullUserData,
    checkUser
], getUserLanguages);

// Obtener los idiomas disponibles para que el usuario pueda añadirlos:
router.get('/languages/available', [
    verifyToken,
    getFullUserData,
    checkUser
], getAvailableLanguages);

// Obtener las categorías que el usuario está aprendiendo:
router.get('/languages/:language_id/categories', [
    param('language_id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getUserCategories);

// Obtener las categorías disponibles para que el usuario pueda añadirlas:
router.get('/languages/:language_id/categories/available', [
    param('language_id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getAvailableCategories);

// Obtener todas las palabras de una categoría del el usuario:
router.get('/categories/:category_id/words', [
    param('category_id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getAllWordsOfCategoryByUserId);

// Obtener la tarjeta de una palabra del usuario:
router.get('/words/:word_id/card', [
    param('word_id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getWordCardByUserId);

// Añadir una palabra a la colección del usuario:
router.post('/words', [
    check('word_id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], addWordToCollection);

// Eliminar una palabra de la colección del usuario:
router.delete('/words/:word_id', [
    param('word_id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], deleteWordFromCollection);

// Marcar una palabra como aprendida (cambiar su estado):
router.patch('/words/:word_id/learned', [
    param('word_id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], markWordAsLearned);

module.exports = router;