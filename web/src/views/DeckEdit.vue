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
											<component :is="cardForm" @add-card="addCard"></component>
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
							Delete items?
						</v-card-text>
						<v-card-text v-else-if="dialog.type === 'move'">
							Move items?
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions>
							<v-btn color="red darken-3" @click="confirmDialog" text>Ok</v-btn>
							<v-spacer></v-spacer>
							<v-btn @click="hideDialog" text>Cancel</v-btn>
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
			deck: {
				name: "Deck Name",
				streakSize: 7,
			},
			dialog: {
				show: false,
				type: "move",
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
					value: "successStreak",
					sortable: false,
					width: "1%",
				},
				{
					text: "Last test",
					value: "testedAt",
					sortable: false,
					width: "1%",
				},
			],
			selectedCards: [],
			cards: [
				{
					id: 1,
					input: "input 1",
					testsCount: 5,
					successStreak: 7,
					testedAt: 12122112,
				},
				{
					id: 2,
					input: "input 2",
					testsCount: 5,
					successStreak: 2,
					testedAt: 12122112,
				},
			],
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
		addCard(card) {
			this.cards.push({
				id: this.cards.length + 1,
				testsCount: 5,
				successStreak: 2,
				testedAt: 12122112,
				...card,
			})
		},
		confirmDialog() {
			console.log(this.selectedCards)
			if (this.dialog.type === "delete") this.deleteCards()
			else if (this.dialog.type === "move") this.moveCards()
			this.hideDialog()
		},
		deleteCards() {},
		hideDialog() {
			this.dialog.show = false
		},
		moveCards() {},
		showDialog(event) {
			this.dialog.type = event.currentTarget.dataset.dialogType
			this.dialog.show = true
		},
	},
}
</script>
