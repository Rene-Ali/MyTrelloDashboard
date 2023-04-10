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
                            {{ user.taskList.label }}
                        </div>
                        <v-text-field label="title" v-model="newTask.title" placeholder="Titel"></v-text-field>
                        <v-text-field label="description" v-model="newTask.description" placeholder="Beschreibung">
                        </v-text-field>
                        <v-btn type="submit" class="ml-2" variant="primary"> Hinzufügen </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
        <v-container class="kanban-board" grid-list-md text-center>
            <v-layout justify-center row fill-height>
            <v-flex v-for="i in 4" :key="`3${i}`">
                <v-card dark color="secondary">
                    <v-card-text class="px-0">3</v-card-text>
                </v-card>
            </v-flex>
            </v-layout>
            <v-row no-gutters>
            <v-col cols="12" sm="4">
                <v-sheet class="ma-2 pa-2" alert alert-secondary>
                    <h3>Backlog</h3>
                    <draggable class="list-group kanban-column" :list="arrBacklog" group="tasks">
                        <div class="list-group-item" v-for="task in tasks">
                            {{ task.title }}
                        </div>
                    </draggable>
                </v-sheet>
                <v-sheet class="ma-2 pa-2" alert alert-secondary>
                    <h3>InProgress</h3>
                    <draggable class="list-group kanban-column" :list="arrBacklog" group="tasks">
                        <div class="list-group-item" v-for="task in tasks">
                            {{ task.title }}
                        </div>
                    </draggable>
                </v-sheet>
            </v-col>
            </v-row>
            <!-- <v-col>
                <v-sheet class="col-md-3">
                    <div class="p-2 alert alert-primary">
                        <h3>In Progress</h3>
                        <draggable class="list-group kanban-column" :list="arrInProgress" group="tasks">
                            <div class="list-group-item" v-for="task in arrBacklog" :key="task.id">
                                {{ task.title }}
                            </div>
                        </draggable>
                    </div>
                </v-sheet>
            </v-col>
            <div class="col-md-3">
                <div class="p-2 alert alert-warning">
                    <h3>Tested</h3>
                    <draggable class="list-group kanban-column" :list="arrTested" group="tasks">
                        <div class="list-group-item" v-for="task in arrTested" :key="task.id">
                            {{ task.title }}
                        </div>
                    </draggable>
                </div>
            </div>

            <div class="col-md-3">
                <div class="p-2 alert alert-success">
                    <h3>Done</h3>
                    <draggable class="list-group kanban-column" :list="arrDone" group="tasks">
                        <div class="list-group-item" v-for="task in arrDone" :key="task.id">
                            {{ task.title }}
                        </div>
                    </draggable>
                </div>
            </div> -->
        </v-container>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { router } from "@/router";


const userStore = useUserStore();
const state = ref({});
const user = computed(() => userStore.user);

const tasksLists = computed(() => userStore.tasksLists);

//const taskListId = computed(() => router.params.taskListId);
const tasks = computed(() => userStore.user.tasks);

onMounted(async () => {
    await userStore.showTasksLists(taskListId.value);
});

const arrBacklog = ([]);
const arrInProgress = ([]);
const arrTested = ([]);
const arrDone = ([]);
const date = new Date();

const newTask = ref({
    assignedUserId: userStore.user.userId,
    description: "",
    taskListId: userStore.user.taskListId,
    status: "TODO",
    points: 0,
    estimation: 0,
    title: ""
});

async function createNewTask() {
    await userStore.createNewTask(newTask.value);
}

// const add = () => {
//     if (newTask.value) {
//         arrBacklog.value.push({
//             title: newTask.title,
//         });
//         newTask.value = "";
//     }
// }

</script>
<style>
.kanban-column {
    min-height: 300px;
}

.taskForm {
    margin-left: 80px;
    width: 500px;
    align-items: center;
    display: flex;

}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 10px;
  background-color: #2196F3;
  padding: 10px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}
</style>