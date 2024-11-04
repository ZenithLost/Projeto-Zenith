<template>
  <v-container fluid class="my-5">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Usuários Cadastrados</h1>
      </v-col>
    </v-row>

    <!-- Exibir um loading enquanto os dados estão sendo carregados -->
    <v-row v-if="loading" justify="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>

    <!-- Exibir os usuários em forma de cards -->
    <v-row v-else>
      <v-col
        v-for="user in users"
        :key="user._id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto my-3" max-width="300">
          <v-card-title class="text-center">{{ user.name }}</v-card-title>
          <v-card-subtitle class="text-center">{{
            user.email
          }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "../axios";

export default defineComponent({
  data() {
    return {
      users: [], // Lista de usuários
      loading: true, // Estado de loading
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        console.log("Iniciando requisição para obter usuários...");
        const response = await axios.get(
          "http://localhost:3000/api/auth/users"
        ); // URL completa do backend
        console.log("Resposta recebida:", response.data);
        this.users = response.data; // Armazena os usuários retornados
        this.loading = false; // Desativa o loading após carregar os dados
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #4caf50;
}
.v-card {
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1976d2;
}
.v-card-subtitle {
  font-size: 1rem;
  color: #424242;
}
</style>
