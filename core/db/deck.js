var pg = require("./pg")

module.exports = {
	get(params) {
		return pg.query('select * from "deck" where id = $1;', [params.id])
	},
	getAll() {
		return pg.query(
			'select "deck".*, count("card"."id") as "totalCards", count("card"."id") filter (where "card"."streak" >= "deck"."streakSize") as "completedCards",\
			count("card"."id") filter (where "card"."streak" = 0) as "failedCards" from "deck" left join "card" on "deck"."id" = "card"."deckId" group by "deck"."id";'
		)
	},
	create(params) {
		return pg.query('insert into "deck" ("name") values ($1);', [params.name])
	},
	update() {},
	delete() {},
}
/*
Total: all cards in the deck.
Completed: cards that have "streak" value equal or more than deck's "streakSize" value.
Incomplete: cards that have "streak" value less than deck's "streakSize" value.
Progressed: cards that have "streak" value less than deck's "streakSize" value and greater than 0.
Failed: cards that have "streak" value equal to 0.

Total = Completed + Incomplete = Completed + Progressed + Failed
*/
