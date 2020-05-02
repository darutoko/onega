<template>
	<v-container>
		<v-row>
			<v-col>
				<router-link :to="{ name: 'DeckList' }">To the decks</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "Home",
	components: {},
}
</script>
