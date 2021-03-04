const tabk = [
  {
    path: "/home",
    name: "home",
    component: () => import("../../views/tabs/Home.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../../views/tabs/Order"),
  },
  {
    path: "/me",
    name: "me",
    component: () => import("../../views/tabs/Me"),
  },
];
export default tabk;
