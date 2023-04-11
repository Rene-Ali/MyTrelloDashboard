<template>
    <header>
        <div class="main-content">
            <div class="concept concept-one">
                <h1>Mein persöniches Kanban Dashboard</h1>
            </div>
        </div>
    </header>
    <br>
    <main>
        <div class="taskForm">
            <v-form @submit.prevent="createNewTask">
                <v-row>
                    <v-col>
                        <div v-for="taskList in user.tasksLists">
                            {{ taskList.label }}
                        </div>
                        <v-text-field label="title" v-model="newTask.title" placeholder="Titel"></v-text-field>
                        <v-text-field label="description" v-model="newTask.description" placeholder="Beschreibung">
                        </v-text-field>
                        <v-btn type="submit" @click="add" class="ml-2" variant="elevated"> Hinzufügen </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
    
            <v-img class="logo" src="2023.png"></v-img>
      
        <br>
        <!-- <div class="backlog">

            <v-card dark color="secondary" v-for="task in tasks" display: block>
                <v-card-title class="text-black">{{ task.title }}</v-card-title>
            </v-card>
        </div> -->
        <v-container class="grid-container ">
                <div class="col-3">
                    <div class="p-2 alert alert-secondary">
                        <h3>Backlog</h3>
                        <VueDraggableNext class="drag Area list-group kanban-column" v-model="tasks.value"
                            :list="arrBacklog" group="tasks" @end="onDragEnd">
                            <div class="list-group-item" v-for="task in arrBacklog" :key="task.id">
                                {{ task.title }}
                            </div>
                        </VueDraggableNext>
                    </div>
            </div>
            <div class="col-3">
                <div class="p-2 alert alert-primary">
                    <h3>In Progress</h3>
                    <VueDraggableNext class="list-group kanban-column" v-model="tasks.value" :list="arrInProgress"
                        group="tasks" @end="onDragEnd">
                        <div class="list-group-item" v-for="task in arrInProgress" :key="task.id">
                            {{ task.title }}
                        </div>
                    </VueDraggableNext>
                </div>
            </div>
            <div class="col-3">
                <div class="p-2 alert alert-primary">
                    <h3>Done</h3>
                    <VueDraggableNext class="list-group kanban-column" v-model="tasks.value" :list="arrDone" group="tasks"
                        @end="onDragEnd">
                        <div class="list-group-item" v-for="task in arrDone" :key="task.id">
                            {{ task.title }}
                        </div>
                    </VueDraggableNext>
                </div>
            </div>
        </v-container>

    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { useRoute } from "vue-router"
import { VueDraggableNext } from "vue-draggable-next";
import axios from 'axios';


const userStore = useUserStore();
const state = ref({});
const user = computed(() => userStore.user);

const tasksLists = computed(() => userStore.tasksLists);

const route = useRoute();
const taskListId = computed(() => route.params.taskListId);
const tasks = computed(() => userStore.tasks);

onMounted(async () => {
    console.log("onmounted", taskListId.value);
    await userStore.showTaskLists(taskListId.value);
});

const arrBacklog = ref([]);
const arrInProgress = ref([]);
const arrDone = ref([]);


const newTask = ref({
    assignedUserId: userStore.user.userId,
    description: "",
    taskListId: parseInt(taskListId.value),
    status: "TODO",
    points: 0,
    estimation: 0,
    title: ""
});

async function createNewTask() {
    console.log("newTask.value", newTask.value);
    await userStore.createNewTask(newTask.value);
}

const add = () => {
    if (newTask.value) {
        arrBacklog.value.push({
            title: newTask.value.title,
        });
        // newTask.value = "";
    }
}

const onDragEnd = async () => {
    for (let i = 0; i < tasks.length; i++) {
        try {
            const res = await axios.put("https://codersbay.a-scho-wurscht.at/api/task/" + taskId, { status: task.status, });
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }
};

</script>
<style>
.kanban-column {
    min-height: 300px;
}

.taskForm {
    width: 100vw;
    align-items: center;
    padding-left: 40px;
    display: flex;

}

.grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
    background-color: #2196F3;
    padding: 10px;
    padding-top: 10px;
}

.grid-container>div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
}

.logo{
    display: flex;
    float: right;


}


</style>