<template>
  <div :class="['editor-container', theme]">
    <h2>Editar Artigo</h2>

    <!-- Campo de edição de título -->
    <div class="form-group">
      <label for="titulo">Título</label>
      <input
        type="text"
        v-model="articleTitle"
        placeholder="Digite o título do artigo"
        class="title-input"
      />
    </div>

    <!-- Campo de edição de conteúdo -->
    <div class="editor-content">
      <quill-editor
        ref="quillEditor"
        :options="editorOptions"
        class="text-editor"
      ></quill-editor>
    </div>

    <div class="actions">
      <button @click="saveChanges" class="save-button">Salvar</button>
      <button @click="goBack" class="cancel-button">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue3-quill";
import "quill/dist/quill.snow.css";

export default {
  components: {
    quillEditor,
  },
  props: ["id"], // Recebe o parâmetro id da rota como uma prop
  data() {
    return {
      articleTitle: "", // Título do artigo
      articleContent: "", // Conteúdo do artigo para edição
      theme: localStorage.getItem("theme") || "light", // Estado do tema
      editorOptions: {
        theme: "snow",
        placeholder: "Edite seu artigo aqui...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["link", "image"],
            ["clean"], // remove formatting
          ],
        },
      },
    };
  },
  methods: {
    loadArticleContent() {
      const article = JSON.parse(localStorage.getItem("selectedArticle"));

      if (article && article.id == this.id) {
        this.articleTitle = article.titulo;
        this.articleContent = article.conteudo;

        // Carrega o conteúdo no editor assim que o componente for montado
        this.$nextTick(() => {
          if (this.$refs.quillEditor && this.$refs.quillEditor.quill) {
            this.$refs.quillEditor.quill.clipboard.dangerouslyPasteHTML(
              this.articleContent
            );
          }
        });

        console.log("Conteúdo do artigo carregado:", this.articleContent); // Log para verificação
      } else {
        this.$router.push({ name: "listaPostagem" });
      }
    },
    saveChanges() {
      const articleId = this.id;
      const storedArticles = JSON.parse(localStorage.getItem("artigos")) || [];
      const articleIndex = storedArticles.findIndex((a) => a.id == articleId);

      if (articleIndex !== -1) {
        storedArticles[articleIndex].titulo = this.articleTitle;
        storedArticles[articleIndex].conteudo =
          this.$refs.quillEditor.quill.root.innerHTML;

        localStorage.setItem("artigos", JSON.stringify(storedArticles));
        localStorage.removeItem("selectedArticle"); // Limpa o artigo selecionado
        this.$router.push({ name: "listaPostagem" });
      } else {
        alert("Artigo não encontrado.");
      }
    },
    goBack() {
      localStorage.removeItem("selectedArticle"); // Limpa o artigo selecionado ao cancelar
      this.$router.push({ name: "listaPostagem" });
    },
  },
  mounted() {
    this.loadArticleContent();
  },
};
</script>

<style scoped>
.editor-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f4f7fc;
  border-radius: 10px;
}

.editor-container h2 {
  text-align: center;
  color: #1e88e5;
}

.form-group {
  margin-bottom: 1rem;
}

.title-input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.text-editor {
  min-height: 400px;
  margin: 20px 0;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.save-button {
  background-color: #1e88e5;
  color: white;
}

.cancel-button {
  background-color: #e53935;
  color: white;
}

body.dark .editor-container {
  background-color: #2e2f33;
}

body.dark h2 {
  color: #ccc;
}

body.dark .save-button {
  background-color: #333;
}

body.dark .cancel-button {
  background-color: #444;
}
</style>
