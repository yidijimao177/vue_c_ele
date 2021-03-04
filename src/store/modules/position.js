const state = {
  location: {},
  address: "",
  city: "",
};

const getters = {
  location: (state) => state.location,
  address: (state) => state.address,
  city: (state) => state.city,
};

const mutations = {
  SET_LOCATION: (state, location) => {
    if (location) {
      state.location = location;
    } else {
      state.location = null;
    }
  },
  SET_ADDRESS: (state, address) => {
    if (address) {
      state.address = address[0]
    } else {
      state.address = "lingshan";
    }
  },
  CITY_CUNCHU: (state, city) => {
    state.city = city;
  },
};

const actions = {
  setLocation({ commit }, location) {
    commit("SET_LOCATION", location);
    // console.log(location)
  },
  setAddress({ commit }, address) {
    commit("SET_ADDRESS", address);
    console.log(address);
  },
  citycunchu({ commit }, city) {
    console.log(city);
    commit("CITY_CUNCHU", city);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
