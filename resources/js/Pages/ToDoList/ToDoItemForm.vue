<template>
    <div class="mb-4">
        <button
            v-on:click="showModal = !showModal"
            class="modal-open bg-transparent border border-gray-500
                hover:border-indigo-500 text-gray-500
                hover:text-indigo-500 font-bold py-2 px-2"
        >Add To Do list item
        </button>

        <!--Modal-->
        <div :class="showModal && editItem !== null ? 'modal-active' : 'pointer-events-none opacity-0'"
             class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
        >
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">


                <!-- Add margin if you want to see some of the overlay behind the modal-->
                <div class="modal-content py-4 text-left px-6">
                    <!--Title-->
                    <div class="flex justify-between items-center pb-3">
                        <p class="text-2xl font-bold">Add to do item</p>
                        <div
                            class="modal-close cursor-pointer z-50"
                            v-on:click="showModal = false"
                        >
                            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18"
                                 height="18" viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                            </svg>
                        </div>
                    </div>

                    <!--Body-->
                    <div>
                        <form class="px-8 pt-6 pb-8 mb-4">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                                    Title
                                </label>
                                <input
                                    v-model="editItem.title"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="title"
                                    type="text"
                                    placeholder="title"
                                >
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
                                    Text
                                </label>
                                <textarea
                                    id="text"
                                    v-model="editItem.text"
                                    @input="editItem.text=$event.target.value"
                                    placeholder="Text"
                                    class="shadow appearance-none border rounded w-full
                                    py-2 px-3 text-gray-700 leading-tight focus:outline-none
                                    focus:shadow-outline"></textarea>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
                                    Status
                                </label>
                                <select
                                    v-model="editItem.status"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="status"
                                >
                                    <option value="to_do">To Do</option>
                                    <option value="rejected">Reject</option>
                                    <option value="completed">Complete</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <!--Footer-->
                    <div class="flex justify-end pt-2">
                        <button
                            v-on:click="saveItem()"
                            class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">
                            Save
                        </button>
                        <button
                            v-on:click="resetForm()"
                            class="modal-close px-4 bg-indigo-500 p-3
                                rounded-lg text-white hover:bg-indigo-400"
                        >Close
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script module>
import {mapActions} from "vuex";

export default {
    props: {
        toDoItem: {
            type: Object
        },
    },
    data() {
        return {
            showModal: false,
            editItem: {
                title: '',
                text: '',
                status: 'to_do',
            }
        }
    },
    watch:{
        toDoItem: {
            deep: true,
            immediate: true,
            handler: function (newVal, oldVal) {
                if (newVal && newVal.id != null) {
                    this.showModal = true;
                    this.editItem = newVal;
                }
            }
        },
        showModal: {
            handler: function (newVal) {
                if (!newVal) {
                    this.$emit('resetSelectedItem');
                    this.editItem = {
                        title: '',
                        text: '',
                        status: 'to_do',
                    };
                }
            }
        }
    },
    methods: {
        ...mapActions(["addToDoListItem", "updateToDoListItem"]),
        saveItem () {
            if (this.editItem.id) {
                this.updateToDoListItem(this.editItem).then(() => {
                    this.resetForm();
                });
            } else {
                this.addToDoListItem(this.editItem).then(() => {
                    this.resetForm()
                });
            }
        },
        resetForm () {
            this.showModal = false;
            document.getElementById('text').value = '';
        }
    }
}
</script>
