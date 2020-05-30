<template>
	<v-card>
		<v-card-title>{{ name }}</v-card-title>
		<v-card-text>
			Deck status since last test
			<v-progress-linear
				:value="Math.floor((memorizedCards / totalCards) * 100)"
				color="green darken-3"
				background-color="red darken-2"
				height="25"
			>
				<strong class="white--text">{{ memorizedCards }}/{{ totalCards }}</strong>
			</v-progress-linear>
		</v-card-text>
		<v-card-actions>
			<v-btn color="blue darken-3" :to="{ name: 'DeckMemorize', params: { id: id } }" dark>Memorize</v-btn>
			<v-btn color="green darken-3" :to="{ name: 'DeckTest', params: { id: id } }" dark>Test</v-btn>
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
	props: ["id", "name", "totalCards", "memorizedCards"],
	data() {
		return {
			//
		}
	},
	computed: {
		//
	},
	// watch: {},
	methods: {
		handleDelete() {
			this.$emit("delete-deck", id)
		},
	},
	// created() {},
	// mounted() {},
}
</script>
