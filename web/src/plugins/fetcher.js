export default {
	install(Vue, settings) {
		Vue.prototype.$fetcher = async function(options) {
			var { url, payload, toggle, autofill } = options
			delete options.url
			delete options.payload
			delete options.toggle
			delete options.autofill

			if (!options.method) options.method = "get"
			options.method = options.method.toUpperCase()
			if (options.method === "GET" && payload) {
				url +=
					"?" +
					encodeURI(
						Object.keys(payload)
							.map(key => key + "=" + payload[key])
							.join("&")
					)
			} else if (payload) {
				options.headers = { "Content-Type": "application/json" }
				options.body = JSON.stringify(payload)
			}

			if (!toggle) toggle = value => this.$store.commit("setLoading", value)

			var data
			toggle(true)
			try {
				let response = await fetch(url, options)

				if (response.status >= 500) throw new Error(response.statusText)
				let contentType = response.headers.get("content-type")
				if (!contentType || !contentType.includes("application/json"))
					throw new Error("Expected JSON response from server but got: " + contentType)

				data = await response.json()
				if (data.error) throw new Error(data.error)
				if (autofill) for (let key in data) this[key] = data[key]
			} catch (error) {
				data = undefined
				this.$store.commit("error", error.message)
			}
			toggle(false)

			return data
		}
	},
}
