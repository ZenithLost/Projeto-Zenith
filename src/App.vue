<template>
  <v-app>
    <!-- Verifica se a rota atual não é de login ou cadastro e se o usuário está autenticado -->
    <menu-sidebar v-if="isAuthenticated && !isPublicPage" class="sidebar" />

    <!-- Conteúdo principal (páginas) -->
    <v-main class="main-content">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MenuSidebar from "@/views/MenuSidebar.vue"; // Importando o MenuSidebar

export default {
  components: {
    MenuSidebar,
  },
  computed: {
    isAuthenticated() {
      // Verifica se o usuário está autenticado (verificação do token JWT)
      return !!localStorage.getItem("token");
    },
    isPublicPage() {
      // Verifica se a rota atual é a de login ou cadastro
      const publicRoutes = ["login", "register"];
      return publicRoutes.includes(this.$route.name);
    },
  },
};
</script>

<style>
/* Ajuste para a barra lateral fixa à esquerda */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px; /* Defina a largura da barra lateral */
  z-index: 100;
}

/* Ajuste para o conteúdo principal, com margem à esquerda */
.main-content {
  margin-left: 250px; /* Espaço reservado para a barra lateral */
  padding: 20px; /* Padding para o conteúdo principal */
}
</style>
