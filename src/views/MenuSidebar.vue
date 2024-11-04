<template>
  <nav :class="['sidebar', { close: isClosed }]">
    <header>
      <div class="image-text">
        <span class="image">
          <i class="bx bx-user"></i>
        </span>
        <div class="text logo-text">
          <!-- Exibe o nome e o email do usuário -->
          <span class="name">{{ userName || "Usuário" }}</span>
          <span class="email">{{ userEmail || "email@exemplo.com" }}</span>
        </div>
      </div>
      <i class="bx bx-chevron-right toggle" @click="toggleSidebar"></i>
    </header>

    <div class="menu-bar">
      <div class="menu">
        <li class="search-box" @click="openSidebar">
          <i class="bx bx-search icon"></i>
          <input type="text" placeholder="Buscar..." />
        </li>
        <ul class="menu-links">
          <!-- Links de navegação -->
          <li class="nav-link">
            <router-link to="/dashboard">
              <i class="bx bx-home-alt icon"></i>
              <span class="text nav-text">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/blogs">
              <i class="bx bx-book icon"></i>
              <span class="text nav-text">Blogs</span>
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/ferramentaAi">
              <i class="bx bx-brain icon"></i>
              <span class="text nav-text">Ferramenta AI</span>
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/listaPostagem">
              <i class="bx bx-list-ul icon"></i>
              <span class="text nav-text">Lista de Postagens</span>
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/download">
              <i class="bx bx-download icon"></i>
              <span class="text nav-text">Download</span>
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/postagemteste">
              <i class="bx bx-download icon"></i>
              <span class="text nav-text">postagem-teste</span>
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/configUser">
              <i class="bx bx-cog icon"></i>
              <span class="text nav-text">Configuração</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Parte inferior: Logout e Alternância de Tema -->
      <div class="bottom-content">
        <li @click="logoutUser">
          <a href="#">
            <i class="bx bx-log-out icon"></i>
            <span class="text nav-text">Logout</span>
          </a>
        </li>
        <li class="mode">
          <div class="toggle-switch" @click="toggleDarkMode">
            <i v-if="!isDarkMode" class="bx bx-sun icon"></i>
            <i v-else class="bx bx-moon icon"></i>
          </div>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isClosed: false,
      isDarkMode: false,
      userName: null, // Armazenará o nome do usuário
      userEmail: null, // Armazenará o email do usuário
    };
  },
  watch: {
    isDarkMode(newVal) {
      document.body.classList.toggle("dark", newVal);
    },
  },
  methods: {
    toggleSidebar() {
      this.isClosed = !this.isClosed;
    },
    openSidebar() {
      this.isClosed = false;
    },
    toggleDarkMode() {
      // Alterna o tema e armazena a preferência no localStorage
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
      document.body.classList.toggle("dark", this.isDarkMode);
    },
    logoutUser() {
      // Remove os dados de usuário e redireciona para a página de login
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      this.$router.push("/login");
    },
  },
  mounted() {
    // Carrega o nome e email do usuário do localStorage ao montar o componente
    this.userName = localStorage.getItem("userName");
    this.userEmail = localStorage.getItem("userEmail");

    // Aplica o tema baseado na preferência armazenada
    this.isDarkMode = localStorage.getItem("theme") === "dark";
    document.body.classList.toggle("dark", this.isDarkMode);
  },
};
</script>

<style scoped>
/* Google Font Import - Poppins */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

/* Tema Claro (Padrão) */
body {
  background-color: #e4e9f7;
  transition: all 0.3s ease;
}

::selection {
  background-color: #695cfe;
  color: #fff;
}

/* Tema Escuro */
body.dark {
  background-color: #18191a;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 10px 14px;
  background-color: #fff;
  transition: width 0.3s ease, background-color 0.3s ease;
  z-index: 100;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  color: #707070;
}

body.dark .sidebar {
  background-color: #242526;
  color: #ccc;
}

.sidebar.close {
  width: 88px;
}

.sidebar li {
  height: 50px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.sidebar header .image,
.sidebar .icon {
  min-width: 60px;
  border-radius: 6px;
}

/* Ícone de perfil com fundo roxo */
.sidebar header .image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #695cfe;
  color: #ffffff;
  font-size: 20px;
  border-radius: 6px;
}

