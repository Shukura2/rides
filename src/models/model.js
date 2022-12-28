import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING *
      `;
    return this.pool.query(query);
  }

  async deleteFromTable(clause) {
    const query = `DELETE FROM ${this.table} WHERE ${clause}`;
    return this.pool.query(query);
  }

  async editFromTable(data, clause) {
    let query = `UPDATE ${this.table} SET `;
    const keys = Object.keys(data);
    let sqlQuery;
    for (const key of keys) {
      if (key === keys[keys.length - 1]) {
        sqlQuery = `"${key}" = '${data[key]}' `;
        query += `${sqlQuery}`;
        query += `${clause} RETURNING *`;
        return this.pool.query(query);
      }
      sqlQuery = `"${key}" = '${data[key]}',`;
      query += `${sqlQuery}`;
    }
  }
}

export default Model;
