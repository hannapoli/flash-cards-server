require('dotenv').config();
const { findAllWords, findWordByID, findWordByName, saveImageMetadata, addWord, modifyWordByID, removeImageByID, removeWordByID } = require('../models/admin.words.model');
const url = process.env.BACKEND_URL;

const getAllWords = async (req, res) => {
    const { category_id } = req.params;
    try {
        const words = await findAllWords(category_id);
        return res.status(200).json({
            ok: true,
            words: words
        });
    } catch (error) {
        console.error('Error en getAllWords:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getWordyById = async (req, res) => {
    const { id } = req.params;
    try {
        const wordFound = await findWordByID(id);
        if (!wordFound) {
            return res.status(404).json({
                ok: false,
                message: 'Palabra no encontrada. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            word: wordFound,
            img_url: wordFound?.image_filename ? `${url}/uploads/words/${wordFound.image_filename}` : null
        });
    } catch (error) {
        console.error('Error en getWordyById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const createWord = async (req, res) => {
    try {
        const { word, definition, transcription, example, category_id } = req.body;
        const img = req.file;
        let imageId = null;

        if (img) {
            const savedImage = await saveImageMetadata(img.filename, img.originalname, img.mimetype, img.size);
            imageId = savedImage.id_upload;
        }

        const newWord = await addWord(word, definition, transcription, example, category_id, imageId);
        return res.status(201).json({
            ok: true,
            message: 'Palabra creada correctamente.',
            word: newWord
        });
    } catch (error) {
        console.error('Error en createWord:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const updateWordById = async (req, res) => {
    try {
        const { id } = req.params;
        const { word, definition, transcription, example, category_id } = req.body;
        const img = req.file;

        const wordToUpdate = await findWordByID(id);
        if (!wordToUpdate) {
            return res.status(404).json({
                ok: false,
                message: 'Palabra no encontrada. Comprueba el ID.'
            });
        }

        let imageId = wordToUpdate.image_id;
        if (img) {
            const savedImage = await saveImageMetadata(img.filename, img.originalname, img.mimetype, img.size);
            imageId = savedImage.id_upload;
        }

        const newWord = await modifyWordByID(word, definition, transcription, example, category_id, imageId, id);
        return res.status(201).json({
            ok: true,
            message: 'Palabra actualizada correctamente.',
            word: newWord
        });
    } catch (error) {
        console.error('Error en updateWordById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const deleteWordById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id)
        const wordToDelete = await findWordByID(id);
        if (!wordToDelete) {
            return res.status(404).json({
                ok: false,
                message: 'Palabra no encontrada. Comprueba el ID.'
            });
        }
        
        await removeWordByID(id);
        await removeImageByID(wordToDelete.image_id);
        return res.status(200).json({
            ok: true,
            message: 'Palabra eliminada correctamente.'
        });
    } catch (error) {
        console.error('Error en deleteWordById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

module.exports = { getAllWords, getWordyById, createWord, updateWordById, deleteWordById };