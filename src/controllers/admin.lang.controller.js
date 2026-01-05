const {findAllLanguages, findLanguageByID, findLangByNameOrCode, addLanguage, modifyLanguageByID, removeLanguageByID} = require('../models/admin.lang.model');

const getAllLanguages = async (req, res) => {
    try {
        const languages = await findAllLanguages();
        return res.status(200).json({
            ok: true,
            languages: languages
        });
    } catch (error) {
        console.error('Error en getAllLanguages:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getLangById = async (req, res) => {
    const { id } = req.params;
    try {
        const languageFound = await findLanguageByID(id);
        if (!languageFound) {
            return res.status(404).json({
                ok: false,
                message: 'Idioma no encontrado. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            language: languageFound
        });
    } catch (error) {
        console.error('Error en getLangById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const createLanguage = async (req, res) => {
    const { language, code } = req.body;
    try {
        const languageExists = await findLangByNameOrCode(language, code);
        if (languageExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: el idioma o el código de idioma ya están registrados.'
            });
        }
        const newLanguage = await addLanguage(language, code);
        return res.status(201).json({
            ok: true,
            message: 'Idioma creado correctamente.',
            language: newLanguage
        });
    } catch (error) {
        console.error('Error en createLanguage:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const updateLangById = async (req, res) => {
    const { id } = req.params;
    const { language, code } = req.body;
    // console.log(id, language, code);
    try {
        const languageExists = await findLangByNameOrCode(language, code);
        if (languageExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: el idioma o el código de idioma ya están registrados.'
            });
        }
        const updatedLanguage = await modifyLanguageByID(id, language, code);
        return res.status(200).json({
            ok: true,
            message: 'Idioma actualizado correctamente.',
            language: updatedLanguage
        });
    } catch (error) {
        console.error('Error en updateLangById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const deleteLangById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLanguage = await removeLanguageByID(id);
        if (!deletedLanguage) {
            return res.status(404).json({
                ok: false,
                message: 'Idioma no encontrado. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Idioma eliminado correctamente.',
            language: deletedLanguage
        });
    } catch (error) {
        console.error('Error en deleteLangById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

module.exports = {
    getAllLanguages,
    getLangById,
    createLanguage,
    updateLangById,
    deleteLangById
};