export default {
    state: {
        routeName: 'index'
    },
    mutations: {
        urlPath(state, val) {
            state.routeName = val;
        }
    },
    getters: {
        urlPath: state => {
        return state.routeName
      }
    }
}