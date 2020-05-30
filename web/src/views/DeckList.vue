<template>
	<v-container>
		<v-row>
			<v-col>
				<h1>List of Decks</h1>
			</v-col>
		</v-row>

		<v-row align="center">
			<v-col cols="auto">
				<v-btn class="my-auto" color="blue darken-3" @click="addDeck" :loading="form.isLoading" dark>Add</v-btn>
			</v-col>
			<v-col>
				<v-form ref="form" @submit.prevent="addDeck">
					<v-text-field v-model="form.input" label="Deck Name" :rules="baseRules" :disabled="form.isLoading"></v-text-field>
				</v-form>
			</v-col>
		</v-row>

		<v-row v-for="deck in decks" :key="deck.id">
			<v-col>
				<Deck v-bind="deck" @delete-deck="deleteDeck"></Deck>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Deck from "@/components/Deck.vue"

export default {
	name: "Decks",
	components: { Deck },
	data() {
		return {
			decks: [],
			form: {
				input: "",
				isLoading: false,
			},
			baseRules: [v => !!v || "Field is required"],
		}
	},
	methods: {
		addDeck() {
			if (!this.$refs.form.validate()) return
			this.$fetcher({
				url: "/api/decks",
				method: "post",
				autofill: true,
				payload: { name: this.form.input },
				toggle: value => (this.form.isLoading = value),
			})
			this.$refs.form.reset()
		},
		async deleteDeck(id) {
			//
			var result = await this.$fetcher({ url: "/api" })
			console.log(result)
			console.log(!!result)
		},
	},
	created() {
		this.$fetcher({ url: "/api/decks", autofill: true })
	},
}
</script>
