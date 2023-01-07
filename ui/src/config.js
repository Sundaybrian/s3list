const develop = {
  BACKEND_SERVICE: "http://localhost:5000/api/v1",
};

const prod = {
  BACKEND_SERVICE: "http://localhost:5000/api/v1",
};

const choose = {
  develop,
  prod,
};

const config = process.env.VUE_APP_STAGE
  ? choose[process.env.VUE_APP_STAGE]
  : choose["prod"];

export default config;
