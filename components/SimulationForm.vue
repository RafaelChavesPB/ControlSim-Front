<template>
  <v-form ref="form">
    <v-expansion-panels popout>
      <!-- Sistema -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-medium">Sistema</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field size="small" label="Ganho" v-model="system.gain" :rules="systemRules.gain" outlined
                @change="updateValidation" />
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col class="py-0 px-1" md="8" cols="4" sm="6">
              <v-text-field size="small" label="Numerador" v-model="system.num" :rules="systemRules.num" outlined
                @change="updateValidation" />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" cols="8">
              <v-select size="small" item-text="text" item-value="value" label="Tipo" :items="items"
                v-model="system.num_type" outlined @change="updateValidation">
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 px-1" md="8" cols="4" sm="6">
              <v-text-field label="Denominador" v-model="system.den" :rules="systemRules.den" outlined
                @change="updateValidation" />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" cols="8">
              <v-select size="small" label="Tipo" :items="items" v-model="system.den_type" outlined
                @change="updateValidation"></v-select>
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
              <v-text-field size="small" label="Ganho" v-model="comp.gain" :rules="compRules.gain" outlined
                @change="updateValidation" />
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col class="py-0 px-1" md="8" cols="4" sm="6">
              <v-text-field size="small" label="Numerador" v-model="comp.num" :rules="compRules.num" outlined
                @change="updateValidation" />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" cols="8">
              <v-select size="small" label="Tipo" item-text="text" item-value="value" :items="items"
                v-model="comp.num_type" outlined @change="updateValidation"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 px-1" md="8" cols="4" sm="6">
              <v-text-field label="Denominador" v-model="comp.den" :rules="compRules.den" outlined
                @change="updateValidation" />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" cols="8">
              <v-select size="small" label="Tipo" :items="items" v-model="comp.den_type" outlined
                @change="updateValidation"></v-select>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- PID -->
      <v-expansion-panel :disabled="!options.pid">
        <v-expansion-panel-header>
          <h2 class="font-weight-medium">
            Controlador PID
          </h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field :disabled="!!pid.tune.length" size="small" label="Kp" v-model="pid.kp" :rules="pidRules.kp"
                outlined @change="updateValidation" />
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field :disabled="!!pid.tune.length" size="small" label="Kd" v-model="pid.kd" :rules="pidRules.kd"
                outlined @change="updateValidation" />
            </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col class="py-0 px-1">
              <v-text-field :disabled="!!pid.tune.length" size="small" label="Ki" v-model="pid.ki" :rules="pidRules.ki"
                outlined @change="updateValidation" />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 px-1">
              <v-select
                class="custom"
                v-model="pid.tune"
                label="Sintonia"
                @change="updateValidation"
                :items="pid_tune"
                outlined
              ></v-select>
            </v-col>
            <v-col class="py-0 px-1" justify="center">
              <v-switch v-model="pid.filter" label="Filtro" class="font-weight-medium"></v-switch>
            </v-col>
            <v-col class="py-0 px-1">
              <v-select outlined class="custom" item-text="text" item-value="value" :items="pid_architecture"
                v-model="pid.type" label="Tipo"></v-select>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Opções -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-medium">Opções de Simulação</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-2">
            <v-col sm="6" cols="12" class="text-center">
              <h3 class="mb-4 font-weight-medium">Habilitar</h3>

              <v-switch class="ma-1 font-weight-medium" label="Realimentação" v-model="options.feedback" />
              <v-switch class="ma-1 font-weight-medium" label="Compensador" v-model="options.comp"
                @change="updateValidation" />
              <v-switch class="ma-1 font-weight-medium" label="PID" v-model="options.pid" @change="updateValidation" />
            </v-col>
            <v-col sm="6" cols="12" class="text-center">
              <h3 class="mb-4 font-weight-medium">Simulação</h3>
              <v-text-field size="small" label="Amplitude da Entrada" v-model="options.amplitude"
                :rules="optionsRules.amplitude" outlined @change="updateValidation" />
              <v-select label="Gráficos" :items="items_plot" item-text="text" tem-value="value" v-model="plots"
                outlined multiple small-chips>
              </v-select>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="d-flex justify-center my-3">
      <v-btn color="primary" :disabled="error" large :loading="loading" @click.prevent="compile">Compilar</v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "SimulationForm",
  props: { loading: Boolean },
  data() {
    let gain = /^\s*([+-]?\d+(\.\d+)?)\s*$/;
    let poly = /^(\s*[+-]?\d+(\.\d+)?)(\s+[+-]?\d+(\.\d+)?)*\s*$/;
    let roots =
      /^\s*([+-]?\d+(.\d+)?)?(([+-](\d+(.\d+)?)?)?[iIjJ])?(\s+([+-]?\d+(.\d+)?)?(([+-](\d+(.\d+)?)?)?[iIjJ])?)*\s*$/;
    return {
      error: false,
      items: [
        { text: "Coeficientes", value: "poly" },
        { text: "Raízes", value: "roots" },
      ],
      pid_tune: [
        { text: "Não utilizar", value: "" },
        { text: "Skogestad", value: "skogestad" },
      ],
      pid_architecture: [
        { text: "Série", value: "series" },
        { text: "Paralelo", value: "parallel" },
      ],
      items_plot: [
        { text: "Resposta ao Degrau", value: "step_response" },
        { text: "Resposta ao Impulso", value: "impulse_response" },
        { text: "Mapa de Polos e Zeros", value: "pzmap" },
        { text: "Lugar Geral das Raízes", value: "rlocus" },
      ],
      system: {
        gain: "1",
        num: "1",
        num_type: "poly",
        den: "1",
        den_type: "poly",
      },
      comp: {
        gain: "1",
        num: "1",
        num_type: "poly",
        den: "1",
        den_type: "poly",
      },
      pid: {
        kp: "0",
        kd: "0",
        ki: "0",
        type: "series",
        filter: false,
        tune: "",
      },
      options: {
        amplitude: 1,
        feedback: false,
        comp: false,
        pid: false,
        
      },
      plots: [],
      systemRules: {
        gain: [
          (v) => !!v || "Esse campo é obrigatório",
          (v) => gain.test(v) || "Número escrito em formato inválido.",
        ],
        num: [
          (v) => !!v || "Esse campo é obrigatório",
          (v) =>
            this.system.num_type === "poly"
              ? poly.test(v) || "Polinômio escrito em formato inválido."
              : roots.test(v) || "Raizes descritas em formato inválido.",
        ],
        den: [
          (v) => !!v || "Esse campo é obrigatório",
          (v) =>
            this.system.den_type === "poly"
              ? poly.test(v) || "Polinômio escrito em formato inválido."
              : roots.test(v) || "Raizes descritas em formato inválido.",
        ],
      },
      compRules: {
        gain: [
          (v) => !this.options.comp || !!v || "Esse campo é obrigatório",
          (v) =>
            !this.options.comp ||
            gain.test(v) ||
            "Número escrito em formato inválido.",
        ],
        num: [
          (v) => !this.options.comp || !!v || "Esse campo é obrigatório",
          (v) =>
            !this.options.comp ||
            (this.comp.num_type === "poly"
              ? poly.test(v) || "Polinômio escrito em formato inválido."
              : roots.test(v) || "Raizes descritas em formato inválido."),
        ],
        den: [
          (v) => !this.options.comp || !!v || "Esse campo é obrigatório",
          (v) =>
            !this.options.comp ||
            (this.comp.den_type === "poly"
              ? poly.test(v) || "Polinômio escrito em formato inválido."
              : roots.test(v) || "Raizes descritas em formato inválido."),
        ],
      },
      pidRules: {
        kp: [
          (v) =>
            this.pid.tune.length ||
            !this.options.pid ||
            !!v ||
            "Esse campo é obrigatório",
          (v) =>
            this.pid.tune.length ||
            !this.options.pid ||
            gain.test(v) ||
            "Número escrito em formato inválido.",
        ],
        kd: [
          (v) =>
            this.pid.tune.length ||
            !this.options.pid ||
            !!v ||
            "Esse campo é obrigatório",
          (v) =>
            this.pid.tune.length ||
            !this.options.pid ||
            gain.test(v) ||
            "Número escrito em formato inválido.",
        ],
        ki: [
          (v) =>
            this.pid.tune.length ||
            !this.options.pid ||
            !!v ||
            "Esse campo é obrigatório",
          (v) =>
            this.pid.tune.length ||
            !this.options.pid ||
            gain.test(v) ||
            "Número escrito em formato inválido.",
        ],
      },
      optionsRules: {
        amplitude: [(v) => !!v || "Esse campo é obrigatório",
        (v) => gain.test(v) || "Número escrito em formato inválido."]
      }
    };
  },
  methods: {
    compile() {
      let params = {
        system: this.system,
        feedback: this.options.feedback,
        amplitude: this.options.amplitude,
        plots: this.plots,
      };
      if (this.options.pid) params.pid = this.pid;
      if (this.options.comp) params.comp = this.comp;
      this.$emit("compile", params);
    },
    updateValidation() {
      this.error = !this.$refs.form.validate();
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
