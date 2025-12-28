const { addUser, findUserByEmail, findUserByUid } = require('../models/auth.model');

const registerUser = async (req, res) => {
    //uid (Firebase) y email del token verificado
    const { uid, email } = req.user;
    const { name } = req.body;
    try {
        const userExists = await findUserByEmail(email);

        if (userExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: el usuario con este correo electrónico ya está registrado.'
            });
        }
        const newUser = await addUser(uid, email, name);
        return res.status(201).json({
            ok: true,
            message: 'Usuario registrado correctamente.',
            user: newUser
        });
    } catch (error) {
        console.error('Error en registerUser:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
}

const getRole = async (req, res) => {
    const { uid } = req.user;
    try {
        const users = await findUserByUid(uid);
        if (users.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado.'
            });
        }
        const user = users[0];
        return res.status(200).json({
            ok: true,
            name: user.name,
            role: user.role
        });
    } catch (error) {
        console.error('Error en getRole:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
}

module.exports = {
    registerUser,
    getRole
};