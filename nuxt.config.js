export default {

  router: {
    base: '/linsca/controlsim'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    host: "0.0.0.0",
    port: 3000,
  },

  head: {
    title: "ControlSim-Front",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/vuetify"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  axios: {
    proxy: true,
  },
  
  proxy: {
    '/linsca/controlsim/api/': {
      target: 'https://www.ifpb.edu.br/linsca/controlsim-api/', pathRewrite: { '^/linsca/controlsim/api/': '/' }
    },
    
    // https://www.ifpb.edu.br/linsca/controlsim-api/
    // http://localhost:5000/api
    // Build Configuration: https://go.nuxtjs.dev/config-build

  }
}