import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		alerts: [],
		snackbar: {
			message: "",
			timeout: 3000,
			isVisible: false,
		},
	},
	mutations: {
		error(state, message) {
			state.alerts.push({ color: "red darken-3", type: "error", message })
		},
		success(state, message) {
			state.alerts.push({ color: "green darken-3", type: "success", message })
		},
		snackbar(state, message) {
			state.snackbar.message = message
			state.snackbar.isVisible = true
		},
		hideSnackbar(state) {
			state.snackbar.isVisible = false
		},
	},
	actions: {},
	modules: {},
})
