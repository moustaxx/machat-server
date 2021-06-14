/* eslint-disable @typescript-eslint/no-var-requires */
const NodeEnvironment = require('jest-environment-node');
const { Client } = require('pg');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

const execRepeatedOnErr = async (command, i = 0) => {
    await exec(command).catch(async (err) => {
        if (i > 3) throw Error(err);
        return execRepeatedOnErr(command, i + 1);
    });
};

class PrismaTestEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);

        this.schema = `test_${Date.now()}_${Math.random().toString(16).substring(2)}`;
        this.databaseUrl = `postgres://postgres:123456789@localhost:5432/postgres?schema=${this.schema}`;
    }

    async setup() {
        process.env.DATABASE_URL = this.databaseUrl;
        this.global.process.env.DATABASE_URL = this.databaseUrl;

        await execRepeatedOnErr('prisma db push --preview-feature --skip-generate');

        return super.setup();
    }

    async teardown() {
        const client = new Client({
            connectionString: this.databaseUrl,
        });
        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
        await client.end();
    }
}
module.exports = PrismaTestEnvironment;
