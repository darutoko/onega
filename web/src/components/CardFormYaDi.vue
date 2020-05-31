<template>
	<v-form>
		<v-container fluid>
			<v-row align="center">
				<v-col cols="12" md="1" class="pl-0">
					<v-select v-model="lang" :items="langs"></v-select>
				</v-col>
				<v-col class="px-0">
					<v-text-field
						v-model="word"
						name="word"
						label="Enter a word"
						@keyup.enter="getWord"
						:disabled="isWordLoading"
						autocomplete="off"
					></v-text-field>
				</v-col>
				<v-col cols="auto" class="pr-0">
					<v-btn color="blue darken-3" dark @click="getWord" :loading="isWordLoading">Lookup</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-select v-model="defSelected" :items="defOptions"></v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="1">Input</v-col>
				<v-col>{{ input }}</v-col>
			</v-row>
			<v-row align="center">
				<v-col cols="1">Front</v-col>
				<v-col>
					<pre>{{ front }}</pre>
				</v-col>
			</v-row>
			<v-row align="center">
				<v-col cols="1">Back</v-col>
				<v-col>
					<v-checkbox v-model="backSelected" v-for="row in tr" :label="row" :value="row" :key="row" dense></v-checkbox>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-btn color="blue darken-3" dark @click="addCard" :loading="isCardUploading">Add Card</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
export default {
	name: "CardFormYaDi",
	props: {
		isCardUploading: Boolean,
	},
	data() {
		return {
			backSelected: [],
			def: [],
			defSelected: "",
			lang: "fr-ru",
			langs: [
				{
					text: "fr-ru",
					value: "fr-ru",
				},
			],
			word: "",
			isWordLoading: false,
		}
	},
	computed: {
		defOptions() {
			var options = this.def.map((def, i) => ({ text: `${i + 1}. ${def.pos}`, value: i }))
			if (options.length) this.defSelected = 0
			return options
		},
		input() {
			if (!this.def.length || this.defSelected === "") return ""
			return this.def[this.defSelected].text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		},
		front() {
			if (!this.def.length || this.defSelected === "") return ""
			return `${this.def[this.defSelected].text}\n[${this.def[this.defSelected].ts}]`
		},
		tr() {
			if (!this.def.length || this.defSelected === "") return ""
			return this.def[this.defSelected].tr
		},
	},
	methods: {
		addCard() {
			if (!this.input || !this.front || this.backSelected.length < 1) return
			this.$emit("add-card", {
				input: this.input,
				front: this.front,
				back: this.getBack(),
				testByFront: false,
			})
			this.clear()
		},
		clear() {
			this.word = ""
			this.backSelected = []
			this.def = []
			this.defSelected = ""
		},
		getBack() {
			if (this.backSelected.length == 1) return this.backSelected[0]
			return this.backSelected.map((s, i) => `${i + 1}. ${s}`).join("\n")
		},
		async getWord() {
			if (!this.word) return
			var result = await this.$fetcher({
				url: "/api/yandex_dictionary",
				method: "get",
				autofill: true,
				payload: { text: this.word, lang: this.lang },
				toggle: value => (this.isWordLoading = value),
			})
			if (result) this.word = ""
		},
	},
}
</script>
