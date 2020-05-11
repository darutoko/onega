<template>
	<v-container>
		<v-row align="center">
			<v-col cols="auto">
				<v-btn :to="{ name: 'DeckList' }" text>Go back</v-btn>
			</v-col>
			<v-col>
				<h1>{{ deck.name }}</h1>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="pa-0">
				<v-card @click="handleCardClick" @keyup.space="handleCardClick">
					<v-progress-linear color="blue darken-3" height="4" :value="progress"></v-progress-linear>
					<v-card-text>
						<pre class="display-4 text-center py-12" :class="cardClass">{{ cardText }}</pre>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "DeckMemorize",
	// components: {},
	data() {
		return {
			deck: { name: "" },
			cards: [],
			cardState: "front",
			cardIndex: 0,
		}
	},
	computed: {
		cardClass() {
			return {
				"font-weight-bold": this.cardState === "front",
				"font-weight-lightd": this.cardState === "back",
			}
		},
		cardText() {
			if (this.cards.length == 0) return ""
			if (this.cardIndex >= this.cards.length) {
				setTimeout(() => this.$router.push({ name: "DeckList" }), 500)
				return "All Done!"
			}
			return this.cards[this.cardIndex][this.cardState]
		},
		progress() {
			return Math.floor((this.cardIndex / this.cards.length) * 100)
		},
	},
	// watch: {},
	methods: {
		handleCardClick() {
			if (this.cardState === "front") this.flipCard()
			else if (this.cardState === "back") this.nextCard()
		},
		flipCard() {
			this.cardState = "back"
		},
		nextCard() {
			this.cardIndex++
			this.cardState = "front"
		},
	},
	async created() {
		await this.$fetcher({ url: "/api/decks/" + this.$route.params.id + "/memorize", autofill: true })
	},
	// mounted() {},
}
</script>
