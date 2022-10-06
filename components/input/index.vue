<template>
	<ValidationProvider
		v-slot="{ errors }"
		:rules="rules"
		:name="title"
	>
		<v-text-field
      v-model="model"
      :name="name"
      :label="title"
      :placeholder="title"
      :type="type"
      :error-messages="errors"
      :success="valid"
		></v-text-field>
	</ValidationProvider>
</template>

<script>
	export default {
    props: {
      title: String,
      name: String,
      rules: String,
      type: String,
      value: String,
      valid: Boolean,
    },
    data: () => ({
      model: null
    }),
    mounted () {
      if(this.value) this.model = this.value
    },
	}
</script>

<style scoped>

</style>