import { HttpRequest } from "../Modules/HttpRequest";

export class App {
    HAS_INSTANCE = false;
    static make() {
        App.csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        App.token = localStorage.getItem("TOKEN");
        App.request = new HttpRequest(App.csrfToken);
        App.init();
        App.HAS_INSTANCE = true;
    }

    static async auth(user, auth = "login") {
        const response = await App.request.post(`/${auth}`, user);
        if (response.success) {
            const token = response["token-api"];
            App.setToken(token);
        }

        return response;
    }

    static async login(user) {
        return await App.auth(user);
    }

    static async register(user) {
        return await App.auth(user, "register");
    }

    static async logout() {
        const response = await App.request.post("/logout");
        if (response.success) App.removeToken();

        return response;
    }

    static async createTask(task) {
        const response = await App.request.post("/tasks", task);
        console.log(response);
    }

    static async getTask(task_id) {
        const response = await App.request.get(`/tasks/${task_id}`);
        console.log(response);
    }

    static async getTasks() {
        const response = await App.request.get(`/tasks`);
        console.log(response);
    }

    static async deleteTask(task_id) {
        const response = await App.request.delete(`/tasks/${task_id}`);
        console.log(response);
    }

    static async updateTask(task_id, task) {
        const response = await App.request.put(`/tasks/${task_id}`, task);
        console.log(response);
    }

    static setToken(token) {
        localStorage.setItem("TOKEN", token);
        App.token = token;
        App.request.headers = {
            ...App.request.headers,
            Authorazation: `Bearer ${token}`,
        };
    }

    static removeToken() {
        localStorage.removeItem("TOKEN");
        App.token = null;
        App.request.headers = {
            ...App.request.headers,
            Authorazation: "",
        };
    }

    static init() {
        if (!App.HAS_INSTANCE) {
            App.request.headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": App.csrfToken,
            };
        }
    }
}
