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
			deck: { name: "" },
			cards: [],
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
			if (this.cards.length == 0) return ""
			if (this.cardIndex >= this.cards.length) {
				setTimeout(() => this.$router.push({ name: "DeckList" }), 500)
				return "All Done!"
			}
			var card = this.cards[this.cardIndex]
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
			var card = this.cards[this.cardIndex]
			var isTestPassed = this.testInput === card.input
			if (!card.isStreakUpdated) this.updateCardStreak(card, isTestPassed)

			if (isTestPassed) {
				this.cardIndex++
				this.testInput = ""
			}

			this.bannerText = card.input
			this.bannerClass = {
				red: !isTestPassed,
				green: isTestPassed,
				white: false,
			}

			setTimeout(() => {
				this.bannerText = "!"
				this.bannerClass = {
					red: false,
					green: false,
					white: true,
				}
			}, 3000)
		},
		updateCardStreak(card, isTestPassed) {
			this.$fetcher({
				url: "/api/cards/" + card.id,
				method: "put",
				payload: { isTestPassed },
				toggle: value => {},
			})
			card.isStreakUpdated = true
		},
	},
	async created() {
		await this.$fetcher({ url: "/api/decks/" + this.$route.params.id + "/test", autofill: true })
	},
	// mounted() {},
}
</script>
