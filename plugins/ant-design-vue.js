import { defineNuxtPlugin } from "#app"; // Import defineNuxtPlugin
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd); // Use Ant Design in your app
});
