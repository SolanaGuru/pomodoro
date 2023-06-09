import { createApp } from "vue";

import store from "./store";
import ElementUI from "element-plus";

import App from "./App.vue";

const mainApp = createApp(App);
mainApp.use(store).use(ElementUI).mount("#app");
