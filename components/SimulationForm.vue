<template>
  <v-form>
    <v-expansion-panels popout>
      <!-- Sistema -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-medium">Sistema</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field
                size="small"
                label="Ganho"
                v-model="system.gain"
                :rules="systemRules.gain"
                outlined
              />
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col class="py-0 px-1" md="8" xs="4" sm="6">
              <v-text-field
                size="small"
                label="Numerador"
                v-model="system.num"
                :rules="systemRules.num"
                outlined
              />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" xs="8">
              <v-select
                size="small"
                item-text="text"
                item-value="value"
                label="Tipo"
                :items="items"
                v-model="system.num_type"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 px-1" md="8" xs="4" sm="6">
              <v-text-field
                label="Denominador"
                v-model="system.den"
                :rules="systemRules.den"
                outlined
              />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" xs="8">
              <v-select
                size="small"
                label="Tipo"
                :items="items"
                v-model="system.den_type"
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Compensador -->
      <v-expansion-panel :disabled="!options.comp">
        <v-expansion-panel-header>
          <h2 class="font-weight-medium">Compensador</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field
                size="small"
                label="Ganho"
                v-model="comp.gain"
                :rules="rules.gain"
                outlined
              />
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col class="py-0 px-1" md="8" xs="4" sm="6">
              <v-text-field
                size="small"
                label="Numerador"
                v-model="comp.num"
                :rules="rules.num"
                outlined
              />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" xs="8">
              <v-select
                size="small"
                label="Tipo"
                item-text="text"
                item-value="value"
                :items="items"
                v-model="comp.num_type"
                :rules="rules.num_type"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 px-1" md="8" xs="4" sm="6">
              <v-text-field
                label="Denominador"
                v-model="comp.den"
                :rules="rules.den"
                outlined
              />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" xs="8">
              <v-select
                size="small"
                label="Tipo"
                :items="items"
                v-model="comp.den_type"
                :rules="rules.den_type"
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- PID -->
      <v-expansion-panel :disabled="!options.pid">
        <v-expansion-panel-header>
          <h2 class="font-weight-medium">
            Controlador PID
          </h2></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field
                :disabled="pid.tune"
                size="small"
                label="Kp"
                v-model="pid.kp"
                :rules="rules.kp"
                outlined
              />
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field
                :disabled="pid.tune"
                size="small"
                label="Kd"
                v-model="pid.kd"
                :rules="rules.kd"
                outlined
              />
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field
                :disabled="pid.tune"
                size="small"
                label="Ki"
                v-model="pid.ki"
                :rules="rules.ki"
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 px-1 align-center">
              <v-switch
                v-model="pid.tune"
                label="Tunelamento"
                class="font-weight-medium"
              ></v-switch>
            </v-col>
            <v-col class="py-0 px-1 align-center">
              <v-switch
                v-model="pid.filter"
                label="Filtro"
                class="font-weight-medium"
              ></v-switch>
            </v-col>
            <v-col class="py-0 px-1">
              <v-select
                outlined
                class="custom"
                item-text="text"
                item-value="value"
                :items="pid_items"
                v-model="pid.type"
                label="Tipo"
              ></v-select>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Opções -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-medium">Opções</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-2">
            <v-col class="text-center">
              <h3 class="mb-4 font-weight-medium">Habilitar</h3>

              <v-switch
                class="ma-1 font-weight-medium"
                label="Realimentação"
                v-model="options.feedback"
              />
              <v-switch
                class="ma-1 font-weight-medium"
                label="Compensador"
                v-model="options.comp"
              />
              <v-switch
                class="ma-1 font-weight-medium"
                label="PID"
                v-model="options.pid"
              />
            </v-col>
            <v-col class="text-center">
              <h3 class="mb-4 font-weight-medium">Plots</h3>
              <v-checkbox
                v-model="plots"
                class="my-0 font-weight-medium"
                label="Resposta ao degrau"
                value="step"
              />
              <v-checkbox
                v-model="plots"
                class="my-0 font-weight-medium"
                label="Mapa de Polos e Zeros"
                value="pzmap"
              />
              <v-checkbox
                v-model="plots"
                class="my-0 font-weight-medium"
                label="Lugar Geral das Raizes"
                value="rlocus"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="d-flex justify-center my-3">
      <v-btn color="primary" large :loading="loading" @click.prevent="compile"
        >Compilar</v-btn
      >
    </div>
  </v-form>
</template>

<script>
export default {
  name: "SimulationForm",
  data() {
    let gain = /^\s*([+-]?\d+(\.\d+)?)\s*$/;
    let poly = /^(\s*[+-]?\d+(\.\d+)?)(\s+[+-]?\d+(\.\d+)?\s*)*$/;
    let roots =
      /^\s*([+-]?\d+(.\d+)?)?(([+-](\d+(.\d+)?)?)?[iIjJ])?(\s+([+-]?\d+(.\d+)?)?(([+-](\d+(.\d+)?)?)?[iIjJ])?)*\s*$/;
    return {
      items: [
        { text: "Polinomial", value: "poly" },
        { text: "Racional", value: "roots" },
      ],
      pid_items: [
        { text: "Série", value: "series" },
        { text: "Paralelo", value: "parallel" },
      ],
      system: {
        gain: "1",
        num: "1",
        num_type: { text: "Polinomial", value: "poly" },
        den: "1",
        den_type: { text: "Polinomial", value: "poly" },
      },
      comp: {
        gain: "1",
        num: "1",
        num_type: { text: "Polinomial", value: "poly" },
        den: "1",
        den_type: { text: "Polinomial", value: "poly" },
      },
      pid: {
        kp: "0",
        kd: "0",
        ki: "0",
        type: { text: "Série", value: "series" },
        filter: false,
        tune: false,
      },
      options: {
        feedback: false,
        comp: false,
        pid: false,
      },
      plots: [],
      systemRules: {
        gain: [
          this.filledValidation,
          (v) => gain.test(v) || "Ganho descrito em formato inválido.",
        ],
        num: [
          this.filledValidation,
          (v) =>
            this.system.num_type.value === "poly"
              ? poly.test(v) || "Polinômio descrito é inválido."
              : roots.test(v) || "Raizes descritas de forma inválida.",
        ],
        den: [
          this.filledValidation,
          (v) =>
            this.system.den.value === "poly"
              ? poly.test(v) || "Polinômio descrito em formato inválido."
              : roots.test(v) || "Raizes descritas em formato inválido.",
        ],
      },
      rules: {
        num: [
          this.filledValidation,
          (v) => {
            this.num_type;
          },
        ],
        den: [this.filledValidation],
        gain: [this.filledValidation],
        kp: [this.filledValidation],
        kd: [this.filledValidation],
        ki: [this.filledValidation],
      },
      loading: false,
    };
  },
  methods: {
    filledValidation(v) {
      return !!v || "Esse campo é obrigatório";
    },
    compile() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      let params = {
        system: this.system,
        feedback: this.options.feedback,
        plots: this.plots,
      };
      if (this.options.pid) params.pid = this.pid;
      if (this.options.comp) params.comp = this.comp;
      this.$emit("compile", params);
    },
  },
};
</script>

<style scoped>
.custom {
  max-width: 352px !important;
  min-width: 144px !important;
}
</style>
