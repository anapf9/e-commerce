import pgp from "pg-promise";
import Connection from "./ConnectionInterface";

export default class PgPromiseAdapter implements Connection {
	pgp: any;

	constructor () {
		this.pgp = pgp()("postgres://postgres:Postgres2023!@localhost:5432/app");
	}
	
	query(statement: string, params: any): Promise<any> {
		return this.pgp.query(statement, params);
	}
	
	async close(): Promise<void> {
		this.pgp.$pool.end();
	}
}