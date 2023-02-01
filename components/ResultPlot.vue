<template>
  <v-img
    :max-width="max_w"
    :min-width="min_w"
    :src="'data:image/jpeg;base64,' + plot"
  />
</template>

<script>
export default {
  name: "ResultPlot",
  props: { max_w: String, min_w: String, w: String, plot: String },
};
</script>
