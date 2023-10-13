


create new migration cp wallet-prod.sqlite backup_wallet-prod.sqlite
make migration {NODE_ENV=production} npx sequelize-cli db:migrate 
create backup cp wallet-prod.sqlite backup_wallet-prod.sqlite
migrate from db to db by specific table dataMigration.js


todo: 
- fix env logic 
- double check endpoints with wallet
- change the UI logic
- add new data to db (my budget, family budget)
