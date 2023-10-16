const sqlite3 = require('sqlite3').verbose();

// Open source and destination databases
const destDb = new sqlite3.Database('wallet-prod.sqlite');
const sourceDb = new sqlite3.Database('wallet_family_backup.sqlite');

// Define the source and destination table names
const sourceTableName = 'Operation_Tags';
const destTableName = 'Operation_Tags';
// const sourceTableName = 'Wallets';
// const destTableName = 'Wallets';


// Migrate data from source to destination
sourceDb.serialize(() => {
  sourceDb.each(`SELECT * FROM ${sourceTableName}`, (err, row) => {
    if (err) {
      console.error('Error reading source data:', err.message);
      return;
    }
    console.log(row);
    // Insert data into the destination table
    // destDb.run(`INSERT INTO ${destTableName} (name, color, updatedAt, createdAt) VALUES (?, ?, ?, ?)`,
    //   [row.name, row.createdAt, row.updatedAt, row.color],
    // destDb.run(`INSERT INTO ${destTableName} (price, createdAt, updatedAt, currencyId, operationTypeId, walletId) VALUES (?, ?, ?, ?, ?, ?)`,
    //   [row.price, row.createdAt, row.updatedAt, row.currencyId, row.operationTypeId, row.walletId],
    // destDb.run(`INSERT INTO ${destTableName} (id, name, secret, updatedAt, createdAt) VALUES (?, ?, ?, ?, ?)`,
    //   [row.id, row.name, row.secret, row.updatedAt, row.createdAt],
    destDb.run(`INSERT INTO ${destTableName} (OperationId, TagId) VALUES (?, ?)`,
      [row.OperationId, row.TagId],
    // destDb.run(`INSERT INTO ${destTableName} (name, createdAt, updatedAt) VALUES (?, ?, ?)`,
    //   [row.name, row.createdAt, row.updatedAt],
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
