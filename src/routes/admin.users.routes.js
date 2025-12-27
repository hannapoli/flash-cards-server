const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
//middleware validateInput
//middleware autAdmin 
//middleware verifyToken?
// controllers: allUsers, getUser, createUser, editUser, deleteUser

// Ver todos los usuarios:
// router.get('/users/getall');

// Ver la información de un usuario encontrado por su ID:
// router.get('/users/get/:id');

// Crear un usuario nuevo:
// router.post('/users/create');

// Modificar la información de un usuario encontrado por su ID:
// router.put('/users/edit/:id');

// Eliminar el usuario encontrado por su ID:
// router.delete('/users/delete/:id');

module.exports = router;