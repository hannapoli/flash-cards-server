const queriesUserLanguages = {
    findUserLanguagesByUserId: `
        SELECT DISTINCT l.* 
        FROM languages l 
        JOIN categories c ON c.language_id = l.id_language
        JOIN words w ON  w.category_id = c.id_category
        JOIN user_learning ul ON ul.word_id = w.id_word
        WHERE ul.user_id = $1
        ORDER BY l.language ASC`,
    findAvailableLanguagesByUserId: `
        SELECT *
        FROM languages l
        WHERE NOT EXISTS (
            SELECT 1
            FROM categories c
            JOIN words w ON  w.category_id = c.id_category
            JOIN user_learning ul ON ul.word_id = w.id_word
            WHERE c.language_id = l.id_language
                AND ul.user_id = $1
        )
        ORDER BY l.language ASC`
};

const queriesUserCategories = {
    findUserCategoriesByUserId: `
        SELECT DISTINCT c.* 
        FROM categories c 
        JOIN words w ON  w.category_id = c.id_category
        JOIN user_learning ul ON ul.word_id = w.id_word
        WHERE ul.user_id = $1
            AND c.language_id = $2
        ORDER BY c.category ASC`,
    findAvailableCategoriesByUserId: `
        SELECT *
        FROM categories c
        WHERE c.language_id = $2
            AND NOT EXISTS (
                SELECT 1
                FROM words w
                JOIN user_learning ul ON ul.word_id = w.id_word
                WHERE w.category_id = c.id_category
                    AND ul.user_id = $1
        )
        ORDER BY c.category ASC`
};

const queriesUserWords = {
    findAllWordsOfCategoryByUserId: `
        SELECT 
            w.id_word, 
            w.word, 
            w.definition,
            w.transcription,
            w.example,
            w.image_id,
            ul.status,
            ul.learned_at
        FROM words w
        LEFT JOIN user_learning ul
            ON ul.word_id = w.id_word
            AND ul.user_id = $1
        WHERE w.category_id = $2
        ORDER BY
            CASE ul.status
                WHEN 'saved' THEN 1
                WHEN 'learned' THEN 2
                ELSE 3
            END,
            w.word ASC`,
    findWordCardByUserId: `
        SELECT 
            w.*,
            ul.status,
            ul.learned_at
        FROM words w
        LEFT JOIN user_learning ul
            ON ul.word_id = w.id_word
            AND ul.user_id = $1
        WHERE w.id_word = $2`,
    saveWordToCollection: `
        INSERT INTO user_learning (user_id, word_id, status) 
        VALUES ($1, $2, 'saved')
        ON CONFLICT (user_id, word_id) DO NOTHING
        RETURNING *`,
    removeUserWordById: `
        DELETE 
        FROM user_learning 
        WHERE user_id = $1
            AND word_id = $2 
        RETURNING *`,
    changeWordStatusToLearned: `
        UPDATE user_learning
        SET status = 'learned',
            learned_at = NOW()
        WHERE user_id = $1
            AND word_id = $2
        RETURNING *`
};

module.exports = {
    queriesUserLanguages,
    queriesUserCategories,
    queriesUserWords
};