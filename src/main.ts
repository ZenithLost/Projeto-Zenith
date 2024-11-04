import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

// Importações corrigidas para o Quill Editor
import { quillEditor } from "vue3-quill";
import "quill/dist/quill.snow.css";

loadFonts();

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(vuetify)
  .component("QuillEditor", quillEditor) // Registra o quillEditor globalmente
  .mount("#app");
