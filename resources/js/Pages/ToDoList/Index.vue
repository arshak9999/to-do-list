<template>
    <div class="modal-content" >
        <to-do-item-form @resetSelectedItem="reset" :toDoItem="selectedToDoListItem"></to-do-item-form>
    </div>
    <div class="loading" v-if="loadStatus === 1">
        <span>Loading</span>
    </div>
    <div v-else>
        <table class="table-auto border-collapse border border-green-800">
            <thead>
            <tr>
                <th class="border">#</th>
                <th class="border">Task Name</th>
                <th class="border">Status</th>
                <th class="border" col="2">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="tasksList.length > 0" v-for="(task, i) in tasksList" :key="i">
                <th class="border" scope="row">{{task.id}}</th>
                <td class="border">{{ task.title }}</td>
                <td class="border">{{ task.status }}</td>
                <td class="border"
                    v-on:click="editItem(task)"
                    >
                    Edit
                </td>
                <td class="border">
                    <button
                        v-on:click="deleteItem(task.id)"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                        x
                    </button>
                </td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script module>
import index, { mapGetters, mapActions } from "vuex";
import ToDoItemForm from "@/Pages/ToDoList/ToDoItemForm.vue";
export default {
    components: {ToDoItemForm},
    data() {
        return {
            selectedToDoListItem: null
        }
    },
    computed: {
        ...mapGetters({
            tasksList: 'getToDoLists',
            loadStatus: 'getToDoListsLoadedStatus',
        })
    },
    created() {
        this.loadTasksList();
    },
    methods: {
        ...mapActions(["loadToDoLists", "deleteToDoListItem"]),
        loadTasksList () {
            this.loadToDoLists();
        },
        deleteItem (id) {
            if (confirm("Are you sure you want to delete that item!")) {
                this.deleteToDoListItem(id);
            }
        },
        editItem (task) {
            this.selectedToDoListItem = task;
        },
        reset (task) {
            this.selectedToDoListItem = null;
        }
    }
}
</script>
