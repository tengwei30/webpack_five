import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.css';
import "./styles/index.css";

const app = createApp(App);

app.use(router).use(store).mount("#root");
