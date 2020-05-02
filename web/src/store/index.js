import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		alerts: [],
	},
	mutations: {
		error(state, message) {
			state.alerts.push({ color: "red darken-3", type: "error", message })
		},
		success(state, message) {
			state.alerts.push({ color: "green darken-3", type: "success", message })
		},
	},
	actions: {},
	modules: {},
})
