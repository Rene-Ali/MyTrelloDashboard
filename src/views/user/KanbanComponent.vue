<template>
    <h1>Mein persöniches Kanban</h1>
    {{ taskListId }}
    <div v-for="task in tasks">
        Super task
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { useRoute } from 'vue-router';

const router = useRoute();

const userStore = useUserStore();
const state = ref({

});

const tasks = computed(() => userStore.tasks);

const taskListId = computed(() => router.params.taskListId);

onMounted(async () => {
    await userStore.showTasks(taskListId.value);
})


</script>