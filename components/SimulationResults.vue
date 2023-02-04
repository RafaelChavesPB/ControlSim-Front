<template>
  <v-expansion-panels popout class="pa-2">
    <v-expansion-panel>
      <v-expansion-panel-header
        ><h2 class="font-weight-medium">Sistema</h2></v-expansion-panel-header
      >
      <v-expansion-panel-content> </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- Step -->
    <v-expansion-panel
      :disabled="!(this.results.plots && this.results.plots.step_response)"
    >
      <v-expansion-panel-header
        ><h2 class="font-weight-medium">
          Resposta ao Degrau
        </h2></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-row justify="center" align="center">
          <v-col xl="6" lg="6" md="6" sm="12">
            <ResultPlot
              v-if="this.results.plots && this.results.plots.step_response"
              min_w="300"
              :plot="this.results.plots.step_response"
            />
          </v-col>
          <v-col xl="6" lg="6" md="6" sm="12">
            <ResultPlot
              v-if="this.results.plots && this.results.plots.step_response"
              min_w="250"
              :plot="this.results.plots.step_response"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- Pzmap -->
    <v-expansion-panel
      :disabled="!(this.results.plots && this.results.plots.pzmap)"
    >
      <v-expansion-panel-header
        ><h2 class="font-weight-medium">
          Mapa de Polos e Zeros
        </h2></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-img
          v-if="this.results.plots && this.results.plots.pzmap"
          :src="'data:image/jpeg;base64,' + this.results.plots.pzmap"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- RLocus -->
    <v-expansion-panel
      :disabled="!(this.results.plots && this.results.plots.rlocus)"
    >
      <v-expansion-panel-header
        ><h2 class="font-weight-medium">
          Lugar Geral das Raizes
        </h2></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-img
          v-if="this.results.plots && this.results.plots.rlocus"
          :src="'data:image/jpeg;base64,' + this.results.plots.rlocus"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import ResultPlot from "./ResultPlot.vue";
export default {
  name: "SimulationResults",
  components: { ResultPlot },
  props: {
    results: Object,
  },
  data() {
    return {};
  },
};
</script>
