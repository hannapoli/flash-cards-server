const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateInput } = require('../middlewares/validateInput');
const { checkAdmin } = require('../middlewares/checkRole');
const { verifyToken } = require('../middlewares/verifyToken');
const { getFullUserData } = require('../middlewares/getFullUserData');
const { getUserByID, createUser, editUserByID, deleteUserByID } = require('../controllers/admin.users.controller');

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
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("role")
        .trim()
        .isIn(["admin", "user"]).withMessage("El rol debe ser 'admin' o 'user'."),
    validateInput,
    verifyToken,
    getFullUserData,
    checkAdmin
], editUserByID);

// Eliminar el usuario encontrado por su ID:
router.delete('/users/delete/:id', [
    verifyToken,
    getFullUserData,
    checkAdmin
], deleteUserByID);

module.exports = router;