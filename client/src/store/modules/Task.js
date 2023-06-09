import Task from "@/services/Task";

const state = {
  taskList: [],
};

const getters = {
  taskList: (state) => {
    let result = [];
    for (const task of state.taskList) {
      if (!(task.state === "delete")) result.push(task);
    }
    return result;
  },
};

const mutations = {
  ADD_NEW_ROW: (state, payload) => {
    state.taskList.unshift(payload.payload);
  },
  CANCEL_ADD_ROW: (state) => {
    state.taskList.shift();
  },
  SAVE_ROW: (state, payload) => {
    let i = 0;
    state.taskList.forEach((task, index) => {
      if (task.id === payload.id) {
        i = index;
      }
    });
    state.taskList[i] = payload.payload;
  },
  DELETE_ROW: (state, payload) => {
    let index = 0;
    state.taskList.forEach((task, i) => {
      if (task.id === payload.id) {
        index = i;
      }
    });
    if (payload.success) {
      state.taskList.splice(index, index + 1);
    } else {
      payload.payload.state = "deleted";
      state.taskList[index] = payload.payload;
    }
  },

  SYNC_TASKLIST: (state, payload) => {
    state.taskList = payload;
  },
};

const actions = {
  addNewRow: ({ commit }, payload) => {
    Task.addTask(payload)
      .then((data) => {
        commit("ADD_NEW_ROW", { success: true, payload: data.data });
      })
      .catch(() => {
        payload.state = "added";
        commit("ADD_NEW_ROW", { success: false, payload });
      });
  },
  saveRow: ({ commit }, payload) => {
    Task.updateTask(payload)
      .then((data) => {
        commit("SAVE_ROW", { success: true, payload: data.data });
      })
      .catch(() => {
        payload.state = "updated";
        commit("SAVE_ROW", { success: false, payload });
      });
  },
  deleteRow: async ({ commit }, payload) => {
    Task.deleteTask(payload.id)
      .then(() => {
        commit("DELETE_ROW", { success: true, payload });
      })
      .catch(() => {
        commit("DELETE_ROW", { success: false, payload });
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
