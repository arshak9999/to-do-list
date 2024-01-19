import 'es6-promise/auto'
import Vuex from 'vuex'
import {toDoList} from './Modules/to-do-list.js'

const store =  new Vuex.Store({
    modules: {
        toDoList,
    }
});

export default store;
