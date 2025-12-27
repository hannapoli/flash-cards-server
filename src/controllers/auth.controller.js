const { addUser, findUserByEmail } = require('../models/auth.model');

const registerUser = async (req, res) => {
    const { firebaseUid, email, name } = req.body;
    try {
        const userExists = await findUserByEmail(email);
        console.log({ userExists });

        if (userExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: el usuario ya está registrado.'
            });
        }
        const newUser = await addUser(firebaseUid, email, name);
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

const loginUser = async (req, res) => {
    // Lógica para iniciar sesión de usuario
}   

module.exports = {
    registerUser,
    loginUser
};