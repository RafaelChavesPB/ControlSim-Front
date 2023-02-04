<template>
  <v-row align="center" justify="center">
    <v-col xl="8" lg="10" md="11" sm="12">
      <v-card class="pb-3" :loading="loading">
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#form"> Simulação </v-tab>
          <v-tab
            href="#results"
            :disabled="Object.keys(this.results).length === 0"
          >
            Resultado
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="mt-5">
          <v-tab-item value="form">
            <SimulationForm @compile="submitForm" :loading="loading" />
          </v-tab-item>
          <v-tab-item value="results">
            <SimulationResults :results="results" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
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
      loading: false,
      results: {},
    };
  },
  methods: {
    submitForm(payload) {
      this.loading = true;
      this.$axios
        .post("/", payload)
        .then((res) => {
          this.results = res.data.results;
          if(payload.plots.length){
            this.$nuxt.$emit('alert', {type: 'success', message: 'Compilação Realizada com sucesso.'})
          }else{
            this.$nuxt.$emit('alert', {type: 'warning', message: 'Nenhum plot foi solicitado.'})
          }
          console.log(this.results.values.zeros)
          this.tab = "results"
        })
        .catch((error) => {
          this.$nuxt.$emit('alert', {type: 'error', message: error.response.data.error})
          console.log(error.response)
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
