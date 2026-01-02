const { admin } = require('../configs/firebaseAdmin');
const { getFirestore } = require('firebase-admin/firestore');
const { findUserByUid, modifyUserByUid, removeUserByUid } = require('../models/admin.users.model');
const { addUser, findUserByEmail } = require("../models/auth.model");

const getUserByID = async (req, res) => {
    const { id } = req.params;
    try {
        const userFound = await findUserByUid(id);
        if (!userFound) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            user: userFound
        });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor al obtener el usuario.'
        });
    }
};

const createUser = async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    try {
        const userExists = await findUserByEmail(email);

        if (userExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: el usuario con este correo electrónico ya está registrado.'
            });
        }

        //Creamos el usuario en Firebase Auth
        const firebaseUser = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: name
        });

        //Añadimos el usuario a la base de datos de Firestore
        await admin.firestore().collection('users').doc(firebaseUser.uid).set({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            createdAt: new Date().toISOString()
        });
        //Añadimos el usuario a la base de datos PostgreSQL
        const newUser = await addUser(firebaseUser.uid, email, name, role);
        return res.status(201).json({
            ok: true,
            message: 'Usuario creado correctamente.',
            user: newUser
        });
    } catch (error) {
        console.error('Error en createUser:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
}

const editUserByID = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    // console.log(id, name, email, role);
    try {
        //Modificamos el usuario en Firebase Auth
        await admin.auth().updateUser(id, {
            email: email,
            displayName: name
        });

        //Modificamos el usuario a la base de datos de Firestore
        await admin.firestore().collection('users').doc(id).update({
            email: email,
            name: name
        });
        //Modificamos el usuario a la base de datos PostgreSQL
        const updatedUser = await modifyUserByUid(id, name, email, role);
        if (!updatedUser) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Usuario actualizado correctamente.',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor al actualizar el usuario.'
        });
    }
};

const deleteUserByID = async (req, res) => {
    const { id } = req.params;
    try {
        // Eliminamos el usuario de Firebase Authentication
        await admin.auth().deleteUser(id);

        // Eliminamos el documento del usuario de Firestore (si existe)
        const db = getFirestore();
        await db.collection('users').doc(id).delete();

        // Eliminamos el usuario de PostgreSQL
        const deletedUser = await removeUserByUid(id);
        if (!deletedUser) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Usuario eliminado correctamente.'
        });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor al eliminar el usuario.'
        });
    }
};

module.exports = {
    getUserByID,
    createUser,
    editUserByID,
    deleteUserByID
};