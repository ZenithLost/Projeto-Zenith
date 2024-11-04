<template>
  <div :class="['lista-postagem', theme]">
    <!-- Informações Totais -->
    <div class="info-totais">
      <div class="info-card" v-for="(info, index) in infos" :key="index">
        <i :class="'bx ' + info.iconClass"></i>
        <div class="info-content">
          <h3>{{ info.value }}</h3>
          <p>{{ info.label }}</p>
        </div>
      </div>
    </div>

    <!-- Filtro e Ordenação -->
    <div class="filter-bar">
      <v-text-field
        v-model="filterDate"
        label="Filtrar por Data"
        type="date"
        class="filter-date"
      ></v-text-field>
    </div>

    <!-- Tabela de Postagens -->
    <table class="post-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Data</th>
          <th>Título</th>
          <th>Fonte</th>
          <th>Valor (R$)</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in paginatedPosts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.date }}</td>
          <!-- Limitar o tamanho do título exibido -->
          <td>{{ truncateTitle(post.titulo) }}</td>
          <td>{{ post.source }}</td>
          <td>{{ calculateValueInBRL(post.tokens) }}</td>
          <td>
            <span
              :class="
                'status ' + (post.status ? post.status.toLowerCase() : '')
              "
            >
              {{ post.status || "NEW" }}
            </span>
          </td>
          <td>
            <!-- Dropdown de Ações -->
            <div class="dropdown">
              <button class="dropdown-button">
                Ações <i class="bx bx-chevron-down"></i>
              </button>
              <div class="dropdown-content">
                <button @click="goToEdit(post.id)">Editar</button>
                <button @click="deletePost(post.id)">Excluir</button>
                <button @click="publishPost(post.id)">Publicar</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginação -->
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [], // Array para armazenar as postagens
      currentPage: 1, // Página atual para a paginação
      itemsPerPage: 50, // Limite de postagens por página
      filterDate: "", // Filtro de data
      theme: localStorage.getItem("theme") || "light", // Estado do tema

      // Informações de contagem e valores fictícios para exibição
      infos: [
        { label: "Total de postagens", value: 0, iconClass: "bx-notepad" },
        { label: "Ordem no processo", value: 0, iconClass: "bx-timer" },
        { label: "Ordem concluída", value: 0, iconClass: "bx-check" },
        {
          label: "Receita total",
          value: "R$ 0,00", // Inicializado com zero
          iconClass: "bx-dollar-circle",
        },
      ],
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return !this.filterDate || post.date === this.filterDate;
      });
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPosts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    },
  },
  methods: {
    carregarPostagens() {
      this.posts = JSON.parse(localStorage.getItem("artigos")) || [];
      this.atualizarInformacoesTotais();
    },
    atualizarInformacoesTotais() {
      const totalPosts = this.posts.length;
      const orderOnProcess = this.posts.filter(
        (post) => post.status === "ON PROCESS"
      ).length;
      const orderDone = this.posts.filter(
        (post) => post.status === "DONE"
      ).length;

      const totalRevenue = this.posts.reduce(
        (sum, post) => sum + parseFloat(this.calculateValueInBRL(post.tokens)),
        0
      );

      this.infos[0].value = totalPosts;
      this.infos[1].value = orderOnProcess;
      this.infos[2].value = orderDone;
      this.infos[3].value = `R$ ${totalRevenue.toFixed(2)}`;
    },
    truncateTitle(title) {
      return title.length > 20 ? title.substring(0, 20) + "..." : title;
    },
    calculateValueInBRL(tokens) {
      return ((tokens / 1000) * 0.15).toFixed(2);
    },
    goToEdit(postId) {
      const article = this.posts.find((post) => post.id === postId);
      if (article) {
        // Armazena o artigo selecionado no localStorage e log para verificar o conteúdo
        localStorage.setItem("selectedArticle", JSON.stringify(article));
        console.log("Artigo selecionado para edição:", article);

        // Redireciona para a página de edição
        this.$router.push({ name: "EditArticle", params: { id: postId } });
      } else {
        console.error("Artigo não encontrado com ID:", postId);
      }
    },
    deletePost(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId);
      localStorage.setItem("artigos", JSON.stringify(this.posts));
      this.atualizarInformacoesTotais();
    },
    publishPost(postId) {
      const post = this.posts.find((post) => post.id === postId);
      if (post) {
        post.status = "PUBLISHED";
        localStorage.setItem("artigos", JSON.stringify(this.posts));
        this.atualizarInformacoesTotais();
      }
    },
    handleThemeChange() {
      this.theme = localStorage.getItem("theme") || "light";
    },
  },
  mounted() {
    this.carregarPostagens();
    window.addEventListener("storage", this.handleThemeChange);
    this.handleThemeChange();
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.handleThemeChange);
  },
};
</script>

<style scoped>
/* Estilos para o dropdown de ações */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background: #1e88e5;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropdown-button i {
  margin-left: 5px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content button {
  background: none;
  border: none;
  color: #333;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

/* Estilos para o botão de exclusão */
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #e53935;
}

.delete-button i {
  font-size: 18px;
}

.delete-button:hover {
  color: #b71c1c;
}

/* Estilos para o layout dos contadores */
.info-totais {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.info-card {
  background-color: #f4f7fc;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  width: 200px;
}

body.dark .info-card {
  background-color: #2e2f33;
}

.info-card i {
  font-size: 28px;
  color: #ffffff;
  background-color: #695cfe;
  border-radius: 50%;
  padding: 10px;
  margin-right: 10px;
}

.info-content h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

body.dark .info-content h3 {
  color: #fff;
}

.info-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

body.dark .info-content p {
  color: #ccc;
}

/* Estilos para a tabela de postagens */
.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.post-table th,
.post-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.post-table th {
  font-weight: bold;
  color: #666;
}

body.dark .post-table th,
body.dark .post-table td {
  color: #ccc;
}

.status {
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 14px;
}

.status.new {
  background-color: #eef6fd;
  color: #1e88e5;
}

.status.on-process {
  background-color: #fff5e6;
  color: #ffa726;
}

.status.done {
  background-color: #e8f5e9;
  color: #43a047;
}

body.dark .status.on-process {
  background-color: #ffcc80;
  color: #6d4c41;
}

body.dark .status.done {
  background-color: #66bb6a;
  color: #1b5e20;
}

/* Estilos para a barra de filtro */
.filter-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

/* Estilos para a paginação */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 12px;
  background-color: #1e88e5;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #1565c0;
}

.pagination button:hover {
  background-color: #1565c0;
}

body.dark .pagination button {
  background-color: #333;
  color: #ddd;
}

body.dark .pagination button.active {
  background-color: #444;
}
</style>
