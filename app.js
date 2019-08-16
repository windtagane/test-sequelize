/**
 * Sequelize
 */
const Sequelize = require('sequelize');

// Passing parameters separately ('database', 'username', 'password')
const sequelize = new Sequelize('test_sequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

/** Test de la connexion */
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/** Model de table*/
const Model = Sequelize.Model;
class User extends Model {}
User.init({
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  activity: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'users'
  // options
});

/** 
 *  EXEMPLES (https://sequelize.org/master/manual/getting-started.html#querying)
 */

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: false }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
      username: 'John',
      activity: 'Professeur'
    });
  });

// Find all users

/* 
User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  }); 
*/

// Create a new user

/* 
User.create({ username: "Ayaya", activity: "Crier" }).then(newUser => {
    console.log("New user's auto-generated ID:", newUser.id);
  }); 
*/
  
