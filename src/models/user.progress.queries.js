const queriesUserProgress = {
    checkProgressInOneUserCategory: `
        SELECT
            COUNT(ul.id_learning) AS total_words,
            COUNT(ul.id_learning) FILTER (WHERE ul.status = 'learned') AS learned_words
        FROM user_learning ul
        INNER JOIN words w
            ON ul.word_id = w.id_word
        WHERE ul.user_id = $1
            AND w.category_id = $2`,
    checkProgressInAllUserCategories: `
        SELECT
            c.id_category,
            c.category,
            COUNT(ul.id_learning) AS total_words,
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
                COUNT(ul.id_learning) AS total_words,
                COUNT(ul.id_learning) FILTER (WHERE ul.status = 'learned') AS learned_words
            FROM user_learning ul
            INNER JOIN words w
                ON ul.word_id = w.id_word
            INNER JOIN categories c
                ON w.category_id = c.id_category
            WHERE ul.user_id = $1
                AND c.language_id = $2
            GROUP BY c.id_category
        )
        SELECT
            COUNT(*) AS total_categories,
            COUNT(*) FILTER (WHERE learned_words = total_words AND total_words > 0) AS learned_categories
        FROM categories_progress
        WHERE total_words > 0`,
    checkProgressInAllUserLanguages:`
        SELECT
            l.id_language,
            l.language,
            COUNT(ul.id_learning) AS total_words,
            COUNT(ul.id_learning) FILTER (WHERE ul.status = 'learned') AS learned_words
        FROM user_learning ul
        INNER JOIN words w
            ON ul.word_id = w.id_word
        INNER JOIN categories c
            ON w.category_id = c.id_category
        INNER JOIN languages l
            ON c.language_id = l.id_language
        WHERE ul.user_id = $1
        GROUP BY l.id_language
        ORDER BY l.language ASC`,
};

module.exports = {
    queriesUserProgress
};