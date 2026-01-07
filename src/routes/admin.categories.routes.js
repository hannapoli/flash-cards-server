const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { checkAdmin } = require('../middlewares/check.role.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { getAllCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById } = require('../controllers/admin.categories.controller');

// Ver la lista de todas las categorías del idioma:
router.get('/category/getall/:language_id', [
    verifyToken,
    getFullUserData,
    checkAdmin
], getAllCategories);

// Ver la información de una categoría encontrada por su ID:
router.get('/category/get/:id', [
    param('id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], getCategoryById);

// Crear una categoría nueva:
router.post('/category/create', [
    check('category')
        .notEmpty().withMessage("Escriba la categoría").bail()
        .trim()
        .isString().withMessage("Escriba un nombre de categoría válido")
        .isLength({ min: 2, max: 50 }).withMessage("Escriba un nombre de categoría válido")
        //Cualquier letra que empiece por mayúscula (Unicode)
        .matches(/^\p{Lu}[\p{L}\p{S}\p{P}\s]*$/u).withMessage("Escriba un nombre de categoría válido, empezando por mayúscula"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], createCategory);

// Modificar la información de una categoría encontrada por su ID:
router.put('/category/edit/:id', [
    param('id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    check('category')
        .notEmpty().withMessage("Escriba la categoría").bail()
        .trim()
        .isString().withMessage("Escriba un nombre de categoría válido")
        .isLength({ min: 2, max: 50 }).withMessage("Escriba un nombre de categoría válido")
        .matches(/^\p{Lu}[\p{L}\p{S}\p{P}\s]*$/u).withMessage("Escriba un nombre de categoría válido, empezando por mayúscula"),
    check('language_id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], updateCategoryById);

// Eliminar la categoría encontrada por su ID:
router.delete('/category/delete/:id', [
    param('id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], deleteCategoryById);

module.exports = router;