require('dotenv').config();
const { findUserLanguagesByUserId, findAvailableLanguagesByUserId, findUserCategoriesByUserId, findAvailableCategoriesByUserId, findAllWordsOfCategoryByUserId, findWordCardByUserId, saveWordToCollection, removeUserWordById, changeWordStatusToLearned } = require('../models/user.learning.model');
const { findWordByID } = require('../models/admin.words.model');
const url = process.env.BACKEND_URL;

const getUserLanguages = async (req, res) => {
    const { id_user } = req.user;
    try {
        const languages = await findUserLanguagesByUserId(id_user);
        return res.status(200).json({
            ok: true,
            userLanguages: languages
        });
    } catch (error) {
        console.error('Error al obtener los idiomas del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getAvailableLanguages = async (req, res) => {
    const { id_user } = req.user;
    try {
        const languages = await findAvailableLanguagesByUserId(id_user);
        return res.status(200).json({
            ok: true,
            availableLanguages: languages
        });
    } catch (error) {
        console.error('Error al obtener los idiomas disponibles para el usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getUserCategories = async (req, res) => {
    const { id_user } = req.user;
    const { language_id } = req.params;
    try {
        const categories = await findUserCategoriesByUserId(id_user, language_id);
        return res.status(200).json({
            ok: true,
            userCategories: categories
        });
    } catch (error) {
        console.error('Error al obtener las categorías del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getAvailableCategories = async (req, res) => {
    const { id_user } = req.user;
    const { language_id } = req.params;

    try {
        const categories = await findAvailableCategoriesByUserId(id_user, language_id);
        return res.status(200).json({
            ok: true,
            availableCategories: categories
        });
    } catch (error) {
        console.error('Error al obtener las categorías disponibles para el usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getAllWordsOfCategoryByUserId = async (req, res) => {
    const { id_user } = req.user;
    const { category_id } = req.params;
    try {
        const words = await findAllWordsOfCategoryByUserId(id_user, category_id);
        // console.log(words);
        return res.status(200).json({
            ok: true,
            words: words
        });
    } catch (error) {
        console.error('Error al obtener las palabras de la categoría del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getWordCardByUserId = async (req, res) => {
    const { id_user } = req.user;
    // const { word_id } = req.params;
    const word_id = Number(req.params.word_id);

    console.log(typeof word_id, 'word_id getWordCardByUserId');
    try {
        const wordFound = await findWordByID(word_id);
        if (!wordFound) {
            return res.status(404).json({
                ok: false,
                message: 'Palabra no encontrada. Comprueba el ID.'
            });
        }
        const wordCard = await findWordCardByUserId(id_user, word_id);
        return res.status(200).json({
            ok: true,
            wordCard: wordCard,
            img_url: wordFound?.image_filename ? `${url}/uploads/words/${wordFound.image_filename}` : null
        });
    } catch (error) {
        console.error('Error al obtener la tarjeta de la palabra del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const addWordToCollection = async (req, res) => {
    const { id_user } = req.user;
    const { word_id } = req.body;
    try {
        const wordFound = await findWordByID(word_id);
        if (!wordFound) {
            return res.status(404).json({
                ok: false,
                message: 'Palabra no encontrada. Comprueba el ID.'
            });
        }
        const savedWord = await saveWordToCollection(id_user, word_id);

        return res.status(201).json({
            ok: true,
            message: 'Palabra añadida a la colección.',
            word: savedWord
        });
    } catch (error) {
        console.error('Error al añadir la palabra a la colección del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
}

const deleteWordFromCollection = async (req, res) => {
    const { id_user } = req.user;
    const { word_id } = req.params;
    try {
        const wordFound = await findWordByID(word_id);
        if (!wordFound) {
            return res.status(404).json({
                ok: false,
                message: 'Palabra no encontrada. Comprueba el ID.'
            });
        }
        const removedWord = await removeUserWordById(id_user, word_id);
        return res.status(200).json({
            ok: true,
            message: 'Palabra eliminada de la colección.',
            word: removedWord
        });
    } catch (error) {
        console.error('Error al eliminar la palabra de la colección del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const markWordAsLearned = async (req, res) => {
    const { id_user } = req.user;
    const {word_id} = req.params;
    try {
        const wordFound = await findWordByID(word_id);
        if (!wordFound) {
            return res.status(404).json({
                ok: false,
                message: 'Palabra no encontrada. Comprueba el ID.'
            });
        }
        const updatedWord = await changeWordStatusToLearned(id_user, word_id);
        if (!updatedWord) {
            // console.log(updatedWord);
            return res.status(404).json({
                ok: false,
                message: 'La palabra no está en la colección del usuario.'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Palabra marcada como aprendida.',
            word: updatedWord
        });
    } catch (error) {
        console.error('Error al cambiar el estado de la palabra a aprendida:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

module.exports = {
    getUserLanguages,
    getAvailableLanguages,
    getUserCategories,
    getAvailableCategories,
    getAllWordsOfCategoryByUserId,
    getWordCardByUserId,
    addWordToCollection,
    deleteWordFromCollection,
    markWordAsLearned
};