<template>
  <div class="postagem-teste">
    <h2>Criar Artigo de Teste</h2>

    <div class="form-group">
      <label for="titulo">Título</label>
      <input
        type="text"
        v-model="titulo"
        placeholder="Digite o título do artigo"
      />
    </div>

    <div class="form-group">
      <label for="conteudo">Conteúdo</label>
      <textarea
        v-model="conteudo"
        placeholder="Escreva o conteúdo do artigo"
      ></textarea>
    </div>

    <button @click="salvarArtigo">Salvar Artigo</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "",
      conteudo: "",
    };
  },
  methods: {
    salvarArtigo() {
      if (this.titulo && this.conteudo) {
        // Armazena o artigo no localStorage com informações adicionais
        const artigos = JSON.parse(localStorage.getItem("artigos")) || [];
        const novoArtigo = {
          id: Date.now().toString(), // Gera um ID único para o artigo
          titulo: this.titulo,
          conteudo: this.conteudo, // Armazena o conteúdo completo do artigo
          date: new Date().toISOString().split("T")[0], // Data atual
          source: "Manual", // Exemplo de origem
          tokens: this.conteudo.length, // Quantidade de tokens baseados no conteúdo
          status: "NEW", // Status inicial
        };
        artigos.push(novoArtigo);
        localStorage.setItem("artigos", JSON.stringify(artigos));

        // Limpa o formulário
        this.titulo = "";
        this.conteudo = "";
        alert("Artigo salvo com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    },
  },
};
</script>

<style scoped>
.postagem-teste {
  max-width: 600px;
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
textarea {
  width: 100%;
  height: 200px;
}
</style>