.sidebar .icon {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.sidebar .text,
.sidebar .icon {
  color: inherit;
  transition: color 0.3s ease;
}

.sidebar .text {
  font-size: 17px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 1;
}

.sidebar.close .text {
  opacity: 0;
}

/* Header da Sidebar */
.sidebar header {
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

body.dark .sidebar header {
  border-bottom: 1px solid #3a3b3c;
}

.sidebar header .image-text {
  display: flex;
  align-items: center;
}

.sidebar header .logo-text {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  transition: opacity 0.3s ease;
}

.sidebar.close .logo-text {
  display: none;
}

header .image-text .name {
  margin-top: 2px;
  font-size: 16px;
  font-weight: 600;
}

header .image-text .email {
  font-size: 14px;
}

header .image-text .profession {
  font-size: 12px;
  margin-top: -2px;
  display: block;
}

.sidebar header .image img {
  width: 40px;
  border-radius: 6px;
}

/* Botão de Expansão */
.sidebar header .toggle {
  position: absolute;
  top: 50%;
  right: -25px;
  transform: translateY(-50%) rotate(180deg);
  height: 25px;
  width: 25px;
  background-color: #695cfe;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

body.dark .sidebar header .toggle {
  color: #ccc;
}

.sidebar.close .toggle {
  transform: translateY(-50%) rotate(0deg);
}

/* Menu */
.sidebar .menu {
  margin-top: 40px;
}

.sidebar li.search-box {
  border-radius: 6px;
  background-color: #f6f5ff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

body.dark .sidebar li.search-box {
  background-color: #3a3b3c;
}

.sidebar li.search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: 17px;
  font-weight: 500;
  border-radius: 6px;
}

.sidebar li a {
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s ease;
}

.sidebar li a:hover,
.sidebar li a.active {
  /* Aplica o mesmo estilo do hover ao item ativo */
  background-color: #695cfe;
}

.sidebar li a:hover .icon,
.sidebar li a:hover .text,
.sidebar li a.active .icon,
.sidebar li a.active .text {
  color: #fff;
}

body.dark .sidebar li a:hover .icon,
body.dark .sidebar li a:hover .text,
body.dark .sidebar li a.active .icon,
body.dark .sidebar li a.active .text {
  color: #ccc;
}

/* Menu Principal e Alternância de Tema */
.sidebar .menu-bar {
  height: calc(100% - 55px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
}

.menu-bar::-webkit-scrollbar {
  display: none;
}

.sidebar .menu-bar .mode {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}

.mode .icon {
  font-size: 20px; /* Ajuste do tamanho do ícone para alternância de tema */
  color: #695cfe;
  transition: color 0.3s ease;
}

body.dark .mode .icon {
  color: #fff;
}

.menu-bar .bottom-content .toggle-switch {
  width: 40px;
  height: 20px;
  border-radius: 25px;
  background-color: #ddd;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

body.dark .toggle-switch {
  background-color: #3a3b3c;
}

.toggle-switch::before {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  background-color: #fff;
  transition: all 0.3s ease;
}

body.dark .toggle-switch::before {
  left: 22px;
}
/* Estilo de Alternância de Tema Compacto para a Barra Lateral */

.sidebar .menu-bar .mode {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}

/* Ícone de alternância de tema (Lua e Sol) */
.mode .icon {
  font-size: 20px; /* Tamanho do ícone de alternância */
  color: #695cfe; /* Cor do ícone no modo claro */
  transition: color 0.3s ease;
}

body.dark .mode .icon {
  color: #fff; /* Cor do ícone no modo escuro */
}

/* Botão de alternância de tema separado do ícone */
.menu-bar .bottom-content .toggle-switch {
  width: 40px;
  height: 20px;
  border-radius: 25px;
  background-color: #ddd; /* Cor de fundo do botão no modo claro */
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px; /* Espaço entre o ícone e o botão */
}

body.dark .toggle-switch {
  background-color: #3a3b3c; /* Cor de fundo do botão no modo escuro */
}

.toggle-switch::before {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  background-color: #fff;
  transition: all 0.3s ease;
}

body.dark .toggle-switch::before {
  left: 22px;
}
</style>
