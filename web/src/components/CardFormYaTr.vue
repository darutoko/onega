<template>
	<v-form>
		<v-container fluid>
			<v-row align="center">
				<v-col cols="12" md="1" class="pl-0">
					<v-select v-model="lang" :items="langs"></v-select>
				</v-col>
				<v-col class="px-0">
					<v-text-field v-model="wordField" name="word" label="Enter a word" @keyup.enter="getWord"></v-text-field>
				</v-col>
				<v-col cols="auto" class="pr-0">
					<v-btn color="blue darken-3" dark @click="getWord">Lookup</v-btn>
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
					<v-checkbox v-model="back" v-for="row in word.tr" :label="row" :value="row" :key="row" dense></v-checkbox>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-btn color="blue darken-3" dark @click="addCard">Add Card</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
export default {
	name: "CardFormYaTr",
	data() {
		return {
			back: [],
			lang: "fr-ru",
			langs: [
				{
					text: "fr-ru",
					value: "fr-ru",
				},
			],
			word: {},
			wordField: "",
		}
	},
	methods: {
		addCard() {
			if (!this.input || !this.front || this.back.length < 1) return
			this.$emit("add-card", {
				input: this.input,
				front: this.front,
				back: this.back.join("\n"),
				testByFront: false,
			})
			this.clear()
		},
		clear() {
			this.back = []
			this.wordField = ""
			this.word = {}
		},
		getWord() {
			if (!this.wordField) return
			this.clear()
			this.word = {
				text: "mettre",
				ts: "mɛtʁ",
				tr: ["положить, поставить, ставить", "надеть, надевать", "включать, включить"],
			}
		},
	},
	computed: {
		input() {
			return this.word.text || ""
		},
		front() {
			if (!this.word.text) return ""
			return `${this.word.text}\n[${this.word.ts}]`
		},
	},
}
</script>
