<template>
  <v-alert v-if="show" v-model="show" class="alert" :color="alert_type" dismissible> <div class="text"> {{ message }} </div>  </v-alert>
</template>

<script>
export default {
  name: "CustomAlert",
  data() {
    return {
      show: false,
      alert_type: "",
      message: "",
    };
  },
  created() {
    this.$nuxt.$on("alert", (data) => {
      this.message = data.message;
      this.alert_type = data.type;
      this.show = true;
    });
  },
};
</script>

<style scoped>
.alert {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 50px;
  z-index: 999999;
}

.text {
    text-align: center;
    color: azure;
    font-weight: bold;
}
</style>
