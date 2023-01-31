<template>
  <v-card class="pb-3" :loading="loading">
    <v-tabs v-model="tab" align-with-title>
      <v-tab href="#form"> Simulação </v-tab>
      <v-tab href="#results"> Resultado </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="mt-5">
      <v-tab-item value="form">
        <SimulationForm @compile="submitForm" />
      </v-tab-item>
      <v-tab-item value="results">
        <SimulationResults />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import SimulationForm from "@/components/SimulationForm";
import SimulationResults from "@/components/SimulationResults";
export default {
  name: "IndexPage",
  components: { SimulationForm, SimulationResults },
  data() {
    return {
      tab: "",
      loading: false
    };
  },
  methods:{
    submitForm(event){
      this.loading = true
      setTimeout(() => {this.loading = false}, 1000)
      this.$axios.post('/', event).then((res) => {console.log(res)}).catch((error) => console.log(error))
    }
  }
};
</script>
