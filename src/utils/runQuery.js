import { dropTables, createUsersTable, createTable } from './queryFunction';

(async () => {
  await dropTables;
  await createUsersTable();
  await createTable();
})();
