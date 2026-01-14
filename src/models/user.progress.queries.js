const queriesUserProgress = {
    checkProgressInOneUserCategory: `
        SELECT
            COUNT(w. id_word) AS total_words,
            COUNT(ul.id_learning) FILTER (WHERE ul.status = 'learned') AS learned_words
        FROM words w
        LEFT JOIN user_learning ul 
            ON w.id_word = ul.word_id 
            AND ul.user_id = $1
        WHERE w.category_id = $2`,
    checkProgressInAllUserCategories: `
        SELECT
            c.id_category,
            c.category,
            COUNT(w.id_word) AS total_words,
            COUNT(ul.id_learning) FILTER (WHERE ul.status = 'learned') AS learned_words
        FROM user_learning ul
        INNER JOIN words w
            ON ul.word_id = w.id_word
        INNER JOIN categories c
            ON w.category_id = c.id_category
        WHERE ul.user_id = $1
            AND c.language_id = $2
        GROUP BY c.id_category
        ORDER BY c.category ASC`,
    checkProgressInAllCategoriesOfALanguage:`
        WITH categories_progress AS (
            SELECT
                c.id_category,
                COUNT(w.id_word) AS total_words,
                COUNT(ul.id_learning) FILTER (WHERE ul.status = 'learned') AS learned_words
            FROM categories c
            INNER JOIN words w
                ON w.category_id = c.id_category
            LEFT JOIN user_learning ul
                ON ul.word_id = w.id_word
                AND ul.user_id = $1
                WHERE c.language_id = $2
            GROUP BY c.id_category
        )
        SELECT
            COUNT(*) AS total_categories,
            COUNT(*) FILTER (WHERE learned_words = total_words) AS learned_categories
        FROM categories_progress`,
    checkProgressInAllUserLanguages:`
        SELECT
            l.id_language,
            l.language,
            COUNT(w.id_word) AS total_words,
            COUNT(ul.id_learning) FILTER (WHERE ul.status = 'learned') AS learned_words
        FROM languages l
        INNER JOIN categories c
            ON c.language_id = l.id_language
        INNER JOIN words w
            ON w.category_id = c.id_category
        LEFT JOIN user_learning ul
            ON ul.word_id = w.id_word
            AND ul.user_id = $1
        GROUP BY l.id_language
        ORDER BY l.language ASC`,
};

module.exports = {
    queriesUserProgress
};