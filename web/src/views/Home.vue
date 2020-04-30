<template>
	<v-row>
		<v-col>
			<router-link :to="{ name: 'DeckList' }">To the decks</router-link>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: "Home",
	components: {},
}
</script>
