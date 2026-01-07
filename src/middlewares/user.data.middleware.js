const { findUserByUid } = require('../models/admin.users.model');

const getFullUserData = async (req, res, next) => {
    try {
        const { uid } = req.user;
        const user = await findUserByUid(uid);
        // console.log(uid)

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado.'
            });
        }

        req.user = {
            ...req.user,
            id_user: user.id_user,
            name: user.name,
            role: user.role,
            ui_language_id: user.ui_language_id
        };

        next();
    } catch (error) {
        console.error('Error en getFullUserData:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

module.exports = { getFullUserData };
