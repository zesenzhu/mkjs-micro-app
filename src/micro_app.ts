const microApps = [
  {
    name: "micro_react",
    entry: "//localhost:9999/",
    activeRule: "/micro_react",
    container: "#subapp-viewport", // 子应用挂载的div
    props: {
      routerBase: "/micro_react",
    },
  },
];
export default microApps;
