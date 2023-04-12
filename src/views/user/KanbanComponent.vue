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
        <v-container class="grid-container-4">
            <div class="col-3">
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
            </div>
            <div class="col-3-backlog">
                <h3>Backlog</h3>
                <VueDraggableNext class="drag Area list-group kanban-column" v-model="tasks.value" :list="arrBacklog"
                    group="tasks" @end="onDragEnd">
                    <v-btn class="list-group-item" v-for="task in arrBacklog" :key="task.id">
                        Title: {{ task.title }}
                    </v-btn>
                </VueDraggableNext>
            </div>

            <div class="col-3-inprogress">
                <h3>In Progress</h3>
                <VueDraggableNext class="list-group kanban-column" v-model="tasks.value" :list="arrInProgress" group="tasks"
                    @end="onDragEnd">
                    <v-btn class="list-group-item" v-for="task in arrInProgress" :key="task.id">
                        Title: {{ task.title }}
                    </v-btn>
                </VueDraggableNext>
            </div>

            <div class="col-3-done">
                <h3>Done</h3>
                <VueDraggableNext class="list-group kanban-column" v-model="tasks.value" :list="arrDone" group="tasks"
                    @end="onDragEnd">
                    <v-btn class="list-group-item" v-for="task in arrDone" :key="task.id">
                        Title: {{ task.title }}
                    </v-btn>
                </VueDraggableNext>
            </div>

        </v-container>
    </main>
    <div>
        <FooterView />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { useRoute } from "vue-router"
import { VueDraggableNext } from "vue-draggable-next";
import axios from 'axios';
import FooterView from '../authentication/FooterView.vue';


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
const dialog = ref(false);


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
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    border: black;
    margin-top: 50px;
    text-align: center;
}

.ml-2 {
    color: white;
    background-color: black;
    cursor: pointer;
    border: 2px solid white;
}

.grid-container-4 {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 10px;
    padding: 10px;
    padding-top: 10px;
    background-color: grey;
}

.col-3 {
    background-color: black;
    text-align: center;
    font-size: 30px;
    color: white;
    padding-top: 10px;
}

.col-3-backlog {
    background-color: grey;
    color: black;
    text-align: center;
    padding: 20px;
    font-size: 30px;
    justify-content: center;
}

.col-3-inprogress {
    background-color: orange;
    color: black;
    text-align: center;
    padding: 20px;
    font-size: 30px;
    justify-content: center;
}

.col-3-done {
    background-color: green;
    color: black;
    text-align: center;
    padding: 20px;
    font-size: 30px;
    justify-content: center;
}

.logo {
    display: flex;
    float: right;
}
</style>