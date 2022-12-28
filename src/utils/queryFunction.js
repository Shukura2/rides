import { pool } from '../models/pool';
import {
  dropRideHistoryTable,
  dropOfferTable,
  dropPassengerTable,
  dropDriverTable,
  createRideOffer,
  createPassengerTable,
  createDriverTable,
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
  executeQueryArray([
    dropDriverTable,
    dropPassengerTable,
    dropOfferTable,
    dropRideHistoryTable,
  ]);
export const createTableDriver = () => executeQueryArray([createDriverTable]);
export const createTablesPassenger = () =>
  executeQueryArray([createPassengerTable]);
export const createOfferTable = () => executeQueryArray([createRideOffer]);
export const createRideHistoryTable = () =>
  executeQueryArray([createRideHistory]);
