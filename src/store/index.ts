import { createStore } from "vuex";
import favorites from "./modules/favorites";

const store = createStore({
  modules: {
    favorites,
  },
});

export default store;
