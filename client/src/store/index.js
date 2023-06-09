import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { modules } from "./modules";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => {
    const setting = {
      ...state.Setting,
      round: 1,
      currentRound: "work",
      totalWorkRounds: 0,
      settingOpen: false,
      taskListOpen: false,
    };
    return { ...state, Setting: setting };
  },
});

export default createStore({
  modules,
  plugins: [vuexLocal.plugin],
});
