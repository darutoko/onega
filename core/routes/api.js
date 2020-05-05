var router = require("express").Router()
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
	await db.deck.create({ name: req.body.name })
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

// router.post("/", async (req, res, next) => {
// 	res.json({})
// })

module.exports = router
