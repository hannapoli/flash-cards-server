const queriesAdminUsers = {
    findAllUsers: `
        SELECT * 
        FROM users 
        ORDER BY name ASC`,  
    findUserByUid: `
        SELECT * 
        FROM users 
        WHERE firebase_uid = $1`,
    modifyUserByUid: `
        UPDATE users SET name = $1, email = $2, role = $3 
        WHERE firebase_uid = $4 
        RETURNING *`,
    removeUserByUid: `
        DELETE 
        FROM users 
        WHERE firebase_uid = $1 
        RETURNING *`,
};

const queriesAdminLanguages = {
    findAllLanguages: `
        SELECT * 
        FROM languages 
        ORDER BY language ASC`,
    findLanguageByID: `
        SELECT * 
        FROM languages 
        WHERE id_language = $1`,
    findLangByNameOrCode: `
        SELECT * 
        FROM languages 
        WHERE language = $1 OR code = $2`,
    addLanguage: `
        INSERT INTO languages (language, code) VALUES ($1, $2) 
        RETURNING *`,
    modifyLanguageByID: `
        UPDATE languages 
        SET language = $1, code = $2 
        WHERE id_language = $3 
        RETURNING *`,
    removeLanguageByID: `
        DELETE 
        FROM languages 
        WHERE id_language = $1 
        RETURNING *`,
};

const queriesAdminCategories = {
    findAllCategories: `
        SELECT * 
        FROM categories 
        WHERE language_id = $1 
        ORDER BY category ASC`,
    findCategoryByID: `
        SELECT * 
        FROM categories 
        WHERE id_category = $1`,
    findCategoryByName: `
        SELECT * 
        FROM categories 
        WHERE category = $1`,
    addCategory: `
        INSERT INTO categories (category, language_id) 
        VALUES ($1, $2) 
        RETURNING *`,
    modifyCategoryByID: `
        UPDATE categories 
        SET category = $1, language_id = $2 
        WHERE id_category = $3 
        RETURNING *`,
    removeCategoryByID: `
        DELETE 
        FROM categories 
        WHERE id_category = $1 
        RETURNING *`,
};

const queriesUploads = {
    saveImageMetadata: `
        INSERT INTO uploads (filename, originalname, mimetype, size) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
    removeImageByID: `
        DELETE 
        FROM uploads 
        WHERE id_upload = $1 
        RETURNING *`,
};

const queriesAdminWords = {
    findAllWords: `
        SELECT w.*, u.filename as image_filename 
        FROM words w 
        LEFT JOIN uploads u ON w.image_id = u.id_upload 
        WHERE w.category_id = $1 
        ORDER BY w.word ASC`,
    findWordByID: `
        SELECT w.*, u.filename as image_filename 
        FROM words w 
        LEFT JOIN uploads u ON w.image_id = u.id_upload 
        WHERE w.id_word = $1`,
    findWordByName: `
        SELECT * 
        FROM words 
        WHERE word = $1`,
    addWord: `
        INSERT INTO words (word, definition, transcription, example, category_id, image_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
    modifyWordByID: `
        UPDATE words 
        SET word = $1, definition = $2, transcription = $3, example = $4, category_id = $5, image_id = $6 
        WHERE id_word = $7 
        RETURNING *`,
    removeWordByID: `
        DELETE 
        FROM words 
        WHERE id_word = $1 
        RETURNING *`,
};

module.exports = {
    queriesAdminUsers,
    queriesAdminLanguages,
    queriesAdminCategories,
    queriesUploads,
    queriesAdminWords
};