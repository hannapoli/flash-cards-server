const queriesAdminUsers = {
    findUserByUid: `SELECT * FROM users WHERE firebase_uid = $1`,
    modifyUserByUid: `UPDATE users SET name = $1, email = $2, role = $3 WHERE firebase_uid = $4 RETURNING *`,
    removeUserByUid: `DELETE FROM users WHERE firebase_uid = $1`,
};

module.exports = queriesAdminUsers;