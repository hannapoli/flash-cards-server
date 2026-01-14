const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { registerUser, getRole } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     description: Crea un nuevo usuario en PostgreSQL y Firestore después de que Firebase Authentication lo haya creado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - email
 *               - name
 *             properties:
 *               uid:
 *                 type: string
 *                 description: UID del usuario en Firebase Authentication
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 description: Nombre del usuario
 *             example:
 *               uid: "firebase_uid_123"
 *               email: "usuario@example.com"
 *               name: "Juan Pérez"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado correctamente"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 */
router.post('/register', [
    //la validación del email y la contraseña se hace en Firebase
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    validateInput
], registerUser);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener datos del usuario autenticado
 *     tags: [Autenticación]
 *     description: Devuelve el nombre y rol del usuario autenticado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 name:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 role:
 *                   type: string
 *                   enum: [user, admin]
 *                   example: "user"
 *       401:
 *         description: Token inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/me', [verifyToken, getFullUserData], getRole);

module.exports = router;