// scripts/import-users.js

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// MongoDB Connection URI
const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = 'tattler_db';
const collectionName = 'users';
const csvFilePath = path.join(__dirname, '..', 'data', 'users.csv');

async function importUsers() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Successfully connected to MongoDB.");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Optional: Drop the collection to start fresh
     try {
        await collection.drop();
        console.log(`Collection '${collectionName}' dropped.`);
    } catch (err) {
        if (err.code === 26) {
            console.log(`Collection '${collectionName}' does not exist, creating it.`);
        } else {
            throw err;
        }
    }


    const users = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const userDocument = {
          username: row.username,
          email: row.email,
          password: row.password, // In a real app, this should be hashed!
          preferences: row.preferences.split(',').map(item => item.trim()),
          createdAt: new Date()
        };
        users.push(userDocument);
      })
      .on('end', async () => {
        console.log('CSV file successfully processed.');

        if (users.length > 0) {
          const result = await collection.insertMany(users);
          console.log(`${result.insertedCount} users were inserted.`);

          // Create a unique index on email
          await collection.createIndex({ email: 1 }, { unique: true });
          console.log("Unique index created on 'email'.");

        } else {
          console.log("No users to insert.");
        }

        // Close the connection
        await client.close();
        console.log("MongoDB connection closed.");
      });

  } catch (err) {
    console.error("An error occurred:", err);
    await client.close();
  }
