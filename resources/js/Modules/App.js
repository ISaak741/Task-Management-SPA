export class App {
    constructor() {
        this.csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
    }

    async login(user) {
        const body = JSON.stringify(user);
        const url = "http://127.0.0.1:8000/api/login";
        const method = "POST";
        const headers = App.global["login-headers"];

        let request = await fetch(url, {
            method,
            headers,
            body,
        });

        const response = await request.json();
        this.token = response["token-api"];
    }
    static setToken(token) {
        App.app.token = token;
    }

    static init() {
        if (!App.hasAlreadyInstance) {
            App.app = new App();
            App.global = {
                "login-headers": {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": App.app.csrfToken,
                },
            };
        }

        return App.app;
    }
}
