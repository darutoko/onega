import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		alerts: [],
		isLoading: false,
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
		info(state, message) {
			state.alerts.push({ color: "blue darken-3", type: "info", message })
		},
		snackbar(state, message) {
			state.snackbar.message = message
			state.snackbar.isVisible = true
		},
		hideSnackbar(state) {
			state.snackbar.isVisible = false
		},
		isLoadingOn(state) {
			state.isLoading = true
		},
		isLoadingOff(state) {
			state.isLoading = false
		},
		setLoading(state, value) {
			state.isLoading = value
		},
	},
	actions: {},
	modules: {},
})
