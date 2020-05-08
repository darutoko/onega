<template>
	<v-form>
		<v-container fluid>
			<v-row align="center">
				<v-col cols="12" md="1" class="pl-0">
					<v-select v-model="lang" :items="langs"></v-select>
				</v-col>
				<v-col class="px-0">
					<v-text-field v-model="word" name="word" label="Enter a word" @keyup.enter="getWord" :disabled="isWordLoading"></v-text-field>
				</v-col>
				<v-col cols="auto" class="pr-0">
					<v-btn color="blue darken-3" dark @click="getWord" :loading="isWordLoading">Lookup</v-btn>
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
			input: "",
			front: "",
			tr: [],
			backSelected: [],
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
	methods: {
		addCard() {
			if (!this.input || !this.front || this.back.length < 1) return
			this.$emit("add-card", {
				input: this.input,
				front: this.front,
				back: this.back,
				testByFront: false,
			})
			// this.clear()
		},
		clear() {
			this.input = ""
			this.front = ""
			this.word = ""
			this.tr = []
			this.backSelected = []
		},
		async getWord() {
			if (!this.word) return
			var result = await this.$fetcher({
				url: "/api/yandex_dictionary",
				method: "get",
				payload: { text: this.word, lang: this.lang },
				toggle: value => (this.isWordLoading = value),
			})
			if (!result) return
			this.word = ""
			this.input = result.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
			this.front = `${result.text}\n[${result.ts}]`
			this.tr = result.tr
		},
	},
	computed: {
		back() {
			return this.backSelected.join("\n")
		},
	},
}
</script>
