const { admin } = require('../configs/firebaseAdmin');

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición."
        });
    }

    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición."
        });
    };
    try {

        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken;

        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(403).json({
            ok: false,
            msg: "Token no válido o caducado."
        });
    }
}

module.exports = { verifyToken };