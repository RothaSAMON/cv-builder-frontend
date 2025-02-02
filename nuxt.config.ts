export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // Add your plugin here
  plugins: [
    "@/plugins/ant-design-vue.js",
    "@/plugins/vee-validate.ts",
    "@/plugins/axios.ts",
    "@/plugins/vue-query.ts",
  ],

  // Add Ant Design styles here
  css: ["@/assets/css/global.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ["vee-validate/dist/rules"],
  },
  typescript: {
    strict: true,
  },

  modules: ["@nuxtjs/google-fonts", "@nuxt/icon", "@nuxt/image", "@pinia/nuxt"],

  googleFonts: {
    families: {
      Montserrat: true,
      Roboto: true,
      Poppins: true,
    },
  },

  // Environment variables
  runtimeConfig: {
    public: {
      myApiUrl: process.env.NUXT_SERVER_BASE_URL,
    },
    // private: {
    //     mySecretKey: process.env.NUXT_SECRET_KEY, // Accessible server-side only
    // },
  },
});
