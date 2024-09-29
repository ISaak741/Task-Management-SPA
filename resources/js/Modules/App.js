import { HttpRequest } from "../Modules/HttpRequest";

export class App {
    constructor() {
        this.csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        this.request = new HttpRequest(this.csrfToken);
    }

    async login(user) {
        const response = await this.request.post("/login", user);
        this.request.setToken(response["token-api"]);
    }

    async createTask(task) {
        const response = await this.request.post("/tasks", task);
        console.log(response);
    }

    async getTask(task_id) {
        const response = await this.request.get(`/tasks/${task_id}`);
        console.log(response);
    }

    async getTasks() {
        const response = await this.request.get(`/tasks`);
        console.log(response);
    }

    async deleteTask(task_id) {
        const response = await this.request.delete(`/tasks/${task_id}`);
        console.log(response);
    }

    async updateTask(task_id, task) {
        const response = await this.request.put(`/tasks/${task_id}`, task);
        console.log(response);
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
