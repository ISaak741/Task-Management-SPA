export class Task {
    constructor(csrfToken, apiToken) {
        this.request = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorazation: `Bearer ${apiToken}`,
                "X-CSRF-TOKEN": csrfToken,
            },
            store: {
                method: "POST",
                url: "http://127.0.0.1:8000/api/tasks",
                body: "",
            },
            index: {
                method: "GET",
                url: "http://127.0.0.1:8000/api/tasks",
                body: null,
            },
        };
    }

    async createTask(task) {
        const store = this.request.store;
        store.body = JSON.stringify(task);

        const request = await fetch(store.url, {
            method: store.method,
            headers: this.request.headers,
            body: store.body,
        });

        const response = await request.json();
        console.log(response);
    }

    async updateTask() {}

    async getTasks() {
        const index = this.request.index;

        const request = await fetch(index.url, {
            method: index.method,
            headers: this.request.headers,
            body: index.body,
        });

        const response = await request.json();
        console.log(response.data);
    }
}
