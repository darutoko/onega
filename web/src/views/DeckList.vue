<template>
	<v-container>
		<v-row>
			<v-col>
				<h1>List of Decks</h1>
			</v-col>
		</v-row>

		<v-row align="center">
			<v-col cols="auto">
				<v-btn class="my-auto" color="blue darken-3" dark>Add</v-btn>
			</v-col>
			<v-col>
				<v-text-field label="Deck Name"></v-text-field>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-card>
					<v-card-title>Deck Name</v-card-title>
					<v-card-text>
						Deck Status
						<v-progress-linear value="80" color="green darken-3" height="25">
							<strong class="white--text">40/50</strong>
						</v-progress-linear>
					</v-card-text>
					<v-card-actions>
						<v-btn color="blue darken-3" :to="{ name: 'DeckMemorize', params: { id: '1' } }" dark>Memorize</v-btn>
						<v-btn color="green darken-3" :to="{ name: 'DeckTest', params: { id: '1' } }" dark>Test</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="blue-grey" :to="{ name: 'DeckEdit', params: { id: '1' } }" dark>Edit</v-btn>
						<v-btn color="red darken-3" dark>Delete</v-btn>
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
			//
		}
	},
}
</script>
