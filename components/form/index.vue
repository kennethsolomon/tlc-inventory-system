<template>
  <ValidationObserver ref="observer" v-slot="{ valid, invalid }">
    <form @submit.prevent="onSubmit">
      <div
        v-for="field in fields"
        :key="field.name"
      >
        <Input
          :valid="valid"
          :title="field.title"
          :name="field.name"
          :type="field.type"
          :rules="field.rules"
        />
      </div>
        <v-btn
          type="submit"
          :color="button.color"
          :disabled="invalid"
        >
          {{button.btn_name}} <v-icon class="ml-2">{{button.icon}}</v-icon>
        </v-btn>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  data: () => ({
  }),
  props: {
    button: Object, //color, btn_name, icon
    fields: Array, //rules, title, type
  },
  methods: {
    onSubmit(values) {
      console.log(values.target.elements)
      // const { first_item } =  values.target.elements
      // console.log(first_item.', vaues)
    }
  }
};
</script>

<style scoped></style>
