const { validationResult } = require('express-validator');

//Enseña los primeros errores de validación encontrados
const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = Object.values(errors.mapped())[0].msg;
        return res.status(400).json({
            ok: false,
            message: firstError
        });
    };
    next();
};
//Enseña todos los errores de validación
/* const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = Object.values(errors.mapped())
            .map(err => err.msg)
            .join('|');
        return res.status(400).json({
            ok: false,
            message
        });
    };
    next();
}; */

module.exports = {
    validateInput
};