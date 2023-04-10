import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("userStore", () => {

    const user = ref({}); //userinformationen sind hier gespeichert
    //const userImage = ref(null); //Image Url wird hier gespeichert
    const userImage=ref(null);
    const tasks = ref({});
    const tasklists = ref({});



    // Axios Header wird in einer Variable gespeichert um immer den gleichen Token zu haben
    const axiosHeader = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    };

    function saveUser(userToSave) {
        user.value = userToSave;
    }

    //behandelt die Tasklisten und zeigt sie, kreiert sie und entfernt sie (Dashboard)
    async function showTasks(taskListId) {
        let response = await axios.get("https://codersbay.a-scho-wurscht.at/api/tasklist/" + taskListId);
        tasks.value = response.data;
    }

    async function createNewTaskList(newTaskList) {
        let response = await axios.post("https://codersbay.a-scho-wurscht.at/api/tasklist", newTaskList, axiosHeader);
        console.log("response.data", response.data);
        user.value.taskLists.push(response.data);
    }

    async function removeTaskList(taskListId) {
        let response = await axios.delete("https://codersbay.a-scho-wurscht.at/api/tasklist/" + taskListId, axiosHeader);
        console.log("response.data", response.data);
        let indexToDelete = user.value.taskLists.findIndex(taskList => {
            return taskList.id === taskListId
        })
        user.value.taskLists.splice(indexToDelete, 1);
    }

    //behandelt die Tasks selbst 
    async function removeTask(taskId){
        let response = await axios.delete("https://codersbay.a-scho-wurscht.at/api/task/" + taskId, axiosHeader);
        console.log("response.data", response.data);
        let indexToDelete = user.value.tasks.findIndex(task => {
            return task.id === taskId
        })
        user.value.tasks.splice(indexToDelete, 1);
    }

    async function createNewTask(newTask) {
        let response = await axios.post("https://codersbay.a-scho-wurscht.at/api/task", newTask, axiosHeader);
        console.log("response.data", response.data);
        user.value.tasks.push(response.data);
    }

    async function showTask(taskId) {
        let response = await axios.get("https://codersbay.a-scho-wurscht.at/api/task/" + taskId);
        tasks.value = response.data;
    }


    async function getUserInformation() {
        try {
            const userInfoResponse = await axios.get("https://codersbay.a-scho-wurscht.at/api/auth", axiosHeader);
            user.value = userInfoResponse.data;
            taskStore.setTaskList(user.value.user.taskLists);
            await getAvatar();
        }
        catch (err) {
            console.log(err)
        }
    }

    //Avatar
    async function getAvatar() {
        if (userImage.value != null) {
            URL.revokeObjectURL(userImage.value);
        }
        try {
            const avatarResponse = await axios.get("https://codersbay.a-scho-wurscht.at/api/user/" + user.value.user.userId + "/image", {
                responseType: "blob" // blob for binary objects
            });
            avatarResponse.value = avatarResponse.data;
            userImage.value = URL.createObjectURL(avatarResponse.value); // URL to use as src in HTML
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 404) {
                console.log("no picture available")
            } else {
                console.log("other failure")
            }
        }
    }

return { user, tasklists, tasks, saveUser, removeTask, removeTaskList, createNewTask, showTasks, showTask, createNewTaskList, getUserInformation, userImage}})
