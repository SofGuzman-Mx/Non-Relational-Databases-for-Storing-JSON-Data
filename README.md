Major Version: 1.1.0
------------
1. Installation and Usage Prerequisites

    -Node.js (v18.x or later recommended)<br/>
    -npm (v9.x or later recommended)<br/>
    -MongoDB (v6.x or later recommended, either local or via Atlas)<br/>
    -Git

2. Clone the repository in Git:
_____
    git clone <git@github.com:SofGuzman-Mx/Non-Relational-Databases-for-Storing-JSON-Data.git>
_____    
    cd tattler-db
_____
**Install dependencies**

The import scripts require the mongodb and csv-parser packages

![independencies](C:\Users\sofi0\Downloads\TechnoReady-In Mexico\4. Non-Relational Databases for Storing JSON Data\images)
____

npm install mongodb csv-parser
____
<br/>

Configure Environment:
Ensure your MongoDB server is running. Create a .env file in the root directory and add your MongoDB connection string:

MONGO_URI="mongodb://localhost:27017/tattler_db"
_________________
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
____
mongorestore --uri="mongodb://localhost:27017" --db tattler_db db_backup/tattler_db

This will create the tattler_db and restore the restaurants and users collections with their respective indexes.
-----------------------
3. Repository Structure

data/: Contains the raw data files in CSV format.

backup/: Contains the database backup files.

Technical Report/: Contains screenshots of the database structure.

scripts/: Contains Node.js scripts for various database operations like data importation.

