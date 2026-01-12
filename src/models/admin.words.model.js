const pool = require('../configs/dbConnect');
const { queriesAdminWords } = require('./admin.queries');
const { queriesUploads } = require('./admin.queries');

const findAllWords = async (categoryId) => {
    try {
        const result = await pool.query(queriesAdminWords.findAllWords, [categoryId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findAllWords:', error);
        throw error;
    }
};

const findWordByID = async (wordId) => {
    try {
        const result = await pool.query(queriesAdminWords.findWordByID, [wordId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en findWordByID:', error);
        throw error;
    }
};

const findWordByName = async (word) => {
    try {
        const result = await pool.query(queriesAdminWords.findWordByName, [word]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en findWordByName:', error);
        throw error;
    }
}

const saveImageMetadata = async (filename, originalname, mimetype, size) => {
    try {
        const result = await pool.query(queriesUploads.saveImageMetadata, [filename, originalname, mimetype, size]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en saveImageMetadata:', error);
        throw error;
    }
};

const addWord = async (word, definition, transcription, example, categoryId, imageId) => {
    try {
        const result = await pool.query(queriesAdminWords.addWord, [word, definition, transcription, example, categoryId, imageId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en addWord:', error);
        throw error;
    }
};

const modifyWordByID = async (word, definition, transcription, example, categoryId, imageId, wordId) => {
    try {
        const result = await pool.query(queriesAdminWords.modifyWordByID, [word, definition, transcription, example, categoryId, imageId, wordId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en modifyWordByID:', error);
        throw error;
    }
};

const removeImageByID = async (imageId) => {
    try {
        const result = await pool.query(queriesUploads.removeImageByID, [imageId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en deleteImageByID:', error);
        throw error;
    }
};

const removeWordByID = async (wordId) => {
    try {
        const result = await pool.query(queriesAdminWords.removeWordByID, [wordId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en removeWordByID:', error);
        throw error;
    }
};

module.exports = {
    findAllWords,
    findWordByID,
    findWordByName,
    saveImageMetadata,
    addWord,
    modifyWordByID,
    removeImageByID,
    removeWordByID
};