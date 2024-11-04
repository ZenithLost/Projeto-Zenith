<template>
  <div class="config-user">
    <h2>Configurações do Usuário</h2>

    <div class="form-group">
      <label for="clientId">Client ID</label>
      <input
        type="text"
        v-model="clientId"
        placeholder="Cole seu Client ID"
        @focus="selectText($event)"
      />
    </div>

    <div class="form-group">
      <label for="clientSecret">Client Secret</label>
      <input
        type="text"
        v-model="clientSecret"
        placeholder="Cole seu Client Secret"
        @focus="selectText($event)"
      />
    </div>

    <button @click="saveKeys">Salvar Chaves</button>
    <button @click="editKeys" v-if="keysSaved">Editar Chaves</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientId: "",
      clientSecret: "",
      keysSaved: false,
    };
  },
  methods: {
    selectText(event) {
      event.target.select();
    },
    saveKeys() {
      // Salva as chaves no localStorage
      localStorage.setItem("clientId", this.clientId);
      localStorage.setItem("clientSecret", this.clientSecret);
      this.keysSaved = true;
      alert("Chaves salvas com sucesso!");
    },
    editKeys() {
      // Permite que o usuário edite as chaves
      this.keysSaved = false;
    },
    loadKeys() {
      // Carrega as chaves do localStorage, se existirem
      const savedClientId = localStorage.getItem("clientId");
      const savedClientSecret = localStorage.getItem("clientSecret");
      if (savedClientId && savedClientSecret) {
        this.clientId = savedClientId;
        this.clientSecret = savedClientSecret;
        this.keysSaved = true;
      }
    },
  },
  mounted() {
    // Carrega as chaves quando o componente é montado
    this.loadKeys();
  },
};
</script>

<style scoped>
.config-user {
  max-width: 400px;
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
button {
  margin-right: 1rem;
}
</style>
