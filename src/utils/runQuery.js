import {
  createTablesPassenger,
  dropTables,
  createOfferTable,
  createTableDriver,
  createRideHistoryTable,
} from './queryFunction';

(async () => {
  await dropTables;
  await createTablesPassenger();
  await createTableDriver();
  await createOfferTable();
  await createRideHistoryTable();
})();
