const pool = require('../configs/dbConnect');
const { queriesAdminLanguages } = require('./admin.queries');

const findAllLanguages = async () => {
    try {
        const result = await pool.query(queriesAdminLanguages.findAllLanguages);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findAllLanguages:', error);
        throw error;
    }
};

const findLanguageByID = async (languageId) => {
    try {
        const result = await pool.query(queriesAdminLanguages.findLanguageByID, [languageId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en findLanguageByID:', error);
        throw error;
    }
};

const findLangByNameOrCode = async (language, code) => {
    try {
        const result = await pool.query(queriesAdminLanguages.findLangByNameOrCode, [language, code]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findLangByNameOrCode:', error);
        throw error;
    }
};

const addLanguage = async (language, code) => {
    try {
        const result = await pool.query(queriesAdminLanguages.addLanguage, [language, code]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error en addLanguage:', error);
        throw error;
    }
};

const modifyLanguageByID = async (languageId, language, code) => {
    try {
        const result = await pool.query(queriesAdminLanguages.modifyLanguageByID, [language, code, languageId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en modifyLanguageByID:', error);
        throw error;
    }
};

const removeLanguageByID = async (languageId) => {
    try {
        const result = await pool.query(queriesAdminLanguages.removeLanguageByID, [languageId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en removeLanguageByID:', error);
        throw error;
    }
};

module.exports = {
    findAllLanguages,
    findLanguageByID,
    findLangByNameOrCode,
    addLanguage,
    modifyLanguageByID,
    removeLanguageByID
};