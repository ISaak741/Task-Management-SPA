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

    static async auth(userPayload, route = "login") {
        const response = await App.request.post(`/${route}`, userPayload);
        if (response.success) App.setToken(response["token-api"]);
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
        return await App.request.post("/tasks", task);
    }

    static async getTask(task_id) {
        return await App.request.get(`/tasks/${task_id}`);
    }

    static async getTasks() {
        return await App.request.get(`/tasks`);
    }

    static async deleteTask(task_id) {
        return await App.request.delete(`/tasks/${task_id}`);
    }

    static async updateTask(task_id, task) {
        return await App.request.put(`/tasks/${task_id}`, task);
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
