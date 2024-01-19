import ToDoListApi from '../api/to-do-list.js';

export const toDoList = {
    state: {
        toDoLists: [],
        toDoListsLoadedStatus: 0,
        toDoListItem: {},
        toDoListItemLoadedStatus: 0,
    },
    actions: {
        loadToDoLists({commit}) {
            commit('setToDoListsLoadedStatus', 1);
            ToDoListApi.getToDoLists()
                .then(function (response) {
                    commit('setToDoLists', response.data);
                    commit('setToDoListsLoadedStatus', 2);
                })
                .catch(function () {
                    commit('setToDoLists', []);
                    commit('setToDoListsLoadedStatus', 3);
                });
        },
        addToDoListItem({commit}, data) {
            commit('setToDoListItemLoadedStatus', 1);
            ToDoListApi.addToDoListItem(data)
                .then(function (response) {
                    commit('setToDoListItem', response.data.data);
                    commit('setToDoListItemLoadedStatus', 2);
                })
                .catch(function () {
                    commit('setToDoListItemLoadedStatus', 3);
                });
        },
        updateToDoListItem({commit}, data) {
            commit('setToDoListItemLoadedStatus', 1);
            ToDoListApi.updateToDoListItem(data.id, data)
                .then(function (response) {
                    commit('setToDoListItemLoadedStatus', 2);
                })
                .catch(function () {
                    commit('setToDoListItemLoadedStatus', 3);
                });
        },
        deleteToDoListItem({commit}, id) {
            commit('setToDoListItemLoadedStatus', 1);
            ToDoListApi.deleteToDoListItem(id)
                .then(function (response) {
                    commit('removeToDoListItem', id);
                })
        }
    },
    mutations: {
        setToDoLists(state, list) {
            state.toDoLists = list;
        },
        setToDoListsLoadedStatus(state, status) {
            state.toDoListsLoadedStatus = status;
        },
        setToDoListItem(state, item) {
            state.toDoLists.push(item);
        },
        removeToDoListItem(state, id) {
            const index = state.toDoLists.findIndex(item => item.id == id);
            state.toDoLists.splice(index, 1);
        },
        setToDoListItemLoadedStatus(state, status) {
            state.toDoListItemLoadedStatus = status;
        }
    },
    getters: {
        getToDoLists(state) {
            return state.toDoLists;
        },
        getToDoListsLoadedStatus(state) {
            return state.toDoListsLoadedStatus;
        },
        getToDoListItem(state) {
            return state.toDoListItem;
        },
        getToDoListItemLoadedStatus(state) {
            return state.toDoListItemLoadedStatus;
        }
    }
}
