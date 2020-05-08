var router = require("express").Router()
var https = require("https")
var db = require("../db")

router.get("/", (req, res, next) => {
	res.json({
		message: "API Index",
	})
})

router.get("/decks", async (req, res, next) => {
	var result = await db.deck.getAll()
	res.json({ decks: result.rows })
})

router.post("/decks", async (req, res, next) => {
	// await db.deck.create({ name: req.body.name })
	var result = await db.deck.getAll()
	res.json({ decks: result.rows })
})

router.get("/decks/:id", async (req, res, next) => {
	var data = {}
	var result = await db.deck.get({ id: req.params.id })
	data.deck = result.rows[0]
	result = await db.card.getAll({ deckId: req.params.id })
	data.cards = result.rows
	res.json(data)
})

router.get("/decks/:id/memorize", async (req, res, next) => {
	var result = await db.card.getAll({ deckId: req.params.id })
	res.json({ cards: result.rows })
})

router.post("/cards", async (req, res, next) => {
	await db.card.create(req.body)
	var result = await db.card.getAll({ deckId: req.body.deckId })
	res.json({ cards: result.rows })
})

router.get("/yandex_dictionary", async (req, res, next) => {
	var def = await getYandexDictionary({ text: req.query.text, lang: req.query.lang })
	def = def.def[0]
	// Prepend nouns with masculine/feminine indefinite articles
	if (def.pos === "noun")
		if (def.gen === "f") def.text = "une " + def.text
		else if (def.gen === "m") def.text = "un " + def.text

	var data = {
		text: def.text,
		ts: def.ts,
		tr: [],
	}

	for (let tr of def.tr) {
		if (!tr.syn) tr.syn = []
		// Unite each translation and up to 3 of it synonyms in to separate string
		data.tr.push([tr.text, ...tr.syn.slice(0, 3).map(s => s.text)].join(", "))
	}
	console.log(data)
	res.json(data)
})

// router.post("/", async (req, res, next) => {
// 	res.json({})
// })

var getYandexDictionary = params =>
	new Promise((resolve, reject) => {
		params.key = process.env.YADI_KEY
		var url =
			"https://dictionary.yandex.net/api/v1/dicservice.json/lookup?" +
			encodeURI(
				Object.keys(params)
					.map(key => key + "=" + params[key])
					.join("&")
			)
		console.log(url)
		https
			.get(url, response => {
				var data = ""
				response.on("data", chunk => (data += chunk))
				response.on("end", () => {
					try {
						data = JSON.parse(data)
					} catch (error) {
						reject(error)
					}
					resolve(data)
				})
			})
			.on("error", reject)
	})

module.exports = router
