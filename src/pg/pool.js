const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
	database: process.env.DB_DATABASE,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
});

module.exports.fetch = async (SQL, ...params) => {
	const client = await pool.connect();
	try {
		let { rows } = await client.query(SQL, params ? params : null);
		return rows;
	} catch (e) {
		return e;
	} finally {
		await client.release();
	}
};

module.exports.fetchOne = async (SQL, ...params) => {
	const client = await pool.connect();
	try {
		let {
			rows: [row],
		} = await client.query(SQL, params ? params : null);
		return row;
	} catch (e) {
		return e;
	} finally {
		await client.release();
	}
};

module.exports.fetchOneTransaction = async (client, SQL, ...params) => {
	try {
		let {
			rows: [row],
		} = await client.query(SQL, params ? params : null);
		return row;
	} catch (e) {
		return e;
	}
};

module.exports.oneTimeClient = async (SQL, ...params) => {
	const client = await pool.connect();
	try {
		let { rows } = await client.query(SQL, params ? params : null);
		return rows;
	} catch (e) {
		return e;
	} finally {
		await client.release();
	}
};

module.exports.clientTransaction = async (callback) => {
	const client = await pool.connect();
  try {
		await client.query('BEGIN');
		
		await callback(client);

    await client.query('COMMIT');

    console.log('Transaction successfully completed.');
	} catch (error) {
    await client.query('ROLLBACK');
    console.error('Error during transaction:', error);
	} finally {
    await client.release();
  }
}

module.exports.clientTransactionQuery = async (client, SQL, ...params) => {
	try {
		let { rows } = await client.query(SQL, params ? params : null);
		return rows;
	} catch (e) {
		return e;
	}
};

