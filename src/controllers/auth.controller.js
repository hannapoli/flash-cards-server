const { admin } = require('../configs/firebaseAdmin');
const { addUser, findUserByEmail } = require('../models/auth.model');

const registerUser = async (req, res) => {
    const { uid, name, email, role = 'user' } = req.body;
    if (!uid) {
        return res.status(400).json({
            ok: false,
            message: "Falta Firebase uid"
        });
    }
    try {
        const userExists = await findUserByEmail(email);

        if (userExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: el usuario con este correo electrónico ya está registrado.'
            });
        }
        //Añadimos el usuario a la base de datos de Firestore
        await admin.firestore().collection('users').doc(uid).set({
            uid: uid,
            email: email,
            name: name,
            createdAt: new Date().toISOString()
        });
        //Añadimos el usuario a la base de datos PostgreSQL
        const newUser = await addUser(uid, email, name, role);
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
    return res.status(200).json({
        ok: true,
        name: req.user.name,
        role: req.user.role
    });
};

module.exports = {
    registerUser,
    getRole
};