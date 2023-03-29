import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("userStore", () => {

    const user = ref({});
    const tasks = ref({});

    const axiosHeader = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    };

    function saveUser(userToSave) {
        user.value = userToSave;
    }

    async function showTasks(taskListId) {
        let response = await axios.get("https://codersbay.a-scho-wurscht.at/api/tasklist/" + taskListId);
        tasks.value = response.data;
    }

    async function createNewTaskList(newTask) {
        let response = await axios.post("https://codersbay.a-scho-wurscht.at/api/tasklist", newTask, axiosHeader);
        console.log("response.data", response.data);
        user.value.taskLists.push(response.data);
    }

    async function removeTask(taskListId){
        let response = await axios.delete ("https://codersbay.a-scho-wurscht.at/api/tasklist/" + taskListId, axiosHeader);
        console.log("response.data", response.data);
        let indexToDelete = user.value.taskLists.findIndex(taskList => {
            return taskList.id === taskListId
        })
        user.value.taskLists.splice(indexToDelete, 1);
    }
        /*let response = await axios.delete("https://codersbay.a-scho-wurscht.at/api/tasklist", removeTask, axiosHeader);
        console.log("response.data", response.data);
        user.value.taskLists.delete(delete.data);*/
    

    return { user, tasks, saveUser, removeTask, showTasks, createNewTaskList };});
