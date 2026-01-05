const { findAllCategories, findCategoryByID, findCategoryByName, addCategory, modifyCategoryByID, removeCategoryByID } = require('../models/admin.categories.model');

const getAllCategories = async (req, res) => {
    const { language_id } = req.params;
    try {
        const categories = await findAllCategories(language_id);
        return res.status(200).json({
            ok: true,
            categories: categories
        });
    } catch (error) {
        console.error('Error en getAllCategories:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const categoryFound = await findCategoryByID(id);
        if (!categoryFound) {
            return res.status(404).json({
                ok: false,
                message: 'Categoría no encontrada. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            category: categoryFound
        });
    } catch (error) {
        console.error('Error en getCategoryById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const createCategory = async (req, res) => {
    const { category, language_id } = req.body;
    try {
        const categoryExists = await findCategoryByName(category);
        if (categoryExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: la categoría ya está registrada.'
            });
        }
        const newCategory = await addCategory(category, language_id);
        return res.status(201).json({
            ok: true,
            message: 'Categoría creada correctamente.',
            category: newCategory
        });
    } catch (error) {
        console.error('Error en createCategory:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const updateCategoryById = async (req, res) => {
    const { id } = req.params;
    const { category, language_id } = req.body;
    try {
        const categoryExists = await findCategoryByName(category);
        if (categoryExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: la categoría ya está registrada.'
            });
        }
        const updatedCategory = await modifyCategoryByID(category, language_id, id);
        if (!updatedCategory) {
            return res.status(404).json({
                ok: false,
                message: 'Categoría no encontrada. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Categoría actualizada correctamente.',
            category: updatedCategory
        });
    } catch (error) {
        console.error('Error en updateCategoryById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

const deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await removeCategoryByID(id);
        if (!deletedCategory) {
            return res.status(404).json({
                ok: false,
                message: 'Categoría no encontrada. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Categoría eliminada correctamente.',
            category: deletedCategory
        });
    } catch (error) {
        console.error('Error en deleteCategoryById:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
};