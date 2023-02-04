<template>
  <v-img
    align-self="center"
    :max-width="max_w"
    :min-width="min_w"
    width="100%"
    :src="'data:image/jpeg;base64,' + plot"
  />
</template>

<script>
export default {
  name: "ResultPlot",
  props: {
    max_w: { type: String, default: "100%" },
    min_w: { type: String, default: 250 },
    w: { type: String, default: "100%" },
    plot: String,
  },
};
</script>
