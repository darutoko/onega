<template>
	<v-card>
		<v-card-title>{{ name }}</v-card-title>
		<v-card-text>
			<v-container class="pa-0">
				<v-row>
					<v-col>Deck status, containing {{ this.totalCards }} cards</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col :cols="columns.completed" class="pa-0 green darken-3 text-center">
						<strong class="white--text">{{ this.completedCards }}</strong>
					</v-col>
					<v-col :cols="columns.progressed" class="pa-0 blue darken-3 text-center">
						<strong class="white--text">{{ this.progressedCards }}</strong>
					</v-col>
					<v-col :cols="columns.failed" class="pa-0 red darken-3 text-center">
						<strong class="white--text">{{ this.failedCards }}</strong>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-select v-model="subset" :items="subsets"></v-select>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-btn color="blue darken-3" :to="{ name: 'DeckMemorize', params: { id: id }, query: { subset } }" dark>Memorize</v-btn>
			<v-btn color="green darken-3" :to="{ name: 'DeckTest', params: { id: id }, query: { subset } }" dark>Test</v-btn>
			<v-spacer></v-spacer>
			<v-btn color="blue-grey" :to="{ name: 'DeckEdit', params: { id: id } }" dark>Edit</v-btn>
			<v-btn color="red darken-3" @click="handleDelete" dark>Delete</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "Deck",
	// components: {},
	props: ["id", "name", "totalCards", "completedCards", "failedCards"],
	data() {
		return {
			columns: {
				completed: 1,
				progressed: 1,
				failed: 1,
			},
			subset: "incomplete",
			subsets: [
				{
					text: "Cards: all",
					value: "all",
				},
				{
					text: "Cards: incomplete",
					value: "incomplete",
				},
				{
					text: "Cards: failed",
					value: "failed",
				},
			],
		}
	},
	computed: {
		progressedCards() {
			return this.totalCards - this.completedCards - this.failedCards
		},
	},
	// watch: {},
	methods: {
		calculateCoumnSize(count) {
			var size = Math.floor((count * 12) / this.totalCards)
			if (size == 0) return 1
			if (size > 10) return 10
			return size
		},
		handleDelete() {
			this.$emit("delete-deck", id)
		},
	},
	created() {
		this.columns.completed = this.calculateCoumnSize(this.completedCards)
		this.columns.failed = this.calculateCoumnSize(this.failedCards)
		this.columns.progressed = 12 - this.columns.completed - this.columns.failed
	},
	// mounted() {},
}
</script>
