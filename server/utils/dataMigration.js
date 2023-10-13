const sqlite3 = require('sqlite3').verbose();

// Open source and destination databases
const destDb = new sqlite3.Database('wallet-test.sqlite');
const sourceDb = new sqlite3.Database('wallet-prod.sqlite');

// Define the source and destination table names
const sourceTableName = 'Operations';
const destTableName = 'Operations';


// Migrate data from source to destination
sourceDb.serialize(() => {
  sourceDb.each(`SELECT * FROM ${sourceTableName}`, (err, row) => {
    if (err) {
      console.error('Error reading source data:', err.message);
      return;
    }
    console.log(row);

    // Insert data into the destination table
    destDb.run(`INSERT INTO ${destTableName} (id, price, createdAt, updatedAt, currencyId, operationTypeId) VALUES (?, ?, ?, ?, ?, ?)`,
      [row.id, row.price, row.createdAt, row.updatedAt, row.currencyId, row.operationTypeId],
      (err) => {
      if (err) {
        console.error('Error inserting data into destination table:', err.message);
      }
    });
  }, () => {
    // Close both databases when done
    sourceDb.close((err) => {
      if (err) {
        console.error('Error closing source database:', err.message);
      }
    });

    destDb.close((err) => {
      if (err) {
        console.error('Error closing destination database:', err.message);
      }
    });
  });
});
