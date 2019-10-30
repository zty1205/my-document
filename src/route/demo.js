export default [
  {
    path: "/demo",
    name: "demo",
    component: () => import("@/components/demo/FileReader.vue"),
    title: "FileReader示例"
  },
  {
    path: "/imgDemo",
    name: "imgDemo",
    component: () => import("@/components/demo/uploadImg.vue"),
    title: "图片上传示例"
  },
  {
    path: "/slotParent",
    component: () => import("@/components/demo/slotParent"),
    title: "slot示例"
  },
  {
    path: "/dateMCheck",
    component: () => import("@/components/demo/dateMCheck"),
    title: "自定义日期多选"
  },
  {
    path: "/error-handler",
    component: () => import("@/components/demo/errorHandler"),
    title: "error-handler"
  }
];
