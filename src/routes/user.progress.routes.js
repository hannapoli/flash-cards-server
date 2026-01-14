const express = require('express');
const router = express.Router();
const { param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { checkUser } = require('../middlewares/check.role.middleware');
const { getLanguageProgress, getProgressInAllUserCategories, getProgressInOneUserCategory, getProgressInAllUserLanguages } = require('../controllers/user.progress.controller');

/**
 * @swagger
 * /user/progress/categories/{category_id}:
 *   get:
 *     summary: Obtener progreso en una categoría
 *     tags: [Usuario - Progreso]
 *     description: Devuelve el progreso del usuario en una categoría específica (total de palabras, aprendidas y porcentaje)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Progreso en la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 totalWords:
 *                   type: integer
 *                   description: Total de palabras en la colección del usuario
 *                 learnedWords:
 *                   type: integer
 *                   description: Palabras marcadas como aprendidas
 *                 progressPercentage:
 *                   type: integer
 *                   description: Porcentaje de progreso (0-100)
 *               example:
 *                 ok: true
 *                 totalWords: 20
 *                 learnedWords: 8
 *                 progressPercentage: 40
 */
router.get('/progress/categories/:category_id', [
    param('category_id')
        .notEmpty().withMessage("El ID de la categoría es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la categoría debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getProgressInOneUserCategory);

/**
 * @swagger
 * /user/progress/languages/{language_id}/categories:
 *   get:
 *     summary: Obtener progreso en todas las categorías de un idioma
 *     tags: [Usuario - Progreso]
 *     description: Devuelve el progreso del usuario en cada categoría de un idioma
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del idioma
 *     responses:
 *       200:
 *         description: Progreso por categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 progress:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_category:
 *                         type: integer
 *                       category:
 *                         type: string
 *                       totalWords:
 *                         type: integer
 *                       learnedWords:
 *                         type: integer
 *                       progressPercentage:
 *                         type: integer
 */
router.get('/progress/languages/:language_id/categories', [
    param('language_id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getProgressInAllUserCategories);

/**
 * @swagger
 * /user/progress/languages/{language_id}:
 *   get:
 *     summary: Obtener progreso en un idioma específico
 *     tags: [Usuario - Progreso]
 *     description: Devuelve el progreso global del usuario en un idioma (total de categorías y categorías completadas)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del idioma
 *     responses:
 *       200:
 *         description: Progreso en el idioma
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 totalCategories:
 *                   type: integer
 *                 learnedCategories:
 *                   type: integer
 *                 progressPercentage:
 *                   type: integer
 */
router.get('/progress/languages/:language_id', [
    param('language_id')
        .notEmpty().withMessage("El ID del idioma es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID del idioma debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], getLanguageProgress);

/**
 * @swagger
 * /user/progress/languages:
 *   get:
 *     summary: Obtener progreso en todos los idiomas
 *     tags: [Usuario - Progreso]
 *     description: Devuelve el progreso del usuario en todos los idiomas que está estudiando
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Progreso por idiomas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 progress:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_language:
 *                         type: integer
 *                       language:
 *                         type: string
 *                       totalWords:
 *                         type: integer
 *                       learnedWords:
 *                         type: integer
 *                       progressPercentage:
 *                         type: integer
 */
router.get('/progress/languages', [
    verifyToken,
    getFullUserData,
    checkUser
], getProgressInAllUserLanguages);

module.exports = router;
