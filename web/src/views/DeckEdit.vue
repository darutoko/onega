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
				<v-expansion-panels flat>
					<v-expansion-panel>
						<v-expansion-panel-header>
							<h3>Add Flash Card</h3>
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-sheet class="px-4" elevation="5">
								<v-container fluid>
									<v-row align="center">
										<v-col cols="auto" class="pl-0">Card Type</v-col>
										<v-col>
											<v-select v-model="cardForm" :items="cardForms"></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col class="pa-0">
											<component :is="cardForm" @add-card="addCard" :is-card-uploading="isLoading"></component>
										</v-col>
									</v-row>
								</v-container>
							</v-sheet>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-data-table :headers="headers" :items="cards" v-model="selectedCards" show-select>
					<template v-slot:top>
						<v-container fluid>
							<v-row>
								<v-col></v-col>
								<v-col cols="auto">
									<v-btn
										color="blue darken-3"
										:disabled="!isCardsSelected"
										:dark="isCardsSelected"
										@click.stop="showDialog"
										data-dialog-type="move"
										>Move</v-btn
									>
								</v-col>
								<v-col cols="auto">
									<v-btn
										color="red darken-3"
										:disabled="!isCardsSelected"
										:dark="isCardsSelected"
										@click.stop="showDialog"
										data-dialog-type="delete"
										>Delete</v-btn
									>
								</v-col>
							</v-row>
						</v-container>
					</template>
					<template v-slot:item.successStreak="{ item }">
						<v-progress-circular color="success" :rotate="-90" width="6" :value="(item.successStreak * 100) / deck.streakSize">{{
							item.successStreak
						}}</v-progress-circular>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-dialog v-model="dialog.show" max-width="500">
					<v-card>
						<v-card-title class="headline red darken-3 white--text">
							Attention!
						</v-card-title>
						<v-divider class="mb-4"></v-divider>
						<v-card-text v-if="dialog.type === 'delete'">
							Delete <strong>{{ this.selectedCards.length }}</strong> cards?
						</v-card-text>
						<v-card-text v-else-if="dialog.type === 'move'">
							Move <strong>{{ this.selectedCards.length }}</strong> cards to:
							<v-select v-model="dialog.selected" :items="dialog.select"></v-select>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-btn color="red darken-3" @click="confirmDialog" :loading="dialog.isLoading" text>Ok</v-btn>
							<v-spacer></v-spacer>
							<v-btn @click="hideDialog" :disabled="dialog.isLoading" text>Cancel</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import CardFormDefault from "@/components/CardFormDefault.vue"
import CardFormYaDi from "@/components/CardFormYaDi.vue"

export default {
	name: "DeckEdit",
	components: {
		CardFormDefault,
		CardFormYaDi,
	},
	data() {
		return {
			isLoading: false,
			deck: { name: "" },
			dialog: {
				show: false,
				type: "move",
				isLoading: false,
				select: [],
				selected: "",
			},
			headers: [
				{
					text: "Input",
					value: "input",
					sortable: false,
					width: "97%",
				},
				{
					text: "Streak",
					value: "streak",
					sortable: false,
					width: "1%",
				},
				{
					text: "Last test",
					value: "updatedAt",
					sortable: false,
					width: "1%",
				},
			],
			selectedCards: [],
			cards: [],
			cardForm: "CardFormDefault",
			cardForms: [
				{
					text: "Default",
					value: "CardFormDefault",
				},
				{
					text: "Yandex Dictionary",
					value: "CardFormYaDi",
				},
			],
		}
	},
	computed: {
		isCardsSelected() {
			return this.selectedCards.length > 0
		},
	},
	methods: {
		async addCard(card) {
			await this.$fetcher({
				url: "/api/cards",
				method: "post",
				autofill: true,
				payload: { deckId: this.$route.params.id, ...card },
				toggle: value => (this.isLoading = value),
			})
		},
		async confirmDialog() {
			if (this.dialog.type === "delete") await this.deleteCards()
			else if (this.dialog.type === "move") await this.moveCards()
			this.hideDialog()
		},
		async deleteCards() {
			await this.$fetcher({
				url: "/api/cards",
				method: "delete",
				autofill: true,
				payload: { deckId: this.$route.params.id, ids: this.selectedCards.map(c => c.id) },
				toggle: value => (this.dialog.isLoading = value),
			})
		},
		hideDialog() {
			this.dialog.show = false
		},
		async moveCards() {
			await this.$fetcher({
				url: "/api/cards",
				method: "put",
				autofill: true,
				payload: { deckId: this.$route.params.id, newDeckId: this.dialog.selected, ids: this.selectedCards.map(c => c.id) },
				toggle: value => (this.dialog.isLoading = value),
			})
		},
		async showDialog(event) {
			this.dialog.type = event.currentTarget.dataset.dialogType
			this.dialog.show = true
			if (this.dialog.type === "move") {
				var result = await this.$fetcher({ url: "/api/decks", toggle: value => (this.dialog.isLoading = value) })
				result = result.decks.filter(d => d.id != this.$route.params.id).map(d => ({ text: d.name, value: d.id }))
				this.dialog.select = result
				this.dialog.selected = result[0].value
			}
		},
	},
	async created() {
		await this.$fetcher({ url: "/api/decks/" + this.$route.params.id, autofill: true })
	},
}
</script>
