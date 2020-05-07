<template>
	<v-app>
		<v-navigation-drawer app v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp"> </v-navigation-drawer>

		<v-app-bar app color="blue darken-3" dark :clipped-left="$vuetify.breakpoint.lgAndUp">
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>
				<span>Onega</span>
			</v-toolbar-title>
		</v-app-bar>

		<v-content>
			<v-progress-linear
				class="mt-1"
				:active="this.$store.state.isLoading"
				color="blue darken-3"
				height="4"
				:style="{ 'z-index': 100 }"
				fixed
				indeterminate
			></v-progress-linear>
			<v-container>
				<v-row>
					<v-col>
						<v-alert v-for="(alert, index) in $store.state.alerts" :color="alert.color" :type="alert.type" :key="index" dark dismissible>
							{{ alert.message }}
						</v-alert>
						<v-snackbar v-model="isSnackbarVisible" :timeout="$store.state.snackbar.timeout" left>
							{{ $store.state.snackbar.message }}
							<v-btn @click="isSnackbarVisible = false" text dark>Close</v-btn>
						</v-snackbar>
					</v-col>
				</v-row>
			</v-container>

			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: "App",

	components: {},

	data: () => ({
		drawer: null,
	}),
	computed: {
		isSnackbarVisible: {
			get() {
				return this.$store.state.snackbar.isVisible
			},
			set(value) {
				if (!value) this.$store.commit("hideSnackbar")
			},
		},
	},
}
</script>
