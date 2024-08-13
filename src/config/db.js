const { db } = require("./connection");

// Function to establish Sequelize connection
async function connectToDatabase() {
  try {
    console.log("inside connectdatabase");

    // Test the connection
    await db.sequelize.authenticate();
    console.log(
      "Connection has been established successfully.",
      process.env.DATABASE_NAME
    );
    return db.sequelize;
  } catch (error) {
    console.log("Error connecting to the database:", error);
    throw error;
  }
}


// Export the connectToDatabase function
module.exports = {
  sequelize: db.sequelize,
  connectToDatabase,
};
