import { reactive } from 'vue';
import { createStore } from 'vuex';

const state = reactive({
  token: ''
});

const mutations = {
  setToken(state, token) {
    state.token = token;
  }
};

const actions = {
  setToken({ commit }, token) {
    commit('setToken', token);
  }
};

const getters = {
  getToken(state) {
    return state.token;
  }
};

export default createStore({
  state,
  mutations,
  actions,
  getters
});
