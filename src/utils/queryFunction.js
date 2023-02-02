import { pool } from '../models/pool';
import {
  dropRideHistoryTable,
  dropOfferTable,
  dropUserTable,
  createRideOffer,
  createUserTable,
  createRideHistory,
} from './queries';

export const executeQueryArray = async (arr) =>
  new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });

export const dropTables = () =>
  executeQueryArray([dropUserTable, dropOfferTable, dropRideHistoryTable]);

export const createUsersTable = () => executeQueryArray([createUserTable]);
export const createTable = () =>
  executeQueryArray([createRideOffer, createRideHistory]);
