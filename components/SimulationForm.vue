<template>
  <v-form ref="form" @submit.prevent="submitForm">
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
                v-model="system.num"
                :rules="rules.num"
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
                :rules="rules.num_type"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0 px-1" md="8" xs="4" sm="6">
              <v-text-field
                label="Denominador"
                v-model="system.den"
                :rules="rules.den"
                outlined
              />
            </v-col>
            <v-col class="py-0 px-2" md="4" sm="6" xs="8">
              <v-select
                size="small"
                label="Tipo"
                :items="items"
                v-model="system.den_type"
                :rules="rules.den_type"
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
              <v-checkbox-group>
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
              </v-checkbox-group>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="d-flex justify-center my-3">
      <v-btn type="submit" color="primary" large>Compilar</v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "SimulationForm",
  data() {
    return {
      items: [
        { text: "Polinomial", value: "poly" },
        { text: "Racional", value: "roots" },
      ],
      pid_items: [
        { text: "Série", value: "series" },
        { text: "Paralelo", value: "paralel" },
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
      rules: {
        num: [this.filledValidation],
        den: [this.filledValidation],
        num_type: [this.filledValidation],
        den_type: [this.filledValidation],
        gain: [this.filledValidation],
        kp: [this.filledValidation],
        kd: [this.filledValidation],
        ki: [this.filledValidation],
      },
    };
  },
  methods: {
    filledValidation(v) {
      return !!v || "Esse campo é obrigatório";
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        console.log(this.system);
        console.log(this.comp);
      }
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
