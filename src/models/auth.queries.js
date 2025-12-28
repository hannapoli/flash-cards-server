const queriesAuth = {
    addUser: `INSERT INTO users (firebase_uid, email, name, role) VALUES ($1, $2, $3, $4) RETURNING *`,
    findUserByEmail: `SELECT * FROM users WHERE email = $1`,
    findUserByUid: `SELECT * FROM users WHERE firebase_uid = $1`
};

module.exports = queriesAuth;