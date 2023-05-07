import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout.vue";
import LoginRegister from "@/views/login/LoginRegister";
import Cookies from "js-cookie";
Vue.use(VueRouter);

const routes = [
  // ========login========
  {
    path: "/loginRegister",
    name: "LoginRegister",
    redirect: "login", // 默认显示登录
    component: LoginRegister,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/Login.vue"),
      },
      {
        path: "/forgetThePassword",
        name: "ForgetThePassword",
        component: () => import("@/views/login/ForgetThePassword.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/login/Register.vue"),
      },
    ],
  },
  // ========home========
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "home",
        name: "HomeView",
        component: () => import("@/views/home/HomeView.vue"),
      },
      {
        path: "userList",
        name: "UserList",
        component: () => import("@/views/user/User.vue"),
      },
      // ========User========
      {
        path: "addUser",
        name: "AddUser",
        component: () => import("@/views/user/AddUser.vue"),
      },
      {
        path: "editUser",
        name: "EditUser",
        component: () => import("@/views/user/EditUser.vue"),
      },
      // ========Admin========
      {
        path: "adminList",
        name: "AdminList",
        component: () => import("@/views/admin/List.vue"),
      },
      {
        path: "addAdmin",
        name: "AddAdmin",
        component: () => import("@/views/admin/Add.vue"),
      },
      {
        path: "/editAdmin",
        name: "EditAdmin",
        component: () => import("@/views/admin/Edit.vue"),
      },
      // ========Category========
      {
        path: "categoryList",
        name: "CategoryList",
        component: () => import("@/views/category/List.vue"),
      },
      {
        path: "addCategory",
        name: "AddCategory",
        component: () => import("@/views/category/Add.vue"),
      },
      {
        path: "/editCategory",
        name: "EditCategory",
        component: () => import("@/views/category/Edit.vue"),
      },
    ],
  },

  // ========404========
  {
    path: "/:catchAll(.*)", //正则
    name: "NotFound",
    component: () => import("@/views/404.vue"),
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/forgetThePassword") {
    // 如果访问的是 login 或 forgetThePassword 页面，则直接放行
    next();
  } else {
    const admin = Cookies.get("admin");
    if (!admin) return next("/login"); // 强制退回到登录页面
    next();
  }
});
export default router;
