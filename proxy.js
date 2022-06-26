module.exports = {
  port: 3000,

  headers: {
    //因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域
    "Access-Control-Allow-Origin": "*",
  },
};
