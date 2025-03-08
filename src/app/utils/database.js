// import mongoose from 'mongoose'

// // Replace 'your-atlas-connection-string' with the connection string for your MongoDB Atlas cluster
// const atlasConnectionString = process.env.MONGODB_URI

// const connectDB = async () => {
//   try {
//     await mongoose
//       .connect(atlasConnectionString, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       })
//       .then(() => {
//         console.log('Conexão estabelecida com sucesso ao MongoDB Atlas!')
//       })
//       .catch((error) => {
//         console.error('Erro ao conectar ao MongoDB Atlas:', error)
//       })
//   } catch (error) {
//     console.error('Erro ao conectar ao MongoDB Atlas:', error.message)
//   }
// }

// export default connectDB

import { Sequelize } from 'sequelize';
import path from 'path';

// Caminho do banco de dados SQLite3
const databasePath = path.resolve(__dirname, 'database.sqlite');

// Instância do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
  logging: false, // Defina como true se quiser ver logs das queries no console
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso ao SQLite!');
  } catch (error) {
    console.error('Erro ao conectar ao SQLite:', error.message);
  }
};

export { sequelize, connectDB };
