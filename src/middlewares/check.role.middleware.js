const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            ok: false,
            message: 'Acceso denegado: esta ruta es solo para el rol de administrador.'
        });
    }
    next();
};

const checkUser = (req, res, next) => {
    if (req.user.role !== 'user' && req.user.role !== 'admin') {
        return res.status(403).json({
            ok: false,
            message: 'Acceso denegado: esta ruta es solo para el rol de usuario.'
        });
    }
    next();
};

module.exports = {
    checkAdmin,
    checkUser
};