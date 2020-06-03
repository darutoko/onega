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

		<v-row align="center">
			<v-col cols="3">
				<v-text-field
					v-model="deckForm.streakSize"
					ref="streakSize"
					label="Streak size"
					placeholder="Streak size"
					:rules="rules"
				></v-text-field>
			</v-col>
			<v-col cols="3">
				<v-text-field
					v-model="deckForm.memorizeSize"
					ref="memorizeSize"
					label="Memorize size"
					placeholder="Memorize size"
					:rules="rules"
				></v-text-field>
			</v-col>
			<v-col cols="3">
				<v-text-field v-model="deckForm.testSize" ref="testSize" label="Test size" placeholder="Test size" :rules="rules"></v-text-field>
			</v-col>
			<v-col cols="3">
				<v-btn
					color="blue darken-3"
					:loading="isDeckFormUploading"
					:disabled="isSaveDisabled"
					@click="submitDeckForm"
					:dark="!isSaveDisabled"
					>Save</v-btn
				>
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
			<v-col class="pa-0">
				<v-data-table :headers="headers" :items="cards" v-model="selectedCards" sort-by="input" :items-per-page="25" show-select>
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
					<template v-slot:item.streak="{ item }">
						<v-progress-circular color="success" :rotate="-90" width="6" :value="(item.streak * 100) / deck.streakSize">{{
							item.streak
						}}</v-progress-circular>
					</template>
					<template v-slot:item.updatedAt="{ item }">
						{{ formatDate(item.updatedAt) }}
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
			deckForm: {
				streakSize: 0,
				memorizeSize: 0,
				testSize: 0,
			},
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
					sortable: true,
					width: "88%",
				},
				{
					text: "Streak",
					value: "streak",
					sortable: true,
					width: "5%",
				},
				{
					text: "Last test",
					value: "updatedAt",
					sortable: true,
					width: "7%",
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
			rules: [
				v => !!v || "Required",
				v => /^\d+$/.test(v) || "Value must be a positive integer number",
				v => v > 0 || "Value must be greater than zero",
			],
			isDeckFormUploading: false,
		}
	},
	computed: {
		isCardsSelected() {
			return this.selectedCards.length > 0
		},
		isSaveDisabled() {
			return Object.keys(this.deckForm).reduce((result, field) => (result = result && this.deckForm[field] == this.deck[field]), true)
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
		formatDate(updatedAt) {
			var date = new Date(updatedAt)
			var day = date.getDate()
			var month = date.getMonth() + 1
			var year = date.getFullYear()
			if (day < 10) day = "0" + day
			if (month < 10) month = "0" + month
			return year + "-" + month + "-" + day
		},
		async submitDeckForm() {
			var fields = Object.keys(this.deckForm)
			if (!fields.reduce((result, field) => (result = result && this.$refs[field].validate()), true)) return

			var payload = {}
			fields.forEach(field => {
				if (this.deckForm[field] != this.deck[field]) payload[field] = this.deckForm[field]
			})
			if (!Object.keys(payload).length) return

			await this.$fetcher({
				url: "/api/decks/" + this.$route.params.id,
				method: "put",
				payload,
				autofill: true,
				toggle: value => (this.isDeckFormUploading = value),
			})
		},
		resetDeckForm() {
			Object.keys(this.deckForm).forEach(field => (this.deckForm[field] = this.deck[field]))
		},
	},
	async created() {
		await this.$fetcher({ url: "/api/decks/" + this.$route.params.id, autofill: true })
		this.resetDeckForm()
	},
}
</script>
