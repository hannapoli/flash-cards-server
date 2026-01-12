const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const { validateInput } = require('../middlewares/validate.input.middleware');
const { checkAdmin } = require('../middlewares/check.role.middleware');
const { verifyToken } = require('../middlewares/verify.token.middleware');
const { getFullUserData } = require('../middlewares/user.data.middleware');
const { getAllUsers, getUserByID, createUser, editUserByID, deleteUserByID } = require('../controllers/admin.users.controller');

//Ver la lista de todos los usuarios:
router.get('/users/getall', [
    verifyToken,
    getFullUserData,
    checkAdmin
], getAllUsers);

// Ver la información de un usuario encontrado por su ID:
router.get('/users/get/:id', [
    verifyToken,
    getFullUserData,
    checkAdmin
], getUserByID);

// Crear un usuario nuevo:
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