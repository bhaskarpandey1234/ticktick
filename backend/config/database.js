const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config');

const sequelize = new Sequelize(config[env]);

module.exports = sequelize;














// const { Pool } = require('pg')

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'todo',
//   password: 'postgresql@123',
//   port: 5432,
// })

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }
//   const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }

//   const createUser = (request, response) => {
//     const { name, email } = request.body;
  
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(150) UNIQUE NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `;
  
//     pool.query(createTableQuery, (tableErr) => {
//       if (tableErr) {
//         console.error('Error creating table:', tableErr);
//         return response.status(500).send('Failed to initialize database table');
//       }
  
//       const insertQuery = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
//       pool.query(insertQuery, [name, email], (error, results) => {
//         if (error) {
//           console.error('Error inserting user:', error);
//           return response.status(500).send('Failed to insert user');
//         }
  
//         response.status(201).send(`User added with ID: ${results.rows[0].id}`);
//       });
//     });
//   };
  
//   // const createUser = (request, response) => {
//   //   const { name, email } = request.body
  
//   //   pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email],
//   //      (error, results) => {
//   //     if (error) {
//   //       throw error
//   //     }
//   //     response.status(201).send(`User added with ID: ${results.rows[0].id}`)
//   //   })
//   // }
//   const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const { name, email } = request.body
  
//     pool.query(
//       'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//       [name, email, id],
//       (error, results) => {
//         if (error) {
//           throw error
//         }
//         response.status(200).send(`User modified with ID: ${id}`)
//       }
//     )
//   }
//   const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
//   }
//   module.exports = {
//     getUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
//   }