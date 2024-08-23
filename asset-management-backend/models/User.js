// models/User.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

User.create = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
};

User.findByEmail = async(email) => {
    console.log("UserModel==========>findByEmail")
    console.log(email)
 const [rows, fields]  =await db.execute('SELECT * FROM users WHERE email = ?', [email]);
 return  rows;
};
// Method to compare email and password
User.verifyUser = async (email, password) => {
    const [rows, fields] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
   console.log(rows);
    return rows; // Returning rows, which contains the actual data
  };




User.findByUsername = (username) => {
  return db.execute('SELECT * FROM users WHERE username = ?', [username]);
};

module.exports = User;
