import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./userStore";

export const useAuthStore = defineStore("authStore", () => {

    const userStore = useUserStore();

    async function checkIfLoggedIn() {
        let response = await axios.get("https://codersbay.a-scho-wurscht.at/api/auth", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        userStore.saveUser(response.data.user);
        console.log("response", response.data);
    }

    async function registerUser(newUser) {
        let response = await axios.post("https://codersbay.a-scho-wurscht.at/api/auth/register", newUser);
        saveToken(response.data.accessToken);
        userStore.saveUser(response.data.user);
    }

    async function loginUser(userToLogin) {
        let response = await axios.post("https://codersbay.a-scho-wurscht.at/api/auth/login", userToLogin);
        console.log(response);
        saveToken(response.data.accessToken);
        userStore.saveUser(response.data.user);
    }

    function saveToken(token) {
        console.log("saveToken called", token);
        localStorage.setItem("token", token);
    }

    return { registerUser, loginUser, checkIfLoggedIn }

});