import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {

    const user = ref({});

    function saveUser(userToSave) {
        user.value = userToSave;
    }

    return { user, saveUser }
});