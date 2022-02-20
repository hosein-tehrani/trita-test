export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'trita-test',
    title: 'trita-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
      { name: "HandheldFriendly", content: "true" },
      { hid: 'description', name: 'description', content: '' },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/style.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/device'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: "tritapp test chat",
      theme_color: "white",
    },
    icon: {
      source: "~/static/icon.png",
      fileName:'icon.png'
    },
    meta: {
      mobileAppIOS: true,
      name: "tritapp test chat",
      theme_color: "white",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        light: {
          backgroundColor: "F9F9F9",
          fontColor: "#2C365D",
          primary: "#0090B8",
          secondary: "#7d8ec4",
          commonText: "#656A81",
          greyBg: "#F2F2F5",
        },
        dark: {
          backgroundColor: "#232527",
          fontColor: "#fff",
          primary: "#0090B8",
          secondary: "#7d8ec4",
          commonText: "#fff",
          greyBg: "#3a3a3b",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
