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
      endpoint: process.env.SIM_ENDPOINT,
      tab: "",
      loading: false,
      results: {},
    };
  },
  methods: {
    async submitForm(payload) {
      try {
        this.loading = true;
        let resp, cont;
        if (payload.pid || payload.comp) {
          resp = await this.$axios.post(this.endpoint, payload);
          cont = resp.data;
          delete payload.pid;
          delete payload.comp;
        }
        resp = await this.$axios.post(this.endpoint, payload);
        this.results = resp.data;
        if (cont) this.results.cont = cont;
        if (payload.plots.length) {
          this.$nuxt.$emit("alert", {
            type: "success",
            message: "Compilação Realizada com sucesso.",
          });
        } else {
          this.$nuxt.$emit("alert", {
            type: "warning",
            message: "Nenhum plot foi solicitado.",
          });
        }
        this.tab = "results";
      } catch (error) {
        this.$nuxt.$emit("alert", {
          type: "error",
          message: error.response.data.error,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
