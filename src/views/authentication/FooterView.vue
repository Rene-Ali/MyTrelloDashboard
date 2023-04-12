<template>
    <v-footer>
        <div class="footer">
            <div>
                <v-btn v-for="icon in icons" :key="icon" :icon="icon" variant="text"></v-btn>
            </div>

            <div>
                All rights reserved. Copyright Time4Me
            </div>

            <v-divider></v-divider>

            <div>
                {{ new Date().getFullYear() }} — <strong>Time4Me</strong>
            </div>
        </div>
    </v-footer>
</template>

<script setup>
//import { ref } from 'vue';

const icons = ([
    'facebook',
    'blur_circular'
]);

</script>

<style scoped>
.footer {
    width: 100%;
    background-color: orange;
    justify-content: center;
    color: white;
    
}

.footer>div{
    text-align: center;
    justify-content: center;
}
</style>