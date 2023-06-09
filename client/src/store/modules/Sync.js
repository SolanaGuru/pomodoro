import Sync from "@/services/Sync";
import { EventBus } from "@/utils/EventBus";

const state = {};

const mutations = {};

const getters = {};

const actions = {
  syncData: ({ commit }, payload) => {
    Sync.syncData(payload).then((res) => {
      commit("SYNC_SETTING", res.data.settingSyncResult);
      commit("SYNC_TASKLIST", res.data.taskListSyncResult);
      EventBus.emit("timer-init", {
        auto: false,
      });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
