<template>
  <div>
    <v-app>
      <v-main>
        <v-container class="fill-height" fluid>
          <CustomAlert />
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import CustomAlert from "@/components/CustomAlert.vue";
export default {
  components: { CustomAlert },
};
</script>

<style scoped>

*{
  font-family: Roboto

}

</style>
