<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center mb-5">Gerador de Postagem com IA</h1>

        <!-- Formulário para o título -->
        <v-text-field
          v-model="form.title"
          label="Título da Postagem"
          outlined
          dense
          required
          class="mb-4"
        ></v-text-field>

        <!-- Quantidade de artigos -->
        <v-select
          v-model="form.articleCount"
          :items="articleOptions"
          label="Quantidade de Artigos"
          outlined
          dense
          class="mb-4"
        ></v-select>

        <!-- Checkbox para incluir mensagem -->
        <v-checkbox
          v-model="form.includeMessage"
          label="Incluir Mensagem"
          class="mb-4"
        ></v-checkbox>

        <!-- Botão para gerar a postagem -->
        <v-btn
          @click="generatePost"
          color="primary"
          class="mt-3"
          :loading="loading"
          large
          block
        >
          Gerar Postagem
        </v-btn>
      </v-col>
    </v-row>

    <!-- Exibição do resultado -->
    <v-row v-if="generatedContent.length > 0" class="mt-5">
      <v-col cols="12">
        <h3>Conteúdo Gerado</h3>
        <div v-for="(content, index) in generatedContent" :key="index">
          <v-textarea
            v-model="generatedContent[index]"
            label="Postagem Gerada"
            outlined
            rows="10"
            class="mt-4"
          ></v-textarea>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        title: "",
        articleCount: 1,
        includeMessage: false,
      },
      articleOptions: [1, 2, 3, 4, 5],
      generatedContent: [], // Array que será atualizado com os conteúdos gerados
      loading: false,
    };
  },
  methods: {
    async generatePost() {
      this.loading = true;
      try {
        // Faz a chamada para o backend para gerar os artigos
        const response = await axios.post(
          "/api/openai/generate-post",
          this.form
        );
        this.generatedContent = response.data.choices.map(
          (choice) => choice.text
        ); // Preenche o array com os textos gerados
      } catch (error) {
        console.error("Erro ao gerar postagem:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para melhorar a aparência do componente */

h1 {
  font-weight: bold;
  font-size: 2.5rem;
  color: #3f51b5; /* Cor principal do Vuetify */
}

h3 {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #3f51b5; /* Cor principal do Vuetify */
}

.v-btn {
  font-size: 1.2rem;
  font-weight: 600;
}

.v-textarea {
  font-size: 1rem;
  background-color: #f9f9f9;
}

.mt-5 {
  margin-top: 2rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mb-5 {
  margin-bottom: 2rem;
}
</style>
