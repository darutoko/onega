process.chdir(__dirname)
require("./config.js")

var express = require("express")
var bodyParser = require("body-parser")

var routes = require("./routes")

var app = express()

app.use(bodyParser.json())
if (process.env.NODE_ENV !== "production")
	app.use((req, res, next) => {
		console.log(`${req.method} ${req.originalUrl}`)
		console.log(req.body)
		next()
	})
app.use(express.static("public"))
app.use("/api", routes.api)

app.use((err, req, res, next) => {
	if (process.env.NODE_ENV === "development") console.error(err.stack)
	if (res.locals.error) {
		// var error = res.locals.error
		res.status(res.locals.error.status).json({
			status: res.locals.error.status,
			error: res.locals.error.message,
		})
	} else {
		next(err)
	}
})

app.listen(process.env.PORT, () => console.log(`Listening at port ${process.env.PORT}`))
