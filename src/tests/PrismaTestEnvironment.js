/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require('pg');
const NodeEnvironment = require('jest-environment-node');
const util = require('util');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const exec = util.promisify(require('child_process').exec);

const prismaBinary = path.resolve('./node_modules/.bin/prisma');

const execRepeatedOnErr = async (command, i = 0) => {
    await exec(command).catch(async (err) => {
        if (i > 3) throw Error(err);
        await execRepeatedOnErr(command, i + 1);
    });
};

class PrismaTestEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
        // Generate a unique schema identifier for this test context
        this.schema = `test_${Date.now()}_${Math.random().toString(16).substring(2)}`;

        // Generate the pg connection string for the test schema
        this.databaseUrl = `postgres://postgres:123456789@localhost:5432/postgres?schema=${this.schema}`;
    }

    async setup() {
        // Set the required environment variable to contain the connection string
        // to our database test schema
        process.env.DATABASE_URL = this.databaseUrl;
        this.global.process.env.DATABASE_URL = this.databaseUrl;

        // Run the migrations to ensure our schema has the required structure
        await execRepeatedOnErr(`${prismaBinary} migrate save --experimental --name testing`);
        await execRepeatedOnErr(`${prismaBinary} migrate up --create-db --experimental`);

        return super.setup();
    }

    async teardown() {
    // Drop the schema after the tests have completed
        const client = new Client({
            connectionString: this.databaseUrl,
        });
        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
        await client.end();
    }
}
module.exports = PrismaTestEnvironment;
