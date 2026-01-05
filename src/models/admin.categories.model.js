const pool = require('../configs/dbConnect');
const { queriesAdminCategories } = require('./admin.queries');

const findAllCategories = async (languageId) => {
    try {
        const result = await pool.query(queriesAdminCategories.findAllCategories, [languageId]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findAllCategories:', error);
        throw error;
    }
};

const findCategoryByID = async (categoryId) => {
    try {
        const result = await pool.query(queriesAdminCategories.findCategoryByID, [categoryId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en findCategoryByID:', error);
        throw error;
    }
};

const findCategoryByName = async (category) => {
    try {
        const result = await pool.query(queriesAdminCategories.findCategoryByName, [category]);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findCategoryByName:', error);
        throw error;
    }
}

const addCategory = async (category, languageId) => {
    try {
        const result = await pool.query(queriesAdminCategories.addCategory, [category, languageId]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error en addCategory:', error);
        throw error;
    }
};

const modifyCategoryByID = async (category, languageId, categoryId) => {
    try {
        const result = await pool.query(queriesAdminCategories.modifyCategoryByID, [category, languageId, categoryId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en modifyCategoryByID:', error);
        throw error;
    }
};

const removeCategoryByID = async (categoryId) => {
    try {
        const result = await pool.query(queriesAdminCategories.removeCategoryByID, [categoryId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en removeCategoryByID:', error);
        throw error;
    }
};

module.exports = {
    findAllCategories,
    findCategoryByID,
    findCategoryByName,
    addCategory,
    modifyCategoryByID,
    removeCategoryByID
};