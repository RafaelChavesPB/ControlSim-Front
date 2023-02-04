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
  props: { max_w: String, min_w: String, w: String, plot: String },
};
</script>
