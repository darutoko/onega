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
			<v-col>
				<v-card>
					<v-progress-linear color="blue darken-3" height="4" :value="progress"></v-progress-linear>
					<v-card-text>
						<pre class="display-2 font-weight-bold text-center py-10">{{ cardText }}</pre>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-sheet class="white--text text-center py-5 my-4 headline darken-3" :class="bannerClass">{{ bannerText }}</v-sheet>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-text-field v-model="testInput" label="Input" placeholder="Input" @keyup.enter="handleInput" autofocus></v-text-field>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "DeckTest",
	// components: {},
	data() {
		return {
			cards: [
				{
					id: 1,
					input: "input 1",
					front: "front 1",
					back: "back 1",
					testByFront: false,
				},
				{
					id: 2,
					input: "input 2",
					front: "front 2",
					back: "back 2",
					testByFront: false,
				},
				{
					id: 3,
					input: "input 3",
					front: "front 3",
					back: "back 3",
					testByFront: true,
				},
			],
			cardIndex: 0,
			testInput: "",
			bannerClass: {
				white: true,
			},
			bannerText: "!",
		}
	},
	computed: {
		cardText() {
			if (this.cardIndex == this.cards.length) {
				setTimeout(() => {
					this.$router.push({ name: "DeckList" })
				}, 500)
				return "All Done!"
			}
			let card = this.cards[this.cardIndex]
			if (card.testByFront) return card.front
			else return card.back
		},
		progress() {
			return Math.floor((this.cardIndex / this.cards.length) * 100)
		},
	},
	// watch: {},
	methods: {
		handleInput() {
			let isTestPasses = this.testInput === this.cards[this.cardIndex].input
			this.bannerText = this.cards[this.cardIndex].input
			this.bannerClass = {
				red: !isTestPasses,
				green: isTestPasses,
				white: false,
			}
			setTimeout(() => {
				if (isTestPasses) {
					this.cardIndex++
					this.testInput = ""
				}
				this.bannerText = "!"
				this.bannerClass = {
					red: false,
					green: false,
					white: true,
				}
			}, 3000)
		},
	},
	// created() {},
	// mounted() {},
}
</script>
