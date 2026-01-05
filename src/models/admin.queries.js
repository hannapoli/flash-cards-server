const queriesAdminUsers = {
    findUserByUid: `SELECT * FROM users WHERE firebase_uid = $1`,
    modifyUserByUid: `UPDATE users SET name = $1, email = $2, role = $3 WHERE firebase_uid = $4 RETURNING *`,
    removeUserByUid: `DELETE FROM users WHERE firebase_uid = $1 RETURNING *`,
};

const queriesAdminLanguages = {
    findAllLanguages: `SELECT * FROM languages ORDER BY language ASC`,
    findLanguageByID: `SELECT * FROM languages WHERE id_language = $1`,
    findLangByNameOrCode: `SELECT * FROM languages WHERE language = $1 OR code = $2`,
    addLanguage: `INSERT INTO languages (language, code) VALUES ($1, $2) RETURNING *`,
    modifyLanguageByID: `UPDATE languages SET language = $1, code = $2 WHERE id_language = $3 RETURNING *`,
    removeLanguageByID: `DELETE FROM languages WHERE id_language = $1 RETURNING *`,
};
const queriesAdminCategories = {
    findAllCategories: `SELECT * FROM categories WHERE language_id = $1 ORDER BY category ASC`,
    findCategoryByID: `SELECT * FROM categories WHERE id_category = $1`,
    findCategoryByName: `SELECT * FROM categories WHERE category = $1`,
    addCategory: `INSERT INTO categories (category, language_id) VALUES ($1, $2) RETURNING *`,
    modifyCategoryByID: `UPDATE categories SET category = $1, language_id = $2 WHERE id_category = $3 RETURNING *`,
    removeCategoryByID: `DELETE FROM categories WHERE id_category = $1 RETURNING *`,
};

const queriesAdminWords = {};

module.exports = {
    queriesAdminUsers,
    queriesAdminLanguages,
    queriesAdminCategories,
    queriesAdminWords
};