import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"

Vue.config.productionTip = false
Vue.prototype.$fetcher = function(url, method, data) {
	var options = {
		method: method || "GET",
	}
	if (data) {
		options.headers = { "Content-Type": "application/json" }
		options.body = JSON.stringify(data)
	}
	fetch(url, options)
		.then(response => {
			if (response.status >= 500) throw new Error(response.statusText)

			var contentType = response.headers.get("content-type")
			if (!contentType || !contentType.includes("application/json"))
				throw new Error("Expected JSON response from server but got: " + contentType)

			return response.json()
		})
		.then(result => {
			if (result.error) throw new Error(result.error)
			for (let key in result) this[key] = result[key]
		})
		.catch(error => {
			this.$store.commit("error", error.message)
		})
}

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount("#app")
