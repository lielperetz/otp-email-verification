const config = require('./dbConfig'),
    sql = require('mssql');

const getUsers = async (email) => {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(`SELECT * FROM Users WHERE email = '${email}'`)
        return users;
    }
    catch (error) {
        console.log(error);
    }
}

const addUser = async (newUser) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .query(`INSERT INTO Users VALUES ('${newUser.username}', '${newUser.email}', '${newUser.otp ? newUser.otp : null}', '${newUser.otp_time}')`)
        let user = await pool.request().query(`SELECT * FROM Users WHERE email = '${newUser.email}'`)
        return user;
    }
    catch (error) {
        console.log(error);
    }
}

const updateOTP = async (user) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .query(`UPDATE Users SET otp = '${user.otp}', otp_time = '${user.otp_time}' WHERE email = '${user.email}'`);
        let userupdated = await pool.request().query(`SELECT * FROM Users WHERE email = '${user.email}'`)
        return userupdated;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    addUser,
    updateOTP
}

