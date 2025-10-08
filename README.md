**Tattler: Personalized Restaurant Directory**
1. Project Description
Tattler is a modern web application designed to be a nationwide restaurant directory in Mexico. This project aims to transform the existing platform into a dynamic and personalized experience for users. By leveraging a non-relational database (MongoDB) and a REST API (Express.js), Tattler will provide up-to-date information, personalized recommendations, and allow users to interact by adding comments, ratings, and new restaurants. This will address the recent drop in user traffic by significantly improving the user experience and ensuring the directory's content remains current and relevant.

This repository contains the initial database setup, data import scripts, and documentation for the Tattler application backend.

Major Version: 1.0.0
------------
2. Installation and Usage
Prerequisites
Node.js (v18.x or later recommended)

npm (v9.x or later recommended)

MongoDB (v6.x or later recommended, either local or via Atlas)

Git

Installation
Clone the repository:

git clone <your-repository-url>
cd tattler-db

Install dependencies:
The import scripts require the mongodb and csv-parser packages.

npm install mongodb csv-parser

Configure Environment:
Ensure your MongoDB server is running. Create a .env file in the root directory and add your MongoDB connection string:

MONGO_URI="mongodb://localhost:27017/tattler_db"

Database Setup & Data Import
You can populate the database in two ways:

A) Using the Import Scripts (Recommended for CSV data):

Place your restaurants.csv and users.csv files in the data/ directory. Then, run the import scripts:

# Import restaurants
node scripts/import-restaurants.js

# Import users
node scripts/import-users.js

These scripts will connect to your MongoDB instance, create the tattler_db database, and populate the restaurants and users collections.

B) Restoring from Backup:

Use the mongorestore command-line tool to restore the database from the provided backup files located in the db_backup/ directory.

mongorestore --uri="mongodb://localhost:27017" --db tattler_db db_backup/tattler_db

This will create the tattler_db and restore the restaurants and users collections with their respective indexes.
-----------------------
3. Repository Structure

data/: Contains the raw data files in CSV format.

backup/: Contains the database backup files.

Technical Report/: Contains screenshots of the database structure.

scripts/: Contains Node.js scripts for various database operations like data importation.

