import store from "src/store";

const auth = (to, from, next) => {
  let isLoggedIn = store().getters["Auth/isLoggedIn"];
  if (isLoggedIn) {
    next();
  } else {
    next("/login");
  }
};

export default auth;
