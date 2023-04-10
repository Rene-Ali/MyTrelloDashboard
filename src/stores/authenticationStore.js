import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./userStore";

export const useAuthStore = defineStore("authStore", () => {

    const userStore = useUserStore();

    //checkt ob der User eingeloggt ist
    async function checkIfLoggedIn() {
        let response = await axios.get("https://codersbay.a-scho-wurscht.at/api/auth", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        userStore.saveUser(response.data.user);
        console.log("response", response.data);
    }

    // registriert den User
    async function registerUser(newUser) {
        let response = await axios.post("https://codersbay.a-scho-wurscht.at/api/auth/register", newUser);
        saveToken(response.data.accessToken);
        userStore.saveUser(response.data.user);
    }

    // user wird eingeloggt
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