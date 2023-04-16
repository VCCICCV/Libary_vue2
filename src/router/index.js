import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/userList",
    name: "UserList",
    component: () => import("@/views/user/User.vue"),
  },
  // ========user========
  {
    path: "/addUser",
    name: "AddUser",
    component: () => import("@/views/user/AddUser.vue"),
  },
  {
    path: "/editUser",
    name: "EditUser",
    component: () => import("@/views/user/EditUser.vue"),
  },
  // ========admin========
  {
    path: "/adminList",
    name: "AdminList",
    component: () => import("@/views/admin/List.vue"),
  },
  {
    path: "/addAdmin",
    name: "AddAdmin",
    component: () => import("@/views/admin/Add.vue"),
  },
  {
    path: "/editAdmin",
    name: "EditAdmin",
    component: () => import("@/views/admin/Edit.vue"),
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
});

export default router;
