<template>
  <v-expansion-panels popout class="pa-2">
    <v-expansion-panel>
      <v-expansion-panel-header
        ><h2 class="font-weight-medium">Sistema</h2></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-row class="text-center" justify="center" v-if="results.values">
          <v-col xl="6" lg="6" md="6" sm="6" cols="12">
            <v-row v-if="results.cont">
              <v-col>
                <h3 class="text-left font-weight-regular">Sem Controlador</h3>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <h4 class="mb-3 font-weight-medium">Função de Transferência</h4>
                <pre>{{ results.values.tf.trim() }} </pre>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <h4 class="mb-3 font-weight-medium">Zeros</h4>
                <ul v-if="results.values.zeros.length">
                  <li
                    v-for="(zero, index) in results.values.zeros"
                    :key="index"
                  >
                    {{ zero }}
                  </li>
                </ul>
                <h5 v-else>-</h5>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <h4 class="mb-3 font-weight-medium">Polos</h4>
                <ul v-if="results.values.poles.length">
                  <li
                    v-for="(pole, index) in results.values.poles"
                    :key="index"
                  >
                    {{ pole }}
                  </li>
                </ul>
                <h5 v-else>-</h5>
              </v-col>
            </v-row>
          </v-col>
          <v-col xl="6" lg="6" md="6" sm="6" cols="12" v-if="results.cont">
            <v-row>
              <v-col>
                <h3 class="text-left font-weight-regular" v-if="results.cont">
                  Com Controlador
                </h3>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <h4 class="mb-3 font-weight-medium">Função de Transferência</h4>
                <pre>{{ results.cont.values.tf.trim() }} </pre>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <h4 class="mb-3 font-weight-medium">Zeros</h4>
                <ul v-if="results.cont.values.zeros.length">
                  <li
                    v-for="(zero, index) in results.cont.values.zeros"
                    :key="index"
                  >
                    {{ zero }}
                  </li>
                </ul>
                <h5 v-else>-</h5>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <h4 class="mb-3 font-weight-medium">Polos</h4>
                <ul v-if="results.cont.values.poles.length">
                  <li
                    v-for="(pole, index) in results.cont.values.poles"
                    :key="index"
                  >
                    {{ pole }}
                  </li>
                </ul>
                <h5 v-else>-</h5>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
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
          <v-col xl="6" lg="6" md="6" sm="12" cols="12">
            <h3 class="text-left font-weight-regular" v-if="results.cont">
              Sem Controlador
            </h3>
            <ResultPlot
              v-if="this.results.plots && this.results.plots.step_response"
              min_w="300"
              :plot="this.results.plots.step_response"
            />
          </v-col>
          <v-col xl="6" lg="6" md="6" sm="12" cols="12" v-if="results.cont">
            <h3 class="text-left font-weight-regular">Com Controlador</h3>
            <ResultPlot
              v-if="
                this.results.cont.plots && this.results.cont.plots.step_response
              "
              min_w="250"
              :plot="this.results.cont.plots.step_response"
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
        <v-row justify="center" align="center">
          <v-col xl="6" lg="6" md="6" sm="12" cols="12">
            <h3 class="text-left font-weight-regular" v-if="results.cont">
              Sem Controlador
            </h3>
            <ResultPlot
              v-if="this.results.plots && this.results.plots.pzmap"
              min_w="250"
              :plot="this.results.plots.pzmap"
            />
          </v-col>
          <v-col xl="6" lg="6" md="6" sm="12" cols="12" v-if="results.cont">
            <h3 class="text-left font-weight-regular">Com Controlador</h3>
            <ResultPlot
              v-if="this.results.cont.plots && this.results.cont.plots.pzmap"
              min_w="250"
              :plot="this.results.cont.plots.pzmap"
            />
          </v-col>
        </v-row>
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
        <v-row justify="center" align="center">
          <v-col xl="6" lg="6" md="6" sm="12" cols="12">
            <ResultPlot
              v-if="this.results.plots && this.results.plots.rlocus"
              min_w="250"
              :plot="this.results.plots.rlocus"
            />
          </v-col>
        </v-row>
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

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
