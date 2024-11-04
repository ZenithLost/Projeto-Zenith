import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/Login.vue"; // Página de login
import RegisterView from "../views/Register.vue"; // Página de cadastro
import HomeView from "../views/HomeView.vue"; // Página Home
import ProtegidoView from "../views/Protegido.vue"; // Página protegida, rota autenticada
import Blogs from "@/views/Blogs.vue"; // Página de blogs
import ConfigUser from "@/views/ConfigUser.vue"; // Precisa ser criada ou finalizada
import ContatoNos from "@/views/ContatoNos.vue"; // Precisa ser criada ou finalizada
import Dashboard from "@/views/Dashboard.vue"; // OK, já está criado
import DownloadPlugin from "@/views/DownloadPlugin.vue"; // Precisa ser criada ou finalizada
import FaqView from "@/views/FaqView.vue"; // Precisa ser criada ou finalizada
import FerramentaAi from "@/views/FerramentaAi.vue"; // Precisa ser criada ou finalizada
import ListaPostagem from "@/views/ListaPostagem.vue"; // Precisa ser criada ou finalizada
import Mensagens from "@/views/Mensagens.vue"; // OK, já está criado
import MenuSidebar from "@/views/MenuSidebar.vue"; // Finalizado
import PlanosView from "@/views/PlanosView.vue"; // Precisa ser criada ou finalizada
import Privacidade from "@/views/Privacidade.vue"; // Precisa ser criada ou finalizada
import ProfileUser from "@/views/ProfileUser.vue"; // Precisa ser criada ou finalizada
import Recusos from "@/views/Recusos.vue"; // Precisa ser criada ou finalizada
import SobreNos from "@/views/SobreNos.vue"; // Precisa ser criada ou finalizada
import TermosUso from "@/views/TermosUso.vue"; // Precisa ser criada ou finalizada
import PostagemTeste from "@/views/PostagemTeste.vue"; // importa uma pagina de teste para postagem manual
import EditArticle from "@/views/EditArticle.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login", // Redireciona a rota raiz para /login
  },
  {
    path: "/login",
    name: "login",
    component: LoginView, // Página de login
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView, // Página de cadastro
  },
  {
    path: "/protegido",
    name: "protegido",
    component: ProtegidoView, // Página protegida, precisa de autenticação
  },
  {
    path: "/home",
    name: "home",
    component: HomeView, // Página inicial (Home)
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard, // Página do Dashboard
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/menuSidebar",
    name: "menuSidebar",
    component: MenuSidebar, // Página menu navegação
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/blogs",
    name: "blogs",
    component: Blogs, // Página de blogs conectados
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/configUser",
    name: "configUser",
    component: ConfigUser, // Página de configuração do usuário (precisa ser criada ou finalizada)
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/contato-nos",
    name: "contatoNos",
    component: ContatoNos, // Página de contato (precisa ser criada ou finalizada)
  },
  {
    path: "/download",
    name: "download",
    component: DownloadPlugin, // Página para download do plugin (precisa ser criada ou finalizada)
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/faq",
    name: "faq",
    component: FaqView, // Página de FAQ (precisa ser criada ou finalizada)
  },
  {
    path: "/ferramentaAi",
    name: "ferramentaAi",
    component: FerramentaAi, // Página da ferramenta de IA (precisa ser criada ou finalizada)
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/listaPostagem",
    name: "listaPostagem",
    component: ListaPostagem, // Página de lista de postagens (precisa ser criada ou finalizada)
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/postagemteste",
    name: "postagemteste",
    component: PostagemTeste, // pagina de teste para postagem manual
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/mensagens",
    name: "mensagens",
    component: Mensagens, // Página de mensagens
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/edit-article/:id", // Adiciona o parâmetro dinâmico :id na URL
    name: "EditArticle",
    component: EditArticle,
    meta: { requiresAuth: true }, // Protegida por autenticação
    props: true, // Passa o parâmetro :id como uma prop para o componente EditArticle
  },
  {
    path: "/planos",
    name: "planos",
    component: PlanosView, // Página de planos e preços (precisa ser criada ou finalizada)
  },
  {
    path: "/privacidade",
    name: "privacidade",
    component: Privacidade, // Página de política de privacidade (precisa ser criada ou finalizada)
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileUser, // Página do perfil do usuário (precisa ser criada ou finalizada)
    meta: { requiresAuth: true }, // Protegida por autenticação
  },
  {
    path: "/recursos",
    name: "recursos",
    component: Recusos, // Página de recursos (precisa ser criada ou finalizada)
  },
  {
    path: "/sobre-nos",
    name: "sobreNos",
    component: SobreNos, // Página sobre a empresa (precisa ser criada ou finalizada)
  },
  {
    path: "/termos-uso",
    name: "termosUso",
    component: TermosUso, // Página de termos de uso (precisa ser criada ou finalizada)
  },
];

const router = createRouter({
  history: createWebHashHistory(), // Utilizando Hash mode para histórico
  routes,
});

// Middleware para proteger rotas autenticadas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem("token"); // Verifica se o usuário está autenticado (token JWT)

  if (requiresAuth && !isAuthenticated) {
    next("/login"); // Redireciona para o login se não estiver autenticado
  } else {
    next(); // Permite a navegação
  }
});

export default router;
