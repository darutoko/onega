<template>
	<v-container>
		<v-row align="center">
			<v-col cols="auto">
				<v-btn :to="{ name: 'DeckList' }" text>Go back</v-btn>
			</v-col>
			<v-col>
				<h1>Deck Name</h1>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="pa-0">
				<v-card @click="handleCardClick" @keyup.space="handleCardClick">
					<v-progress-linear color="blue darken-3" height="4" :value="progress"></v-progress-linear>
					<v-card-text>
						<pre class="display-4 font-weight-bold text-center py-12">{{ cardText }}</pre>
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
			cards: [
				{
					id: 1,
					input: "input 1",
					front: "front 1",
					back: "back 1",
				},
				{
					id: 2,
					input: "input 2",
					front: "front 2",
					back: "back 2",
				},
				{
					id: 3,
					input: "input 3",
					front: "front 3",
					back: "back 3",
				},
			],
			cardState: "front",
			cardIndex: 0,
		}
	},
	computed: {
		cardText() {
			if (this.cardIndex == this.cards.length) return "All Done!"
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
	// created() {},
	// mounted() {},
}
</script>
