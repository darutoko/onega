var pg = require("./pg")

module.exports = {
	get(params) {
		return pg.query('select * from "deck" where id = $1;', [params.id])
	},
	getAll() {
		return pg.query('select * from "deck";')
	},
	create(params) {
		return pg.query('insert into "deck" ("name") values ($1);', [params.name])
	},
	update() {},
	delete() {},
}
