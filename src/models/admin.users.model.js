const pool = require('../configs/dbConnect');
const { queriesAdminUsers } = require('./admin.queries');

const findAllUsers = async () => {
    try {
        const result = await pool.query(queriesAdminUsers.findAllUsers);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findAllUsers:', error);
        throw error;
    }
};

const findUserByUid = async (firebaseUid) => {
    try {
        const result = await pool.query(queriesAdminUsers.findUserByUid, [firebaseUid]);
        // console.log(result.rows);
        return result.rows[0];
    } catch (error) {
        console.error('Error en findUserByUid:', error);
        throw error;
    }
}

const modifyUserByUid = async (firebaseUid, name, email, role) => {
    try {
        const result = await pool.query(queriesAdminUsers.modifyUserByUid, [name, email, role, firebaseUid]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en modifyUserByUid:', error);
        throw error;
    }
}

const removeUserByUid = async (firebaseUid) => {
    try {
        const result = await pool.query(queriesAdminUsers.removeUserByUid, [firebaseUid]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en removeUserByUid:', error);
        throw error;
    }
}



module.exports = {
    findAllUsers,
    findUserByUid,
    modifyUserByUid,
    removeUserByUid
};