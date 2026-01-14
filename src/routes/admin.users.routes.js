const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { checkAdmin } = require('../middlewares/check.role.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { getAllUsers, getUserByID, createUser, editUserByID, deleteUserByID } = require('../controllers/admin.users.controller');

/**
 * @swagger
 * /admin/users/getall:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Admin - Usuarios]
 *     description: Devuelve la lista completa de usuarios registrados (solo administradores)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - No es administrador
 */
router.get('/users/getall', [
    verifyToken,
    getFullUserData,
    checkAdmin
], getAllUsers);

/**
 * @swagger
 * /admin/users/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Admin - Usuarios]
 *     description: Crea un usuario en Firebase, Firestore y PostgreSQL (solo administradores)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *             example:
 *               email: "nuevo@example.com"
 *               password: "password123"
 *               name: "Usuario Nuevo"
 *               role: "user"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Validación fallida
 *       403:
 *         description: No es administrador
 */
router.post('/users/create', [
    //la validación del email y la contraseña se hace en Firebase
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("role")
        .notEmpty().withMessage("Escriba el rol").bail()
        .trim()
        .isIn(["admin", "user"]).withMessage("El rol debe ser 'admin' o 'user'."),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], createUser);

// Modificar la información de un usuario encontrado por su ID:
router.put('/users/edit/:id', [
    //la validación del email y la contraseña se hace en Firebase
    param('id')
        .notEmpty().withMessage('El UID es obligatorio')
        .isLength({ min: 20 }).withMessage('El UID debe tener por lo menos 20 caracteres')
        .matches(/^[A-Za-z0-9\-_]+$/).withMessage('El UID solo puede contener letras, números, guiones y guiones bajos'),
    validateInput,
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("role")
        .notEmpty().withMessage("Escriba el rol").bail()
        .trim()
        .isIn(["admin", "user"]).withMessage("El rol debe ser 'admin' o 'user'."),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], editUserByID);

// Eliminar el usuario encontrado por su ID:
router.delete('/users/delete/:id', [
    param('id')
        .notEmpty().withMessage('El UID es obligatorio')
        .isLength({ min: 20 }).withMessage('El UID debe tener por lo menos 20 caracteres')
        .matches(/^[A-Za-z0-9\-_]+$/).withMessage('El UID solo puede contener letras, números, guiones y guiones bajos'),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], deleteUserByID);

module.exports = router;