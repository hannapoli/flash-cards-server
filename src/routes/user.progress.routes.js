const express = require('express');
const router = express.Router();
const { param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { checkUser } = require('../middlewares/check.role.middleware');
const { getLanguageProgress, getProgressInAllUserCategories, getProgressInOneUserCategory, getProgressInAllUserLanguages } = require('../controllers/user.progress.controller');

// Obtener el progreso del usuario en una categoría específica:
router.get('/progress/categories/:category_id', [
    param('category_id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getProgressInOneUserCategory);

// Obtener el progreso del usuario en todas las categorías de un idioma:
router.get('/progress/languages/:language_id/categories', [
    param('language_id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getProgressInAllUserCategories);

// Obtener el progreso del usuario en un idioma:
router.get('/progress/languages/:language_id', [
    param('language_id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getLanguageProgress);

// Obtener el progreso del usuario en todos los idiomas:
router.get('/progress/languages', [
    verifyToken,
    getFullUserData,
    checkUser
], getProgressInAllUserLanguages);

module.exports = router;