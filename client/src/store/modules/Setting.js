// import { localStore } from './index'
// import { defaults } from './../../utils/LocalStore'

import Setting from "@/services/Setting";

const state = {
  round: 1,
  workRounds: 4,
  totalWorkRounds: 0,
  tickSounds: false,
  tickSoundsDuringBreak: true,
  timeLongBreak: 15,
  timeShortBreak: 5,
  timeWork: 25,
  currentRound: "work", // work, short-break, long-break
  volume: 100,
  settingOpen: false,
  autoStartWorkTimer: true,
  autoStartBreakTimer: true,
  notifications: true,
  taskListOpen: false,
  selectedTask: null,
  serverSync: true,
};

const getters = {
  round(state) {
    return state.round;
  },
  workRounds(state) {
    return state.workRounds;
  },
  tickSounds(state) {
    return state.tickSounds;
  },
  tickSoundsDuringBreak(state) {
    return state.tickSoundsDuringBreak;
  },
  totalWorkRounds(state) {
    return state.totalWorkRounds;
  },
  timeLongBreak(state) {
    return state.timeLongBreak;
  },
  timeShortBreak(state) {
    return state.timeShortBreak;
  },
  timeWork(state) {
    return state.timeWork;
  },
  currentRound(state) {
    return state.currentRound;
  },
  volume(state) {
    return state.volume;
  },
  autoStartWorkTimer(state) {
    return state.autoStartWorkTimer;
  },

  autoStartBreakTimer(state) {
    return state.autoStartBreakTimer;
  },

  settingOpen(state) {
    return state.settingOpen;
  },

  notifications(state) {
    return state.notifications;
  },

  taskListOpen(state) {
    return state.taskListOpen;
  },
  selectedTask: (state) => {
    return state.selectedTask;
  },
};

const mutations = {
  INCREMENT_ROUND(state) {
    state.round += 1;
  },

  RESET_ROUND(state) {
    state.round = 1;
  },

  INCREMENT_TOTAL_WORK_ROUNDS(state) {
    state.totalWorkRounds += 1;
  },

  RESET_DEFAULTS(state) {
    state.workRounds = 4;
    state.timeLongBreak = 15;
    state.timeShortBreak = 5;
    state.timeWork = 25;
  },

  SET_CURRENT_ROUND(state, payload) {
    // state = {
    //   ...state,
    //   currentRound: payload
    // }
    state.currentRound = payload;
    // state.currentRound = payload
  },

  SET_TICK_SOUNDS(state, payload) {
    state.tickSounds = payload;
  },

  SET_TICK_SOUNDS_DURING_BREAK(state, payload) {
    state.tickSoundsDuringBreak = payload;
  },

  SET_TIME_LONG_BREAK(state, payload) {
    state.timeLongBreak = payload;
  },

  SET_TIME_SHORT_BREAK(state, payload) {
    state.timeShortBreak = payload;
  },

  SET_TIME_WORK(state, payload) {
    state.timeWork = payload;
  },

  SET_WORK_ROUNDS(state, payload) {
    state.workRounds = payload;
  },

  SET_VOLUME(state, payload) {
    state.volume = payload;
  },
  SET_VIEW_STATE(state, payload) {
    state[payload.key] = payload.val;
  },

  TOGGLE_SETTING(state) {
    state.settingOpen = !state.settingOpen;
  },

  TOGGLE_TASK_LIST(state) {
    state.taskListOpen = !state.taskListOpen;
  },
  SELECT_TASK: (state, payload) => {
    state.selectedTask = payload;
  },
  SYNC_SETTING: (state, payload) => {
    for (const stateKey in payload) {
      state[stateKey] = payload[stateKey];
    }
  },
};

const actions = {
  incrementRound({ commit }) {
    commit("INCREMENT_ROUND");
  },

  resetRound({ commit }) {
    commit("RESET_ROUND");
  },

  incrementTotalWorkRounds({ commit }) {
    commit("INCREMENT_TOTAL_WORK_ROUNDS");
  },

  resetDefaults({ commit }) {
    commit("RESET_DEFAULTS");
  },

  setCurrentRound({ commit }, payload) {
    commit("SET_CURRENT_ROUND", payload);
  },

  setTickSounds({ commit }, payload) {
    commit("SET_TICK_SOUNDS", payload);
  },

  setTickSoundsDuringBreak({ commit }, payload) {
    commit("SET_TICK_SOUNDS_DURING_BREAK", payload);
  },

  setTimeLongBreak({ commit }, payload) {
    commit("SET_TIME_LONG_BREAK", payload);
  },

  setTimeShortBreak({ commit }, payload) {
    commit("SET_TIME_SHORT_BREAK", payload);
  },

  setTimeWork({ commit }, payload) {
    commit("SET_TIME_WORK", payload);
  },

  setWorkRounds({ commit }, payload) {
    commit("SET_WORK_ROUNDS", payload);
  },

  setVolume({ commit }, payload) {
    commit("SET_VOLUME", payload);
  },
  setViewState({ commit }, payload) {
    commit("SET_VIEW_STATE", payload);
  },

  toggleSetting({ commit }) {
    commit("TOGGLE_SETTING");
  },

  toggleTaskList({ commit }) {
    commit("TOGGLE_TASK_LIST");
  },

  selectTask: async ({ commit }, payload) => {
    await Setting.selectTask({ selectedTask: payload });
    commit("SELECT_TASK", payload);
  },

  saveSetting({ commit }, payload) {
    Setting.saveSetting(payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
