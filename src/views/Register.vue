<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="height: 100vh"
  >
    <v-card class="pa-5" max-width="500">
      <v-card-title class="justify-center">
        <h2>Criar Conta</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="name"
            label="Nome"
            outlined
            required
            class="mb-4"
            :style="{ width: '100%' }"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            outlined
            required
            class="mb-4"
            :style="{ width: '100%' }"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            outlined
            required
            :style="{ width: '100%' }"
          ></v-text-field>
          <v-btn color="primary" block type="submit" class="mt-4"
            >Criar Conta</v-btn
          >
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn text color="secondary" @click="goToLogin"
          >Já tem uma conta? Entre</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "../axios"; // Axios configurado

export default defineComponent({
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token); // Armazena o token
        this.$router.push("/protegido"); // Redireciona para a página protegida
      } catch (error) {
        console.error("Erro no registro:", error);
        // Exibir uma mensagem de erro de registro se necessário
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
});
</script>

<style scoped>
.v-card {
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 500px;
  right: 6%;
}
.v-btn {
  font-weight: bold;
}
</style>
