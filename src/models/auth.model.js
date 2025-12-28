const pool = require('../configs/dbConnect');
const authQueries = require('./auth.queries');

const addUser = async (firebaseUid, email, name) => {
    try {
        const result = await pool.query(authQueries.addUser, [firebaseUid, email, name, 'user']);
        // console.log(result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en addUser:', error);
        throw error;
    }
}

const findUserByEmail = async (email) => {
    try {
        const result = await pool.query(authQueries.findUserByEmail, [email]);
        // console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error en findUserByEmail:', error);
        throw error;
    }
}

const findUserByUid = async (firebaseUid) => {
    try {
        const result = await pool.query(authQueries.findUserByUid, [firebaseUid]);
        // console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error en findUserByUid:', error);
        throw error;
    }
}

module.exports = {
    addUser,
    findUserByEmail,
    findUserByUid
};