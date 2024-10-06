import { HttpRequest } from "../Modules/HttpRequest";

export class App {
    constructor() {
        this.csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        this.request = new HttpRequest(this.csrfToken);
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
        App.app.token = token;
    }

    static init() {
        if (!App.hasAlreadyInstance) {
            App.app = new App();
            App.app.request.headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": App.app.csrfToken,
            };
        }

        return App.app;
    }
}
