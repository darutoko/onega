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
				<v-card>
					<v-card-title>{{ deck.name }}</v-card-title>
					<v-card-text>
						Deck status since last test
						<v-progress-linear
							:value="Math.floor((deck.memorizedCards / deck.totalCards) * 100)"
							color="green darken-3"
							background-color="red darken-2"
							height="25"
						>
							<strong class="white--text">{{ deck.memorizedCards }}/{{ deck.totalCards }}</strong>
						</v-progress-linear>
					</v-card-text>
					<v-card-actions>
						<v-btn color="blue darken-3" :to="{ name: 'DeckMemorize', params: { id: deck.id } }" dark>Memorize</v-btn>
						<v-btn color="green darken-3" :to="{ name: 'DeckTest', params: { id: deck.id } }" dark>Test</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="blue-grey" :to="{ name: 'DeckEdit', params: { id: deck.id } }" dark>Edit</v-btn>
						<v-btn color="red darken-3" @click="deleteDeck" dark>Delete</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "Decks",
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
		async deleteDeck() {
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
