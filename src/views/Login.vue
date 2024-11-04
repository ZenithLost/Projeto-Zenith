<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="height: 100vh"
  >
    <!-- Card de Login -->
    <v-card class="pa-5 login-card" max-width="500">
      <v-card-title class="justify-center">
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            outlined
            :error="loginFailed"
            :error-messages="loginFailed ? 'Email ou senha inválidos.' : ''"
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
          <!-- Mensagem de erro centralizada -->
          <p v-if="loginFailed" class="error-message">
            Senha ou email inválido. Verifique seu email e senha.
          </p>
          <v-btn color="primary" block type="submit" class="mt-4">Entrar</v-btn>
        </v-form>
      </v-card-text>
      <!-- Centralização dos botões "Criar conta" e "Esqueceu a senha?" -->
      <v-card-actions class="justify-center action-buttons">
        <v-btn text color="secondary" @click="goToRegister">
          Criar conta
        </v-btn>
        <v-btn text color="grey darken-1" @click="showForgotPassword = true">
          Esqueceu a senha?
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Overlay para Reset de Senha -->
    <v-dialog v-model="showForgotPassword" max-width="400">
      <v-card>
        <v-card-title class="headline">Resetar Senha</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="resetPassword">
            <v-text-field
              v-model="resetEmail"
              label="Digite seu email"
              type="email"
              outlined
              required
            ></v-text-field>
            <v-btn color="primary" block type="submit" class="mt-4"
              >Enviar Link de Recuperação</v-btn
            >
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="secondary" @click="showForgotPassword = false">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "../axios"; // Axios configurado

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      resetEmail: "",
      showForgotPassword: false, // Controle de visibilidade do overlay
      loginFailed: false, // Controle de exibição de erro no login
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/auth/login", {
          email: this.email,
          password: this.password,
        });

        const { token } = response.data;

        // Armazena apenas o token no localStorage após o login
        if (token) {
          localStorage.setItem("token", token); // Armazena o token
          this.$router.push("/dashboard"); // Redireciona para o dashboard
          this.loginFailed = false; // Login bem-sucedido, não mostrar erro
        } else {
          this.loginFailed = true; // Exibir erro em caso de falha
        }
      } catch (error) {
        console.error("Erro no login:", error);
        this.loginFailed = true; // Exibir erro em caso de falha
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
    async resetPassword() {
      if (!this.resetEmail) {
        alert("Por favor, insira seu email.");
        return;
      }

      try {
        await axios.post("/auth/forgot-password", { email: this.resetEmail });
        alert("Um link de recuperação foi enviado para seu email.");
        this.showForgotPassword = false; // Fecha o modal após enviar o link
      } catch (error) {
        console.error("Erro ao enviar link de recuperação:", error);
        alert("Erro ao enviar link de recuperação. Tente novamente.");
      }
    },
  },
});
</script>

<style scoped>
.v-card {
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 600px;
  right: 6%;
}
.v-btn {
  font-weight: bold;
}

/* Estilos para a mensagem de erro e botões */
.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.action-buttons .v-btn {
  text-transform: none;
  font-weight: 500;
  padding: 0;
  min-width: auto;
}

.action-buttons .v-btn:last-child {
  color: #6c757d; /* Cor mais discreta para "Esqueceu a senha?" */
}

.action-buttons .v-btn:hover {
  background-color: transparent;
}
</style>
