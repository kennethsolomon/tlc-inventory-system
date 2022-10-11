<template>
  <Tab :tab_name="tab_name" />
</template>

<script>
export default {
  data: () => ({
    tab_name: ["All Property", "Consumable", "Non-Consumable"],
  }),
};
</script>

<style scoped></style>
