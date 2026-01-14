const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { checkUser } = require('../middlewares/check.role.middleware');
const { getUserLanguages, getAvailableLanguages, getUserCategories, getAvailableCategories, getAllWordsOfCategoryByUserId, getWordCardByUserId, addWordToCollection, deleteWordFromCollection, markWordAsLearned } = require('../controllers/user.learning.controller');

/**
 * @swagger
 * /user/languages:
 *   get:
 *     summary: Obtener idiomas del usuario
 *     tags: [Usuario - Aprendizaje]
 *     description: Devuelve los idiomas que el usuario está aprendiendo (que tienen palabras en su colección)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de idiomas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 userLanguages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Language'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/languages', [
    verifyToken,
    getFullUserData,
    checkUser
], getUserLanguages);

/**
 * @swagger
 * /user/languages/available:
 *   get:
 *     summary: Obtener idiomas disponibles
 *     tags: [Usuario - Aprendizaje]
 *     description: Devuelve los idiomas que el usuario aún no ha empezado a estudiar
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de idiomas disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 availableLanguages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Language'
 */
router.get('/languages/available', [
    verifyToken,
    getFullUserData,
    checkUser
], getAvailableLanguages);

/**
 * @swagger
 * /user/languages/{language_id}/categories:
 *   get:
 *     summary: Obtener categorías del usuario en un idioma
 *     tags: [Usuario - Aprendizaje]
 *     description: Devuelve las categorías que el usuario está estudiando en un idioma específico
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
 *         description: Lista de categorías del usuario
 *       400:
 *         description: ID de idioma inválido
 *       401:
 *         description: No autorizado
 */
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

/**
 * @swagger
 * /user/categories/{category_id}/words:
 *   get:
 *     summary: Obtener palabras de una categoría
 *     tags: [Usuario - Aprendizaje]
 *     description: Devuelve todas las palabras de una categoría, mostrando cuáles están en la colección del usuario y su estado
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
 *         description: Lista de palabras con su estado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 words:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Word'
 */
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

/**
 * @swagger
 * /user/words:
 *   post:
 *     summary: Añadir palabra a la colección
 *     tags: [Usuario - Aprendizaje]
 *     description: Añade una palabra a la colección personal del usuario con estado 'saved'
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - word_id
 *             properties:
 *               word_id:
 *                 type: integer
 *                 description: ID de la palabra a añadir
 *             example:
 *               word_id: 5
 *     responses:
 *       201:
 *         description: Palabra añadida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Palabra añadida a la colección."
 *       400:
 *         description: Validación fallida
 *       404:
 *         description: Palabra no encontrada
 */
router.post('/words', [
    check('word_id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], addWordToCollection);

/**
 * @swagger
 * /user/words/{word_id}:
 *   delete:
 *     summary: Eliminar palabra de la colección
 *     tags: [Usuario - Aprendizaje]
 *     description: Elimina una palabra de la colección personal del usuario
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: word_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la palabra a eliminar
 *     responses:
 *       200:
 *         description: Palabra eliminada exitosamente
 *       404:
 *         description: Palabra no encontrada en la colección
 */
router.delete('/words/:word_id', [
    param('word_id')
        .notEmpty().withMessage("El ID de la palabra es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El ID de la palabra debe ser un número entero positivo"),
    validateInput,
    verifyToken,
    getFullUserData,
    checkUser
], deleteWordFromCollection);

/**
 * @swagger
 * /user/words/{word_id}/learned:
 *   patch:
 *     summary: Marcar palabra como aprendida
 *     tags: [Usuario - Aprendizaje]
 *     description: Cambia el estado de una palabra de 'saved' a 'learned'
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: word_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la palabra
 *     responses:
 *       200:
 *         description: Palabra marcada como aprendida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Palabra marcada como aprendida."
 */
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
