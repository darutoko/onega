var pg = require("./pg")

module.exports = {
	get(params) {
		return pg.query('select * from "deck" where id = $1;', [params.id])
	},
	getAll() {
		return pg.query(
			'select "deck".*, count("card"."id") as "totalCards", count("card"."id") filter (where "card"."streak" > "deck"."streakSize") as "memorizedCards" from "deck" left join "card" on "deck"."id" = "card"."deckId" group by "deck"."id";'
		)
	},
	create(params) {
		return pg.query('insert into "deck" ("name") values ($1);', [params.name])
	},
	update() {},
	delete() {},
}
