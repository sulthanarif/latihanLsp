"use strict";

// init database
const {db, connectSql } = require("../Config/db");

// init jwt
const { hashPass, verifyPass } = require("../Helper/ConvertPass");
const jwt = require("jsonwebtoken");

class User {
  constructor(nama, email, password, no_hp, alamat, role, create_at, update_at) {
    this.nama = nama;
    this.email = email;
    this.password = password;
    this.no_hp = no_hp;
    this.alamat = alamat;
    this.role = role;
    this.create_at = create_at;
    this.update_at = update_at;
  }

  // registermodel
  static async RegisterModel(nama, email, password, no_hp, alamat, role) {
    //query sql
    const sqlQuery = "INSERT INTO person (nama, email, password, no_hp, alamat, role) VALUES (?, ?, ?, ?, ?, ?)";

    try {
      const hasher = await hashPass(password);

      // Execute an SQL query to insert the user into the database
      const user = await connectSql(sqlQuery, [nama, email, hasher, no_hp, alamat, role]);

      if (user) {
        return 'user created';
      };
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create user");
    }
  }

  // loginmodel
    static async loginModel(email, password) {
      try {
        const user = await this.findUserByEmail(email);
  
        if (!user) {
          return {
            user: false,
            valid: false,
            token: null,
            message: "Invalid email or password"
          };
        }
  
        const isValidPassword = await verifyPass(password, user.password);
  
        if (!isValidPassword) {
          return {
            user: false,
            valid: false,
            token: null,
            message: "Invalid email or password"
          };
        }
  
        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
        return {
          user: true,
          valid: true,
          token,
          message: "Login success"
        };
      } catch (err) {
        console.error(err);
        throw new Error("An error occurred while processing the request");
      }
    }
    
  // find user by email
  static async findUserByEmail(email) {
    try {
      const sqlQuery = 'SELECT * FROM person WHERE email = ? LIMIT 1';
      const [user] = await connectSql(sqlQuery, [email]);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred while processing the request");
    }
  }

// check user email exists
  static async CheckEmailExists(email) {
    let sqlQuery = "SELECT COUNT(*) as count FROM person WHERE email = ?";
    let count;
  
    try {
      const result = await connectSql(sqlQuery, [email]);
      count = result[0].count;
    } catch (err) {
      throw new Error(`Error in CheckEmailExists: ${err}`);
    }
  
    return count > 0;
  }
  
  // show profile model
  static async ShowProfileModel(id) {
    let sqlQuery = 'SELECT * FROM person WHERE id = 2';
    let resultUser;
    // console.log(sqlQuery);

    try {
      const user = await connectSql(sqlQuery, [id]);
      console.log(user)
      const results = user[0];
      resultUser = new User(results.nama, results.email, results.password, results.no_hp, results.alamat, results.role, results.create_at, results.update_at);

      // console.log(resultUser);
      return resultUser;
    } catch (err) {
      throw new Error(`Error in findUserById: ${err}`);
    }

  }
}

module.exports = { User };
