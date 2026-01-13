const {checkProgressInOneUserCategory, checkProgressInAllUserCategories, checkProgressInAllCategoriesOfALanguage} = require('../models/user.progress.model');

const getProgressInOneUserCategory = async (req, res) => {
    const { id_user } = req.user;
    const { category_id } = req.params;

    try {
        const {total_words, learned_words} = await checkProgressInOneUserCategory(id_user, category_id);
        return res.status(200).json({
            ok: true,
            totalWords: Number(total_words),
            learnedWords: Number(learned_words),
            progressPercentage: total_words === 0
                ? 0
                : Math.round((Number(learned_words) / Number(total_words)) * 100)
        });
    } catch (error) {
        console.error('Error al obtener el progreso en una categoría del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getProgressInAllUserCategories = async (req, res) => {
    const { id_user } = req.user;
    const { language_id } = req.params;

    try {
        const progressData = await checkProgressInAllUserCategories(id_user, language_id);
        return res.status(200).json({
            ok: true,
            progress: progressData.map(cat => ({
                category: cat.category,
                totalWords: Number(cat.total_words),
                learnedWords: Number(cat.learned_words),
                progressPercentage: cat.total_words === 0
                    ? 0
                    : Math.round((Number(cat.learned_words) / Number(cat.total_words)) * 100)
            }))
        });
    } catch (error) {
        console.error('Error al obtener el progreso en todas las categorías del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getLanguageProgress = async (req, res) => {
    const { id_user } = req.user;
    const { language_id } = req.params;

    try {
        const {total_categories, learned_categories} = await checkProgressInAllCategoriesOfALanguage(id_user, language_id);
        return res.status(200).json({
            ok: true,
            totalCategories: Number(total_categories),
            learnedCategories:  Number(learned_categories),
            progressPercentage: total_categories === 0
                ? 0
                : Math.round((Number(learned_categories) / Number(total_categories)) * 100)
        });
    } catch (error) {
        console.error('Error al obtener el progreso en el idioma del usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

module.exports = {
    getProgressInOneUserCategory,
    getProgressInAllUserCategories,
    getLanguageProgress
};