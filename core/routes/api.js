var router = require("express").Router()

router.get("/", (req, res, next) => {
	res.json({
		message: "API Index"
	})
})

module.exports = router;
