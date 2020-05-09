var pg = require("./pg")

module.exports = {
	getAll({ deckId }) {
		return pg.query('select * from "card" where "deckId" = $1;', [deckId])
	},
	create({ input, front, back, testByFront, deckId }) {
		return pg.query('insert into "card" ("input", "front", "back", "testByFront", "deckId", "streak") values ($1, $2, $3, $4, $5, 0);', [
			input,
			front,
			back,
			testByFront,
			deckId,
		])
	},
	update({ ids, newDeckId }) {
		return pg.query('update "card" set "deckId" = $1 where "id" = any ($2)', [newDeckId, ids])
	},
	delete({ ids }) {
		return pg.query('delete from "card" where "id" = any ($1)', [ids])
	},
}
