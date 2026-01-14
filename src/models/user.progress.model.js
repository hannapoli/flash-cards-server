const pool = require('../configs/dbConnect');
const { queriesUserProgress } = require('./user.progress.queries');

const checkProgressInOneUserCategory = async (userId, categoryId) => {
    try {
        const result = await pool.query(queriesUserProgress.checkProgressInOneUserCategory, [userId, categoryId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error en checkProgressInOneUserCategory:', error);
        throw error;
    }
};

const checkProgressInAllUserCategories = async (userId, languageId) => {
    try {
        const result = await pool.query(queriesUserProgress.checkProgressInAllUserCategories, [userId, languageId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en checkProgressInAllUserCategories:', error);
        throw error;
    }
};

const checkProgressInAllCategoriesOfALanguage = async (userId, languageId) => {
    try {
        const result = await pool.query(queriesUserProgress.checkProgressInAllCategoriesOfALanguage, [userId, languageId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error en checkProgressInAllCategoriesOfALanguage:', error);
        throw error;
    }
};

const checkProgressInAllUserLanguages = async (userId) => {
    try {
        const result = await pool.query(queriesUserProgress.checkProgressInAllUserLanguages, [userId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en checkProgressInAllUserLanguages:', error);
        throw error;
    }
};

module.exports = {
    checkProgressInOneUserCategory,
    checkProgressInAllUserCategories,
    checkProgressInAllCategoriesOfALanguage,
    checkProgressInAllUserLanguages
};