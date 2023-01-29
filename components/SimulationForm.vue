<template>
  <v-card class="pa-3">
    <v-tabs v-model="tab" align-with-title>
      <v-tab href="#form"> Simulação </v-tab>
      <v-tab href="#results"> Resultado </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="mt-5">
      <v-tab-item value="form">
        <v-form ref="form" @submit.prevent="submitForm">
          <v-expansion-panels popout>
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

            <v-expansion-panel>
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

            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2 class="font-weight-medium">
                  Controlador PID
                </h2></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-row class="mt-2">
                  <v-col class="py-0 px-1">
                    <v-text-field
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
                      :items="pid_items"
                      v-model="pid.type"
                      label="Tipo"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel open>
              <v-expansion-panel-header>
                <h2 class="font-weight-medium">Opções</h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="mt-2">
                  <v-col class="text-center">
                    <h3 class="mb-4 font-weight-medium">Habilitar</h3>
                    <v-checkbox-group v-model="selected">
                      <v-checkbox
                        class="ma-1 font-weight-medium"
                        label="Realimentação"
                        value="feedback"
                      />
                      <v-checkbox
                        class="ma-1 font-weight-medium"
                        label="Compensador"
                        value="comp"
                      />
                      <v-checkbox
                        class="ma-1 font-weight-medium"
                        label="PID"
                        value="pid"
                      />
                    </v-checkbox-group>
                  </v-col>
                  <v-col class="text-center">
                    <h3 class="mb-4 font-weight-medium">Plots</h3>
                    <v-checkbox-group v-model="selected">
                      <v-checkbox
                        class="my-0 font-weight-medium"
                        label="Realimentação"
                        value="feedback"
                      />
                      <v-checkbox
                        class="my-0 font-weight-medium"
                        label="Compensador"
                        value="comp"
                      />
                      <v-checkbox
                        class="my-0 font-weight-medium"
                        label="PID"
                        value="pid"
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
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  name: "SimulationForm",
  data() {
    return {
      tab: "",
      items: ["Polinomial", "Racional"],
      pid_items: ["Série", "Paralelo"],
      system: {
        gain: "1",
        num: "",
        num_type: "Polinomial",
        den: "",
        den_type: "Polinomial",
      },
      comp: {
        num: "1",
        num_type: "",
        den: "1",
        den_type: "",
      },
      pid: {
        kp: "",
        kd: "",
        ki: "",
      },
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
