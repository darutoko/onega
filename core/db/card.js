var pg = require("./pg")

module.exports = {
	getAll({ deckId }) {
		return pg.query('select * from "card" where "deckId" = $1;', [deckId])
	},
	getShuffled({ deckId, limit }) {
		return pg.query('select * from "card" where "deckId" = $1 order by random() limit $2;', [deckId, limit])
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
	updateDeck({ ids, newDeckId }) {
		return pg.query('update "card" set "deckId" = $1 where "id" = any ($2)', [newDeckId, ids])
	},
	updateStreak({ id, isTestPassed }) {
		var value
		if (isTestPassed) value = '"streak"+1'
		else value = 0
		return pg.query('update "card" set "streak" = ' + value + ', "updatedAt" = default where "id" = $1', [id])
	},
	delete({ ids }) {
		return pg.query('delete from "card" where "id" = any ($1)', [ids])
	},
}
