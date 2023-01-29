<template>
  <v-card class="pa-3">
    <v-tabs v-model="tab" align-with-title>
      <v-tab href="#form"> Simulação </v-tab>
      <v-tab href="#results"> Resultado </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="mt-5">
      <v-tab-item value="form">
        <SimulationForm />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import SimulationForm from "@/components/SimulationForm";
export default {
  name: "IndexPage",
  components: { SimulationForm },
  data() {
    return {
      tab: "",
    };
  },
};
</script>
