<template>
	<v-form ref="form" :disabled="isCardUploading">
		<v-container fluid>
			<v-row>
				<v-col class="pa-0">
					<v-text-field v-model="input" name="input" label="Input" :rules="baseRules"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="pa-0">
					<v-textarea v-model="front" name="front" label="Front" rows="3" :rules="baseRules"></v-textarea>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="pa-0">
					<v-textarea v-model="back" name="back" label="Back" rows="3" :rules="baseRules"></v-textarea>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="pa-0">
					<v-switch v-model="testByFront" label="Use card front in tests"></v-switch>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="auto">
					<v-btn color="blue darken-3" dark @click.prevent="submitForm" :loading="isCardUploading">Add Card</v-btn>
				</v-col>
				<v-col>
					<v-btn color="red darken-3" @click.prevent="clearForm" dark>Clear</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
export default {
	name: "CardFormDefault",
	props: {
		isCardUploading: Boolean,
	},
	data() {
		return {
			input: "",
			front: "",
			back: "",
			testByFront: false,
			baseRules: [v => !!v || "Field is required"],
		}
	},
	methods: {
		clearForm() {
			this.$refs.form.reset()
		},
		submitForm() {
			if (!this.$refs.form.validate()) return
			this.$emit("add-card", {
				input: this.input,
				front: this.front,
				back: this.back,
				testByFront: this.testByFront,
			})
			this.$refs.form.reset()
		},
	},
}
</script>
