<template>
  <ValidationObserver ref="observer" v-slot="{ valid, invalid }">
    <form @submit.prevent="onSubmit">
      <v-row>
        <v-col
          v-for="field in fields"
          :key="field.name"
          :cols="12 / field.cols"
        >
          <Input
            :valid="valid"
            :title="field.title"
            :name="field.name"
            :type="field.type"
            :rules="field.rules"
            :options="field?.options"
          />
        </v-col>
      </v-row>
      <v-btn type="submit" :color="button.color" :disabled="invalid">
        {{ button.btn_name }} <v-icon class="ml-2">{{ button.icon }}</v-icon>
      </v-btn>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    button: Object, //color, btn_name, icon
    fields: Array, //rules, title, type
  },
  methods: {
    onSubmit(values) {
      this.$emit("values", values);
    },
  },
};
</script>

<style scoped></style>
