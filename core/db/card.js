var pg = require("./pg")

module.exports = {
	getAll(params) {
		return pg.query('select * from "card" where "deckId" = $1;', [params.deckId])
	},
	create(params) {
		return pg.query('insert into "card" ("input", "front", "back", "testByFront", "deckId", "streak") values ($1, $2, $3, $4, $5, 0);', [
			params.input,
			params.front,
			params.back,
			params.testByFront,
			params.deckId,
		])
	},
	update() {},
	delete() {},
}
