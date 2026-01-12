const pool = require('../configs/dbConnect');
const { queriesUserLanguages, queriesUserCategories, queriesUserWords } = require('./user.queries');

const findUserLanguagesByUserId = async (userId) => {
    try {
        const result = await pool.query(queriesUserLanguages.findUserLanguagesByUserId, [userId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findUserLanguagesByUserId:', error);
        throw error;
    }
};

const findAvailableLanguagesByUserId = async (userId) => {
    try {
        const result = await pool.query(queriesUserLanguages.findAvailableLanguagesByUserId, [userId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findAvailableLanguagesByUserId:', error);
        throw error;
    }
};

const findUserCategoriesByUserId = async (userId, languageId) => {
    try {
        const result = await pool.query(queriesUserCategories.findUserCategoriesByUserId, [userId, languageId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findUserCategoriesByUserId:', error);
        throw error;
    }
};

const findAvailableCategoriesByUserId = async (userId, languageId) => {
    try {
        const result = await pool.query(queriesUserCategories.findAvailableCategoriesByUserId, [userId, languageId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findAvailableCategoriesByUserId:', error);
        throw error;
    }
};

const findAllWordsOfCategoryByUserId = async (userId, categoryId) => {
    try {
        const result = await pool.query(queriesUserWords.findAllWordsOfCategoryByUserId, [userId, categoryId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findAllWordsOfCategoryByUserId:', error);
        throw error;
    }
};

const findWordCardByUserId = async (userId, wordId) => {
    try {
        const result = await pool.query(queriesUserWords.findWordCardByUserId, [userId, wordId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error en findWordCardByUserId:', error);
        throw error;
    }
};

const saveWordToCollection = async (userId, wordId) => {
    try {
        const result = await pool.query(queriesUserWords.saveWordToCollection, [userId, wordId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en saveWordToCollection:', error);
        throw error;
    }
};

const removeUserWordById = async (userId, wordId) => {
    try {
        const result = await pool.query(queriesUserWords.removeUserWordById, [userId, wordId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en removeUserWordById:', error);
        throw error;
    }
};

const changeWordStatusToLearned = async (userId, wordId) => {
    try {
        const result = await pool.query(queriesUserWords.changeWordStatusToLearned, [userId, wordId]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error en changeWordStatusToLearned:', error);
        throw error;
    }
};

module.exports = {
    findUserLanguagesByUserId,
    findAvailableLanguagesByUserId,
    findUserCategoriesByUserId,
    findAvailableCategoriesByUserId,
    findAllWordsOfCategoryByUserId,
    findWordCardByUserId,
    saveWordToCollection,
    removeUserWordById,
    changeWordStatusToLearned
};