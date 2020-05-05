var { Pool } = require("pg")
var pool = new Pool()

module.exports = {
	query(text, params) {
		if (process.env.NODE_ENV === "development") console.log(text)
		return pool.query(text, params)
	},
	client() {
		return pool.connect()
	},
}
